'use client';

import { motion } from 'framer-motion';
import useSwapStore from '@/stores/useSwapStore';
import { ArrowRight, Zap, TrendingUp, Clock, Shield, Activity } from 'lucide-react';

export default function SwapAnalytics() {
    const { route, tokenIn, tokenOut, amountIn, slippage, quoteTimestamp } = useSwapStore();

    if (!route || !amountIn) return null;

    const priceImpact = route.priceImpact || 0;

    // BigInt-safe min received calculation
    const minReceived = route.amountOutRaw
        ? (() => {
            const raw = BigInt(route.amountOutRaw);
            const bps = BigInt(Math.round(slippage * 100));
            const min = (raw * (10000n - bps)) / 10000n;
            const decimals = tokenOut?.decimals || 18;
            const str = min.toString().padStart(decimals + 1, '0');
            const intPart = str.slice(0, str.length - decimals) || '0';
            const fracPart = str.slice(str.length - decimals, str.length - decimals + 6);
            return `${intPart}.${fracPart}`;
        })()
        : (parseFloat(route.amountOut || 0) * (1 - slippage / 100)).toFixed(6);

    const rate = route.amountOut && amountIn
        ? (parseFloat(route.amountOut) / parseFloat(amountIn)).toFixed(6)
        : '—';

    const impactColor =
        priceImpact < 1 ? 'text-success' : priceImpact < 3 ? 'text-warning' : 'text-error';

    // Quote freshness
    const quoteFresh = quoteTimestamp ? Math.round((Date.now() - quoteTimestamp) / 1000) : null;
    const freshLabel = quoteFresh !== null
        ? quoteFresh < 5 ? 'Live' : `${quoteFresh}s ago`
        : '—';
    const freshColor = quoteFresh !== null
        ? quoteFresh < 10 ? '#00D68F' : quoteFresh < 30 ? '#FFB800' : '#FF4757'
        : '#4A4D55';

    const rows = [
        {
            icon: <TrendingUp size={12} />,
            label: 'Rate',
            value: `1 ${tokenIn?.symbol} = ${rate} ${tokenOut?.symbol}`,
        },
        {
            icon: <Zap size={12} />,
            label: 'Price Impact',
            value: `${priceImpact.toFixed(2)}%`,
            valueClass: impactColor,
        },
        {
            icon: <Shield size={12} />,
            label: 'Min. Received',
            value: `${minReceived} ${tokenOut?.symbol}`,
        },
        {
            icon: <Activity size={12} />,
            label: 'Slippage Tolerance',
            value: `${slippage}%`,
        },
        {
            icon: <Clock size={12} />,
            label: 'Quote Freshness',
            value: freshLabel,
            valueStyle: { color: freshColor },
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-0 px-1"
        >
            {rows.map((row, i) => (
                <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-border/20 last:border-b-0">
                    <span className="text-xs text-text-muted flex items-center gap-1.5">
                        {row.icon}
                        {row.label}
                    </span>
                    <span
                        className={`text-xs font-mono ${row.valueClass || 'text-text-secondary'}`}
                        style={row.valueStyle}
                    >
                        {row.value}
                    </span>
                </div>
            ))}

            {/* Route via */}
            {route.dex && (
                <div className="flex items-center justify-between py-2.5 border-t border-border/20">
                    <span className="text-xs text-text-muted">Route via</span>
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm">{route.dex.logo}</span>
                        <span className="text-xs font-medium text-text-secondary">{route.dex.name}</span>
                    </div>
                </div>
            )}

            {/* Path */}
            {route.path && (
                <div className="flex items-center justify-between py-2.5 border-t border-border/20">
                    <span className="text-xs text-text-muted">Path</span>
                    <div className="flex items-center gap-1">
                        {route.path.map((symbol, i) => (
                            <span key={i} className="flex items-center gap-1">
                                <span className="text-xs font-mono text-accent-neon">{symbol}</span>
                                {i < route.path.length - 1 && (
                                    <ArrowRight size={10} className="text-text-disabled" />
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Routes scanned */}
            <div className="flex items-center justify-between py-2.5 border-t border-border/20">
                <span className="text-xs text-text-muted">Routes Scanned</span>
                <span className="text-xs font-mono text-text-secondary">
                    {useSwapStore.getState().allRoutes?.length || 0} routes
                </span>
            </div>
        </motion.div>
    );
}
