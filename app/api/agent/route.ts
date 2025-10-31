import { NextResponse } from "next/server";
import { generateAgentResponse } from "@/lib/agent";

type HistoryMessage = {
  role: "user" | "agent" | "system";
  content: string;
};

type RequestBody = {
  history?: HistoryMessage[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const lastUser = body.history?.slice().reverse().find((item) => item.role === "user");
    const prompt = lastUser?.content ?? "";
    const response = generateAgentResponse(prompt);

    return NextResponse.json({ message: response.message, suggestions: response.suggestions });
  } catch (error) {
    console.error("Agent handler error", error);
    return NextResponse.json(
      { message: "Sorry, something went wrong generating a response.", suggestions: [] },
      { status: 500 }
    );
  }
}
