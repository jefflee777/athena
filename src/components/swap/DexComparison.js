'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import useSwapStore from '@/stores/useSwapStore';
import { getTokenBySymbol } from '@/config/tokens';
import { TrendingUp, Award, ChevronRight } from 'lucide-react';

export default function DexComparison() {
    const { allRoutes, route, tokenOut, amountIn } = useSwapStore();

    if (!allRoutes || allRoutes.length === 0 || !amountIn) return null;

    const bestAmount = parseFloat(allRoutes[0]?.amountOut || 0);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="skeu-panel overflow-hidden"
        >
            <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={14} className="text-accent-primary" />
                    <h3 className="text-sm heading font-semibold text-text-primary">DEX Price Comparison</h3>
                </div>

                <div className="space-y-2 max-h-[425px] overflow-y-scroll" style={{ scrollbarWidth: 'thin' }}>
                    {allRoutes.map((r, i) => {
                        const amount = parseFloat(r.amountOut || 0);
                        const diff = bestAmount > 0
                            ? ((bestAmount - amount) / bestAmount * 100).toFixed(2)
                            : '0.00';
                        const isBest = i === 0;
                        const outputToken = getTokenBySymbol(r.path?.[r.path.length - 1]);

                        return (
                            <motion.div
                                key={`${r.dex.slug}-${r.path?.join('-')}`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="rounded-xl p-3 transition-all"
                                style={{
                                    background: isBest
                                        ? 'rgba(0,214,143,0.06)'
                                        : 'rgba(255,255,255,0.02)',
                                    border: isBest
                                        ? '1px solid rgba(0,214,143,0.2)'
                                        : '1px solid rgba(255,255,255,0.04)',
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="text-lg">{r.dex.logo}</span>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-xs font-semibold text-text-primary">{r.dex.name}</span>
                                                {isBest && (
                                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                                                        style={{ background: 'rgba(0,214,143,0.15)', color: '#00D68F' }}
                                                    >
                                                        BEST
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-[10px] text-text-disabled">
                                                Fee: {(r.dex.fee * 100).toFixed(2)}% · {r.hops} hop{r.hops !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-mono font-semibold text-text-primary">
                                            {parseFloat(r.amountOut).toFixed(4)}
                                        </p>
                                        {!isBest && (
                                            <p className="text-[10px] font-mono" style={{ color: '#FF4757' }}>
                                                -{diff}%
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Path preview */}
                                <div className="flex items-center gap-1 mt-2">
                                    {r.path?.map((symbol, j) => (
                                        <span key={j} className="flex items-center gap-0.5">
                                            <span className="text-[10px] font-mono text-text-muted">{symbol}</span>
                                            {j < r.path.length - 1 && (
                                                <ChevronRight size={8} className="text-text-disabled" />
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
