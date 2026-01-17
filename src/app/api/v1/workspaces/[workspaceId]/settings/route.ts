import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ workspaceId: string }> }
) {
  const { workspaceId } = await params;
  const apiKeyHeader = req.headers.get("Authorization");

  if (!apiKeyHeader || !apiKeyHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = apiKeyHeader.split(" ")[1];
  
  const workspaceApiKey = await prisma.workspaceApiKey.findFirst({
    where: { 
      workspaceId: workspaceId 
    },
  });

  if (!workspaceApiKey) {
    return NextResponse.json({ error: "Invalid API Key or Workspace Access" }, { status: 401 });
  }

  try {
    const settings = await prisma.workspaceSettings.findUnique({
      where: { workspaceId: workspaceId }
    });

    if (!settings) {
      return NextResponse.json({ error: "Settings not found" }, { status: 404 });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
