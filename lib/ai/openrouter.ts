/**
 * OpenRouter AI Client
 * Provides access to multiple LLM models via OpenRouter API.
 * Used for report generation, horoscope content, and chat.
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  content: string;
  model: string;
  tokenCount: number;
  cost: number;
}

export async function callOpenRouter(
  messages: ChatMessage[],
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<OpenRouterResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not configured');
  }

  const model = options.model || 'google/gemini-2.0-flash-001';
  const maxTokens = options.maxTokens || 4096;
  const temperature = options.temperature ?? 0.7;

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': 'AstroBhavishya',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errorData}`);
  }

  const data = await response.json();

  return {
    content: data.choices?.[0]?.message?.content || '',
    model: data.model || model,
    tokenCount: data.usage?.total_tokens || 0,
    cost: data.usage?.total_tokens ? data.usage.total_tokens * 0.00001 : 0,
  };
}

/**
 * Generate a Vedic astrology report using AI
 */
export async function generateAstroReport(
  systemPrompt: string,
  chartDataPrompt: string,
  tier: 'basic' | 'premium' = 'basic'
): Promise<OpenRouterResponse> {
  const model = tier === 'premium'
    ? 'google/gemini-2.0-flash-001'
    : 'google/gemini-2.0-flash-001';

  return callOpenRouter(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: chartDataPrompt },
    ],
    { model, maxTokens: tier === 'premium' ? 6000 : 3000, temperature: 0.7 }
  );
}

/**
 * Generate daily horoscopes for all 12 signs
 */
export async function generateDailyHoroscopes(date: Date): Promise<OpenRouterResponse> {
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const systemPrompt = `You are an expert Vedic astrologer. Generate daily horoscopes for all 12 zodiac signs.
For each sign, provide a JSON object with these fields:
- sign: string (sign name)
- generalForecast: string (50-75 words)
- love: string (30-40 words)
- career: string (30-40 words)
- health: string (20-30 words)
- luckyNumber: number (1-9)
- luckyColor: string
- overallScore: number (1-10)
- loveScore: number (1-10)
- careerScore: number (1-10)
- healthScore: number (1-10)

Return ONLY a valid JSON array of 12 objects, no markdown, no explanation.`;

  return callOpenRouter(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Generate horoscopes for ${dateStr}. Return ONLY valid JSON array.` },
    ],
    { model: 'google/gemini-2.0-flash-001', maxTokens: 4000, temperature: 0.8 }
  );
}
