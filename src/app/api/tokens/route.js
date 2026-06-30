import { TOKENS } from '@/config/tokens';

export async function GET() {
    return Response.json({
        tokens: TOKENS,
        chain: {
            id: 56,
            name: 'BNB Smart Chain',
            rpc: 'https://bsc-dataseed.binance.org',
        },
    });
}
