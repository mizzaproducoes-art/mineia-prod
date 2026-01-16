import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(
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
    const { status, stats } = body;

    const job = await prisma.job.findUnique({
      where: { id, workspaceId: workspaceApiKey.workspaceId }
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        status: status || job.status,
        statsJson: stats || job.statsJson,
        finishedAt: status === "COMPLETED" || status === "FAILED" ? new Date() : job.finishedAt
      }
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Job update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
