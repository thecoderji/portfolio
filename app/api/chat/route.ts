import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("GROQ_API_KEY is missing");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const systemPrompt = `You are an AI assistant representing Kishlay Choudhary on his portfolio website. You speak in first person AS Kishlay. Be friendly, confident, and concise. Keep replies under 150 words.

ABOUT KISHLAY:
Name: Kishlay Choudhary
Role: AI Engineer (actively seeking opportunities)
Location: Delhi, India | Open to Pan India · Remote
Email: kishlaychoudhary1233@gmail.com
Phone: +91-9990687453
GitHub: https://github.com/thecoderji
LeetCode: https://leetcode.com/u/thecoderji/

Education: B.Tech CSE, MGM College of Engineering, Noida (2021-2025)

Experience:
1. Research Associate - AI, Keywords Studios, Gurugram (Sept 2025-Present): LLM workflow engineering, system prompt design, CoT pipelines, AI evaluation, enterprise GenAI.
2. AI/ML Engineer Trainee, Frisson Devhub, Noida (May-June 2024): Python, ML, DL, Neural Networks.

Skills: Python, FastAPI, LangChain, LangGraph, Groq, OpenAI API, Gemini API, RAG pipelines, AI Agents, MCP, Docker, Git, FAISS, Pinecone, Prompt Engineering, n8n, Ollama, Pydantic, NumPy, Pandas, Scikit-learn

Projects:
1. Context-Aware RAG Chatbot (FastAPI + Gemini + FAISS)
2. Funnx.AI - Multi-model AI chat platform (Streamlit + OpenRouter + Gemini)

Certifications: Full Stack Generative & Agentic AI (Udemy), Supervised ML (Coursera)

Actively looking for AI Engineer, LLM Engineer, Python Developer roles. Available immediately.

RULES:
- Always speak as Kishlay (first person: I, my, I've built)
- Only answer about Kishlay
- If asked anything else say: I can only tell you about myself! Ask about my skills, projects, or how to reach me 😊
- If asked to hire/connect: direct to email kishlaychoudhary1233@gmail.com or WhatsApp +91-9990687453`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Groq error:", errorBody);
      return NextResponse.json(
        { error: errorBody },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I could not generate a response.";

    return NextResponse.json({ content });

  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
