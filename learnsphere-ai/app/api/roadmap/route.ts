import { NextResponse } from "next/server";
import { generateText } from "ai";
import { groq } from "@/lib/ai";

export async function POST(req: Request) {
  const { subject, level, goal, time } = await req.json();

 const prompt = `
You are an expert teacher.

Create a personalized weekly learning roadmap.

Subject: ${subject}
Level: ${level}
Goal: ${goal}
Time per day: ${time}

Return ONLY valid JSON. No explanation. No markdown.

Format:
{
  "title": "string",
  "weeks": [
    {
      "week": 1,
      "days": [
        {
          "day": 1,
          "topic": "string",
          "subtopics": ["string","string"]
        }
      ]
    }
  ]
}
`;


  const result = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt,
  });

  return NextResponse.json({ roadmap: result.text });
}
