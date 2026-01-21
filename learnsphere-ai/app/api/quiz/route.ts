import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic, level } = await req.json();

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Return ONLY valid JSON." },
          {
            role: "user",
            content: `
Create 5 MCQ questions for ${topic} (${level})

Format:
{
  "questions": [
    {
      "question": "text",
      "options": ["A","B","C","D"],
      "correct": 0
    }
  ]
}
`,
          },
        ],
        temperature: 0.2,
      }),
    });

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content;

    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (e) {
    console.error("Quiz API error:", e);
    return NextResponse.json({
      questions: [
        {
          question: "Fallback: What is programming?",
          options: ["Cooking", "Coding", "Driving", "Painting"],
          correct: 1,
        },
      ],
    });
  }
}
