'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import useSwapStore from '@/stores/useSwapStore';
import { getTokenBySymbol } from '@/config/tokens';

export default function RoutePreview() {
    const { route, tokenIn, tokenOut, loading } = useSwapStore();

    if (!route && !loading) return null;

    if (loading) {
        return (
            <div className="px-4 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full shimmer" />
                    <div className="flex-1 h-1.5 rounded-full shimmer" />
                    <div className="w-8 h-8 rounded-full shimmer" />
                    <div className="flex-1 h-1.5 rounded-full shimmer" />
                    <div className="w-8 h-8 rounded-full shimmer" />
                </div>
                <p className="text-xs text-text-muted text-center mt-3">Scanning liquidity pools...</p>
            </div>
        );
    }

    if (!route) return null;

    const pathSymbols = route.path || [tokenIn?.symbol, tokenOut?.symbol];

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="px-4 py-5"
        >
            {/* Route label */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                    Optimal Route
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md"
                    style={{
                        background: 'rgba(0,224,255,0.08)',
                        color: '#00E0FF',
                        border: '1px solid rgba(0,224,255,0.15)',
                    }}
                >
                    Best Price
                </span>
            </div>

            {/* Route visualization */}
            <div className="flex items-center justify-between gap-2">
                {pathSymbols.map((symbol, i) => (
                    <div key={i} className="flex items-center gap-2">
                        {/* Token node */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.15, duration: 0.3, type: 'spring' }}
                            className="flex flex-col items-center gap-1"
                        >
                            <div
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold border overflow-hidden shrink-0"
                                style={{
                                    background: 'linear-gradient(145deg, #1C1C21, #111114)',
                                    borderColor: i === 0 || i === pathSymbols.length - 1
                                        ? 'rgba(92,124,255,0.4)'
                                        : 'rgba(0,224,255,0.3)',
                                    boxShadow: i === 0 || i === pathSymbols.length - 1
                                        ? '0 0 12px rgba(92,124,255,0.2)'
                                        : '0 0 12px rgba(0,224,255,0.15)',
                                }}
                            >
                                {(() => {
                                    const tokenMatch = getTokenBySymbol(symbol);
                                    return tokenMatch?.logo ? (
                                        <Image src={tokenMatch.logo} alt={symbol} width={40} height={40} unoptimized />
                                    ) : (
                                        symbol.charAt(0)
                                    );
                                })()}
                            </div>
                            <span className="text-[10px] sm:text-xs font-mono text-text-muted">{symbol}</span>
                        </motion.div>

                        {/* Connector line */}
                        {i < pathSymbols.length - 1 && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: i * 0.15 + 0.1, duration: 0.4 }}
                                className="flex-1 flex flex-col items-center gap-1"
                            >
                                <div className="w-full h-0.5 rounded-full relative overflow-hidden"
                                    style={{ background: 'rgba(0,224,255,0.15)' }}
                                >
                                    <motion.div
                                        className="absolute inset-y-0 left-0 w-1/3 rounded-full"
                                        style={{ background: 'linear-gradient(90deg, transparent, #00E0FF, transparent)' }}
                                        animate={{ x: ['-100%', '400%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    />
                                </div>
                                {route.dex && i === 0 && (
                                    <span className="text-[9px] text-text-disabled font-mono">
                                        {route.dex.logo} {route.dex.name}
                                    </span>
                                )}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            {/* Savings note */}
            {route.savings && parseFloat(route.savings) > 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xs text-center mt-4"
                    style={{ color: '#00D68F' }}
                >
                    💡 Saving ~${parseFloat(route.savings).toFixed(2)} vs worst route
                </motion.p>
            )}
        </motion.div>
    );
}
