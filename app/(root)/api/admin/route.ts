// app/api/admin/stats/route.ts
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    // Check if user is authenticated
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For type safety
    interface ClerkUser {
      createdAt: string | Date;
      lastSignInAt?: string | Date | null;
    }

    // Get all users
    const users = await fetch("https://api.clerk.dev/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then(res => res.json()) as ClerkUser[];

    const totalUsers = users.length;
    
    const activeUsers = users.filter(user => user.lastSignInAt).length;
    
    const lastDaySignups = users.filter(user => {
      const createdAt = new Date(user.createdAt);
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return createdAt > oneDayAgo;
    }).length;

    return NextResponse.json({
      totalUsers,
      activeUsers,
      lastDaySignups,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch user statistics" },
      { status: 500 }
    );
  }
}