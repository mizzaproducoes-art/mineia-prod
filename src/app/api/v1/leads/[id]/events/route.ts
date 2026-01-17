import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const apiKeyHeader = req.headers.get("Authorization");

  if (!apiKeyHeader || !apiKeyHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = apiKeyHeader.split(" ")[1];
  
  const workspaceApiKey = await prisma.workspaceApiKey.findFirst({
    where: { hashedKey: key },
  });

  if (!workspaceApiKey) {
    return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
  }


  try {
    const body = await req.json();
    const { type, payload } = body;

    if (!type) {
      return NextResponse.json({ error: "Event type is required" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id, workspaceId: workspaceApiKey.workspaceId }
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const event = await prisma.leadEvent.create({
      data: {
        type,
        leadId: id,
        payloadJson: payload || {}
      }
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Event creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
