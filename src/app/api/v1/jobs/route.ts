import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
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
    const { source } = body;

    const job = await prisma.job.create({
      data: {
        source: source || "N8N_SCRAPER",
        status: "PENDING",
        workspaceId: workspaceApiKey.workspaceId
      }
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("Job creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  // This would usually be /api/v1/jobs/[id], but for simplicity let's handle via body if ID is provided
  // Or create the standard dynamic route. Let's create the dynamic route in a separate file.
  return NextResponse.json({ error: "Use /api/v1/jobs/[id] for updates" }, { status: 405 });
}
