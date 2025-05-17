import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import systemPrompt from "@/app/system-prompt";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface IkigaiResponse {
  selected: string[];
  summary: string;
}

interface IkigaiData {
  love: IkigaiResponse;
  goodAt: IkigaiResponse;
  worldNeeds: IkigaiResponse;
  paidFor: IkigaiResponse;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(" body:", body);
  const { love, goodAt, worldNeeds, paidFor } = body as IkigaiData;

  // Format the data to match the system prompt's expected input
  const prompt = {
    love: formatCategoryResponse(love),
    goodAt: formatCategoryResponse(goodAt),
    worldNeeds: formatCategoryResponse(worldNeeds),
    paidFor: formatCategoryResponse(paidFor),
  };
  console.log(" prompt:", prompt);

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
    console.log("Response:", response);

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

// Helper function to format category response
function formatCategoryResponse(category: IkigaiResponse): string {
  if (!category || (!category.selected?.length && !category.summary)) {
    return "No information provided";
  }

  const selectedItems =
    category.selected?.length > 0
      ? `Selected items: ${category.selected.join(", ")}. `
      : "";

  const summary = category.summary?.trim() || "";

  return `${selectedItems}${summary}`.trim() || "No information provided";
}
