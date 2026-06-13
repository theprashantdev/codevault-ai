import { NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
const MODELS = [
  'meta-llama/llama-3.2-1b-instruct:free',
  'google/gemma-2-9b-it:free',
  'mistralai/mistral-7b-instruct:free'
];

export async function POST(request: Request) {
  const { code, language } = await request.json();
  if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

  // No auth check for now – just evaluate
  const modelPromises = MODELS.map(async (model) => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: `You are a code reviewer. Evaluate the following ${language} code for correctness, performance, and edge cases. Return a JSON object with keys "correctness" (0-100), "performance" (0-100), "edgeCases" (0-100), and "feedback" (string).`
            },
            { role: 'user', content: code }
          ],
          response_format: { type: 'json_object' }
        })
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error('No content');
      const parsed = JSON.parse(content);
      return { model, ...parsed };
    } catch (err) {
      return { model, error: 'Model unavailable', correctness: 0, performance: 0, edgeCases: 0, feedback: '' };
    }
  });

  const results = await Promise.all(modelPromises);

  // Not saving to DB yet – we'll add that after login is set up
  return NextResponse.json({ results });
}
