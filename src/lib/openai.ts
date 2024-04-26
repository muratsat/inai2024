import { env } from "@/env";
import OpenAi from "openai";

const openai = new OpenAi({ apiKey: env.OPENAI_API_KEY });

const PROMPT =
  "You are a helpful assistant. You synthesize all reviews left by passenger about the driver and distille it down to 5-10 sentences";

export async function OpenAiSummary(reviews: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: PROMPT },
      { role: "user", content: reviews },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0]?.message.content;
}
