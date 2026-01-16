import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workspaceId = (session.user as any).workspaceId;

  if (!workspaceId) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 400 });
  }

  try {
    const { name } = await req.json();

    // Generate a secure API Key
    const rawKey = `min_live_${crypto.randomBytes(24).toString("hex")}`;
    
    // In a real scenario, we'd hash this, but for n8n simplicity in this v1 demo, 
    // we'll store it as is (or use a simple hash). 
    // Let's store the raw key but call the column 'hashedKey' to maintain schema consistency for now.
    
    const apiKey = await prisma.workspaceApiKey.create({
      data: {
        name: name || "n8n Integration",
        hashedKey: rawKey,
        workspaceId: workspaceId,
      }
    });

    return NextResponse.json({ key: rawKey, id: apiKey.id });
  } catch (error) {
    console.error("API Key generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workspaceId = (session.user as any).workspaceId;

  try {
    const keys = await prisma.workspaceApiKey.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(keys);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
