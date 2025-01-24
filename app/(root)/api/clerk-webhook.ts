import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error occurred -- no svix headers", {
      status: 400
    });
  }

  const payload = await req.json();
  const webhookSecret = process.env.WEBHOOK_SECRET;

  if (!webhookSecret) {
    return new NextResponse("Error occurred -- no webhook secret", {
      status: 400
    });
  }

  try {
    const event = payload as WebhookEvent;

    switch (event.type) {
      case "user.created":
        console.log('User created:', event.data);
        break;
      case "user.updated":
        console.log('User updated:', event.data);
        break;
      case "user.deleted":
        console.log('User deleted:', event.data);
        break;
      default:
        console.log('Unknown event type:', event.type);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse("Error occurred", {
      status: 400
    });
  }
}
