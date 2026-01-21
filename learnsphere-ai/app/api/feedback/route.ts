import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

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
            role: "system",
            content: "You are a tutor giving concise improvement-focused feedback.",
          },
          {
            role: "user",
            content: `
Topic: ${body.topic}
Score: ${body.score}
Answers: ${JSON.stringify(body.answers)}

Give feedback in this format:

Strengths:
- ...

Needs Improvement:
- ...

What to Revise Next:
- ...

End with one motivating sentence.
`,
          },
        ],
        temperature: 0.3,
      }),
    });

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content;

    return NextResponse.json({
      feedback: text || "Good attempt. Review the lesson and try again.",
    });
  } catch (e) {
    console.error("Feedback API error:", e);
    return NextResponse.json({
      feedback:
        "Strengths:\n- You attempted all questions.\n\nNeeds Improvement:\n- Some concepts are not clear yet.\n\nWhat to Revise Next:\n- Re-read lesson and practice examples.\n\nKeep going, you are improving 👍",
    });
  }
}
