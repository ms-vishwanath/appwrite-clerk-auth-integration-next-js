// app/api/clerk-webhook/route.ts
import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { databases, sdk } from "@/lib/appwrite";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const headers = Object.fromEntries(req.headers.entries());
  const svix = new Webhook(webhookSecret);
  let evt: any;
  try {
    evt = svix.verify(payload, headers);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  const { type, data } = evt;

  if (type === "user.created") {
    const clerkId = data.id;
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERS_COLLECTION_ID,
      sdk.ID.unique(),
      {
        clerkId,
      }
    );
  }

  return NextResponse.json({ success: true });
}
