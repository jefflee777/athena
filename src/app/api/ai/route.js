import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'Athena AI',
    },
});

const SYSTEM_PROMPT = `You are Athena AI, an intelligent DeFi assistant built into the Athena Protocol — a swap optimization platform on BNB Chain.

Your capabilities:
- Explain DeFi concepts (AMMs, liquidity pools, impermanent loss, slippage, etc.)
- Analyze swap routes and suggest optimal trading strategies
- Help users understand price impact and when to split trades
- Provide market insights about BNB Chain tokens
- Explain gas optimization techniques
- Help with risk assessment for different tokens

Guidelines:
- Keep responses concise and actionable (2-3 paragraphs max)
- Use simple language but be technically accurate
- When analyzing swaps, reference specific numbers if provided
- Always mention risks when discussing trading strategies
- Format with markdown: bold key points, use bullet lists
- Never give financial advice — frame as educational information
- You are embedded in the Athena Protocol swap interface`;

export async function POST(request) {
    try {
        const { messages, context } = await request.json();

        if (!process.env.OPENROUTER_API_KEY) {
            return Response.json(
                { error: 'AI assistant is not configured. Please add OPENROUTER_API_KEY to your .env file.' },
                { status: 500 }
            );
        }

        // Build context-aware messages
        const systemMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
        ];

        // Inject current swap context if available
        if (context) {
            const contextMsg = [
                'Current swap context:',
                context.tokenIn ? `- Swapping: ${context.amountIn || '?'} ${context.tokenIn}` : null,
                context.tokenOut ? `- For: ${context.amountOut || '?'} ${context.tokenOut}` : null,
                context.rate ? `- Rate: 1 ${context.tokenIn} = ${context.rate} ${context.tokenOut}` : null,
                context.priceImpact ? `- Price Impact: ${context.priceImpact}%` : null,
                context.dex ? `- Best DEX: ${context.dex}` : null,
                context.routesScanned ? `- Routes scanned: ${context.routesScanned}` : null,
            ].filter(Boolean).join('\n');

            systemMessages.push({ role: 'system', content: contextMsg });
        }

        const finalMessages = [...systemMessages, ...messages.slice(-10)];

        const response = await openai.chat.completions.create({
            model: 'meta-llama/llama-4-maverick',
            messages: finalMessages,
            max_tokens: 1500,
            temperature: 0.7,
        });

        const reply = response.choices?.[0]?.message?.content || 'I could not generate a response.';

        return Response.json({ reply });
    } catch (error) {
        console.error('AI API error:', error);
        return Response.json(
            { error: error.message || 'Failed to get AI response' },
            { status: 500 }
        );
    }
}
