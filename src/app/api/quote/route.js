import { createPublicClient, http, parseUnits, formatUnits } from 'viem';
import { bsc } from 'viem/chains';
import { ROUTER_ABI, FACTORY_ABI, PAIR_ABI } from '@/config/abis';
import { TOKENS, WBNB_ADDRESS, INTERMEDIATE_TOKENS, getTokenByAddress } from '@/config/tokens';
import { DEXES } from '@/config/dexes';

const client = createPublicClient({
    chain: bsc,
    transport: http('https://bsc-dataseed.binance.org'),
});

// Resolve native BNB to WBNB for routing
function resolveAddress(address) {
    if (address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        return WBNB_ADDRESS;
    }
    return address;
}

// Build candidate paths between tokenIn and tokenOut
function buildPaths(tokenInAddr, tokenOutAddr) {
    const paths = [];

    // Direct path
    paths.push([tokenInAddr, tokenOutAddr]);

    // 1-hop paths via intermediate tokens
    for (const mid of INTERMEDIATE_TOKENS) {
        if (
            mid.toLowerCase() !== tokenInAddr.toLowerCase() &&
            mid.toLowerCase() !== tokenOutAddr.toLowerCase()
        ) {
            paths.push([tokenInAddr, mid, tokenOutAddr]);
        }
    }

    return paths;
}

// Get amounts out from a DEX router
async function getAmountsOut(routerAddress, amountIn, path) {
    try {
        const result = await client.readContract({
            address: routerAddress,
            abi: ROUTER_ABI,
            functionName: 'getAmountsOut',
            args: [amountIn, path],
        });
        return result;
    } catch {
        return null;
    }
}

// Calculate price impact rough estimate
function calculatePriceImpact(amountIn, amountOut, decimalsIn, decimalsOut) {
    // Simplified — in production you'd compare vs spot price from reserves
    // For now we estimate based on output ratio deviation
    const inVal = parseFloat(formatUnits(amountIn, decimalsIn));
    const outVal = parseFloat(formatUnits(amountOut, decimalsOut));
    if (inVal === 0 || outVal === 0) return 0;
    // Rough heuristic — impact increases with size
    return Math.min(Math.abs(Math.log(outVal / inVal) * 0.5), 15);
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const tokenInAddr = searchParams.get('tokenIn');
        const tokenOutAddr = searchParams.get('tokenOut');
        const amountInRaw = searchParams.get('amountIn');
        const decimalsIn = parseInt(searchParams.get('decimalsIn') || '18');
        const decimalsOut = parseInt(searchParams.get('decimalsOut') || '18');

        if (!tokenInAddr || !tokenOutAddr || !amountInRaw) {
            return Response.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        const resolvedIn = resolveAddress(tokenInAddr);
        const resolvedOut = resolveAddress(tokenOutAddr);
        const amountIn = parseUnits(amountInRaw, decimalsIn);

        if (amountIn <= 0n) {
            return Response.json({ error: 'Amount must be greater than 0' }, { status: 400 });
        }

        const paths = buildPaths(resolvedIn, resolvedOut);
        const allRoutes = [];

        // Query all DEXes × all paths
        const promises = [];
        for (const dex of DEXES) {
            for (const path of paths) {
                promises.push(
                    getAmountsOut(dex.router, amountIn, path).then((amounts) => ({
                        dex,
                        path,
                        amounts,
                    }))
                );
            }
        }

        const results = await Promise.all(promises);

        for (const { dex, path, amounts } of results) {
            if (!amounts || amounts.length === 0) continue;

            const amountOut = amounts[amounts.length - 1];
            const amountOutFormatted = formatUnits(amountOut, decimalsOut);
            const priceImpact = calculatePriceImpact(amountIn, amountOut, decimalsIn, decimalsOut);

            // Resolve path symbols
            const pathSymbols = path.map((addr) => {
                const token = getTokenByAddress(addr);
                return token ? token.symbol : addr.slice(0, 6);
            });

            allRoutes.push({
                dex: {
                    name: dex.name,
                    slug: dex.slug,
                    router: dex.router,
                    logo: dex.logo,
                    fee: dex.fee,
                    color: dex.color,
                },
                path: pathSymbols,
                pathAddresses: path,
                amountOut: amountOutFormatted,
                amountOutRaw: amountOut.toString(),
                priceImpact: Math.round(priceImpact * 100) / 100,
                hops: path.length - 1,
            });
        }

        // Sort by output amount (descending)
        allRoutes.sort((a, b) => parseFloat(b.amountOut) - parseFloat(a.amountOut));

        const bestRoute = allRoutes[0] || null;

        // Calculate savings vs worst route
        let savings = '0';
        if (allRoutes.length > 1) {
            const best = parseFloat(allRoutes[0].amountOut);
            const worst = parseFloat(allRoutes[allRoutes.length - 1].amountOut);
            savings = (best - worst).toFixed(6);
            if (bestRoute) bestRoute.savings = savings;
        }

        return Response.json({
            bestRoute,
            allRoutes,
            totalRoutesChecked: results.length,
            timestamp: Date.now(),
        });
    } catch (error) {
        console.error('Quote API error:', error);
        return Response.json(
            { error: 'Failed to calculate route', detail: error.message },
            { status: 500 }
        );
    }
}
