import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetching users with pagination
    const userList = await clerkClient.users.getUserList();
    
    // Ensure we are accessing the 'data' property from the paginated response
    const formattedUsers = userList.data.map((user: any) => ({
      id: user.id,
      name: user.firstName ? `${user.firstName} ${user.lastName ?? ''}` : 'No Name',
      email: user.emailAddresses[0]?.emailAddress ?? 'No Email',
      role: user.publicMetadata.role || 'User', // Assuming roles are stored in public metadata
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
