import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
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

  const { id } = params;

  try {
    const body = await req.json();
    const { scores, ai_analysis, priority, status } = body;

    const lead = await prisma.lead.findUnique({
      where: { id, workspaceId: workspaceApiKey.workspaceId }
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        scoresJson: scores || lead.scoresJson,
        aiJson: ai_analysis || lead.aiJson,
        priority: priority || lead.priority,
        status: (status as any) || lead.status,
      }
    });

    // Log the event
    await prisma.leadEvent.create({
      data: {
        type: "AI_SCORING_UPDATED",
        leadId: id,
        payloadJson: { scores, priority, status }
      }
    });

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("Score update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
