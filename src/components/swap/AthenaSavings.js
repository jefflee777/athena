'use client';

import { motion } from 'framer-motion';
import useSwapStore from '@/stores/useSwapStore';
import { Shield, Zap, BarChart3, TrendingUp, Search } from 'lucide-react';

export default function AthenaSavings() {
    const { route, allRoutes, amountIn } = useSwapStore();

    if (!route || !amountIn) return null;

    const bestAmount = parseFloat(route.amountOut || 0);
    const worstAmount = allRoutes.length > 1
        ? parseFloat(allRoutes[allRoutes.length - 1]?.amountOut || 0)
        : bestAmount;
    const savings = bestAmount - worstAmount;
    const savingsPercent = worstAmount > 0
        ? ((savings / worstAmount) * 100).toFixed(2)
        : '0.00';
    const routesScanned = allRoutes.length;
    const poolsAnalyzed = allRoutes.reduce((acc, r) => acc + (r.hops || 1), 0);

    const stats = [
        {
            icon: <Search size={14} />,
            label: 'Routes Scanned',
            value: routesScanned.toString(),
            color: '#5C7CFF',
        },
        {
            icon: <BarChart3 size={14} />,
            label: 'Pools Analyzed',
            value: poolsAnalyzed.toString(),
            color: '#00E0FF',
        },
        {
            icon: <TrendingUp size={14} />,
            label: 'Savings vs Worst',
            value: savings > 0 ? `+${savings.toFixed(4)}` : '0',
            color: '#00D68F',
        },
        {
            icon: <Shield size={14} />,
            label: 'Optimization',
            value: `${savingsPercent}%`,
            color: '#FFB800',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="skeu-panel overflow-hidden"
        >
            <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <Zap size={14} style={{ color: '#FFB800' }} />
                    <h3 className="text-sm heading font-semibold text-text-primary">How Athena Saves You</h3>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * i + 0.3 }}
                            className="rounded-xl p-3"
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                            }}
                        >
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <span style={{ color: stat.color }}>{stat.icon}</span>
                                <span className="text-[10px] text-text-disabled">{stat.label}</span>
                            </div>
                            <p className="text-sm font-bold font-mono" style={{ color: stat.color }}>
                                {stat.value}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* How it works */}
                <div
                    className="mt-3 rounded-xl p-3 text-[11px] text-text-muted leading-relaxed"
                    style={{
                        background: 'rgba(92,124,255,0.04)',
                        border: '1px solid rgba(92,124,255,0.08)',
                    }}
                >
                    Athena scans liquidity across multiple DEXs and routing paths simultaneously, selecting the route that maximizes your output while minimizing slippage and fees.
                </div>
            </div>
        </motion.div>
    );
}
