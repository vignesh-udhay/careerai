import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import systemPrompt from "@/app/system-prompt";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { love, goodAt, worldNeeds, paidFor } = body;

  const prompt = { love, goodAt, worldNeeds, paidFor };

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: JSON.stringify(prompt),
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const response = chatCompletion.choices[0]?.message?.content || "";
    console.log(" response:", response);

    // Parse the JSON response
    const parsedResponse = JSON.parse(response);

    return NextResponse.json({
      summary: parsedResponse.summary,
      sentiment: parsedResponse.sentiment,
      suggestions: parsedResponse.suggested_roles,
      themes: parsedResponse.themes,
      paths: parsedResponse.suggested_paths,
    });
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
