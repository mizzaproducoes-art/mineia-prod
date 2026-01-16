import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const apiKeyHeader = req.headers.get("Authorization");

  if (!apiKeyHeader || !apiKeyHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = apiKeyHeader.split(" ")[1];
  
  // In a real app, hash the key before comparing
  const workspaceApiKey = await prisma.workspaceApiKey.findFirst({
    where: { hashedKey: key },
    include: { workspace: true }
  });

  if (!workspaceApiKey) {
    return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { leads } = body;

    if (!leads || !Array.isArray(leads)) {
      return NextResponse.json({ error: "Invalid leads format" }, { status: 400 });
    }

    let results = [];

    for (const leadData of leads) {
      const lHash = leadData.lead_hash || leadData.leadHash;
      
      const lead = await prisma.lead.upsert({
        where: {
          workspaceId_leadHash: {
            workspaceId: workspaceApiKey.workspaceId,
            leadHash: lHash
          }
        },
        update: {
          status: leadData.status || "P2",
          priority: leadData.priority || "P2",
        },
        create: {
          leadHash: lHash,
          source: leadData.source,
          url: leadData.url,
          title: leadData.title,
          description: leadData.description,
          price: leadData.price,
          city: leadData.city,
          state: leadData.state,
          publishedAt: leadData.publishedAt ? new Date(leadData.publishedAt) : null,
          contactability: leadData.contactability || "PLATFORM_CHAT_ONLY",
          contactValue: leadData.contact_value || leadData.contactValue,
          workspaceId: workspaceApiKey.workspaceId,
          status: leadData.status || "P2",
        }
      });
      
      results.push({ id: lead.id, leadHash: lead.leadHash });
    }

    return NextResponse.json({ leads: results });
  } catch (error) {
    console.error("Ingest error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
