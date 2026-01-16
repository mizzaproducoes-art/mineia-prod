import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: Request,
  props: { params: Promise<{ workspaceId: string }> }
) {
  const params = await props.params;
  const apiKeyHeader = req.headers.get("Authorization");

  if (!apiKeyHeader || !apiKeyHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = apiKeyHeader.split(" ")[1];
  
  const workspaceApiKey = await prisma.workspaceApiKey.findFirst({
    where: { 
      hashedKey: key,
      workspaceId: params.workspaceId 
    },
  });

  if (!workspaceApiKey) {
    return NextResponse.json({ error: "Invalid API Key or Workspace Access" }, { status: 401 });
  }

  try {
    const settings = await prisma.workspaceSettings.findUnique({
      where: { workspaceId: params.workspaceId }
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
