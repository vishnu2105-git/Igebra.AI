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
          {
            role: "user",
            content: `Explain ${topic} for ${level} students with examples.`,
          },
        ],
      }),
    });

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) throw new Error("No explanation");

    return NextResponse.json({ explanation: text });
  } catch (e) {
    console.error("Explain API error:", e);
    return NextResponse.json(
      { explanation: "Lesson could not be generated right now." },
      { status: 500 }
    );
  }
}
