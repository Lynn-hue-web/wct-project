import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Webhook secret not configured' 
      },
      { status: 500 }
    );
  }

  try {
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing svix headers' 
        },
        { status: 400 }
      );
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });

    // Handle the webhook payload based on the event type
    const { type } = payload;
    
    switch (type) {
      case 'user.created':
        // Handle user creation
        break;
      case 'user.updated':
        // Handle user update
        break;
      case 'user.deleted':
        // Handle user deletion
        break;
      default:
        // Handle unknown event type
        break;
    }

    return NextResponse.json({ 
      success: true,
      message: 'Webhook processed successfully' 
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse("Error occurred", {
      status: 400
    });
  }
}
