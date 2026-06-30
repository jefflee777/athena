import { WBNB_ADDRESS } from '@/config/tokens';

const GECKO_BASE = 'https://api.geckoterminal.com/api/v2';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');

        if (!address) {
            return Response.json({ error: 'Missing token address' }, { status: 400 });
        }

        // Resolve native BNB to WBNB for API lookup
        const lookupAddr = address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
            ? WBNB_ADDRESS
            : address;

        // Fetch token info from GeckoTerminal (free, no API key)
        const res = await fetch(
            `${GECKO_BASE}/networks/bsc/tokens/${lookupAddr}`,
            {
                headers: { Accept: 'application/json' },
                next: { revalidate: 30 }, // cache 30s
            }
        );

        if (!res.ok) {
            return Response.json({
                name: null,
                symbol: null,
                price_usd: null,
                volume_24h: null,
                price_change_24h: null,
                fdv: null,
                total_reserve: null,
                verified: false,
                error: 'Token not found on GeckoTerminal',
            });
        }

        const data = await res.json();
        const attrs = data?.data?.attributes || {};

        // Fetch top pools for liquidity info
        let totalLiquidity = 0;
        let poolCount = 0;

        try {
            const poolsRes = await fetch(
                `${GECKO_BASE}/networks/bsc/tokens/${lookupAddr}/pools?page=1`,
                {
                    headers: { Accept: 'application/json' },
                    next: { revalidate: 30 },
                }
            );
            if (poolsRes.ok) {
                const poolsData = await poolsRes.json();
                const pools = poolsData?.data || [];
                poolCount = pools.length;
                totalLiquidity = pools.reduce((sum, p) => {
                    return sum + parseFloat(p.attributes?.reserve_in_usd || 0);
                }, 0);
            }
        } catch { }

        return Response.json({
            name: attrs.name || null,
            symbol: attrs.symbol || null,
            price_usd: attrs.price_usd || null,
            volume_24h: attrs.volume_usd?.h24 || null,
            price_change_24h: attrs.price_change_percentage?.h24 || null,
            fdv: attrs.fdv_usd || null,
            total_reserve: totalLiquidity || null,
            pool_count: poolCount,
            verified: !!attrs.coingecko_coin_id,
            address: lookupAddr,
        });
    } catch (error) {
        console.error('Token info API error:', error);
        return Response.json(
            { error: 'Failed to fetch token info' },
            { status: 500 }
        );
    }
}
