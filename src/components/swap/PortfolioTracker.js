'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Wallet, ArrowRight, PieChart } from 'lucide-react';
import useTokenBalances from '@/hooks/useTokenBalances';
import useSwapStore from '@/stores/useSwapStore';
import { TOKENS } from '@/config/tokens';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

export default function PortfolioTracker() {
    const { isConnected } = useAccount();
    const { balances } = useTokenBalances();
    const { setTokenIn, setAmountIn, openSelector } = useSwapStore();
    const [bnbPrice, setBnbPrice] = useState(0);
    const [tokenPrices, setTokenPrices] = useState({});

    // Fetch BNB price for USD estimation
    useEffect(() => {
        async function fetchPrices() {
            try {
                const res = await fetch('/api/token-info?address=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c');
                if (res.ok) {
                    const data = await res.json();
                    setBnbPrice(parseFloat(data.price_usd || 0));
                    setTokenPrices(prev => ({ ...prev, BNB: parseFloat(data.price_usd || 0), WBNB: parseFloat(data.price_usd || 0) }));
                }

                // Fetch USDT price (it's ~$1 but let's be accurate)
                const usdt = await fetch('/api/token-info?address=0x55d398326f99059fF775485246999027B3197955');
                if (usdt.ok) {
                    const d = await usdt.json();
                    setTokenPrices(prev => ({ ...prev, USDT: parseFloat(d.price_usd || 1), USDC: parseFloat(d.price_usd || 1), BUSD: parseFloat(d.price_usd || 1) }));
                }
            } catch { }
        }
        if (isConnected) fetchPrices();
    }, [isConnected]);

    if (!isConnected) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="skeu-panel overflow-hidden"
            >
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Wallet size={14} className="text-accent-primary" />
                        <h3 className="text-sm heading font-semibold text-text-primary">Portfolio</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <Wallet size={28} className="text-text-disabled mb-2" />
                        <p className="text-xs text-text-muted">Connect wallet to view</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Build holdings from balances
    const holdings = TOKENS
        .map(token => {
            const bal = balances[token.address];
            if (!bal || parseFloat(bal.formatted) <= 0) return null;

            const amount = parseFloat(bal.formatted);
            const price = tokenPrices[token.symbol] || (token.symbol.includes('USD') ? 1 : 0);
            const usdValue = amount * price;

            return {
                ...token,
                balance: amount,
                usdValue,
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.usdValue - a.usdValue);

    const totalValue = holdings.reduce((sum, h) => sum + h.usdValue, 0);

    // Donut chart colors
    const chartColors = ['#5C7CFF', '#00E0FF', '#00D68F', '#FFB800', '#FF4757', '#E04DBE', '#FF6B35', '#4ECDC4'];

    const handleSwapClick = (token) => {
        const found = TOKENS.find(t => t.address.toLowerCase() === token.address.toLowerCase());
        if (found) {
            setTokenIn(found);
            setAmountIn(token.balance.toFixed(6));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="skeu-panel overflow-hidden"
        >
            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <PieChart size={14} className="text-accent-primary" />
                        <h3 className="text-sm heading font-semibold text-text-primary">Portfolio</h3>
                    </div>
                    {totalValue > 0 && (
                        <span className="text-xs font-mono font-bold text-text-primary">
                            ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                    )}
                </div>

                {/* Mini donut visualization */}
                {holdings.length > 0 && totalValue > 0 && (
                    <div className="flex items-center gap-3 mb-3 p-2 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                        {/* CSS donut */}
                        <div className="w-12 h-12 rounded-full shrink-0 relative"
                            style={{
                                background: (() => {
                                    let acc = 0;
                                    const stops = holdings.map((h, i) => {
                                        const pct = (h.usdValue / totalValue) * 100;
                                        const start = acc;
                                        acc += pct;
                                        return `${chartColors[i % chartColors.length]} ${start}% ${acc}%`;
                                    });
                                    return `conic-gradient(${stops.join(', ')})`;
                                })(),
                            }}
                        >
                            <div className="absolute inset-[6px] rounded-full" style={{ background: '#111114' }} />
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                            {holdings.slice(0, 4).map((h, i) => (
                                <div key={h.symbol} className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: chartColors[i % chartColors.length] }} />
                                    <span className="text-[9px] text-text-muted">
                                        {h.symbol} {totalValue > 0 ? `${((h.usdValue / totalValue) * 100).toFixed(0)}%` : ''}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Holdings list */}
                <div className="space-y-1 max-h-[250px] overflow-y-auto pr-0.5" style={{ scrollbarWidth: 'thin' }}>
                    {holdings.length === 0 ? (
                        <p className="text-xs text-text-disabled text-center py-4">No token holdings found</p>
                    ) : (
                        holdings.map((h, i) => (
                            <motion.div
                                key={h.address}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * i }}
                                className="flex items-center justify-between p-2 rounded-lg group hover:bg-white/[0.03] transition-all"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0"
                                        style={{ background: 'rgba(92,124,255,0.1)' }}
                                    >
                                        {h.logo && <Image src={h.logo} alt={h.symbol} width={24} height={24} unoptimized />}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-text-primary">{h.symbol}</p>
                                        <p className="text-[9px] text-text-disabled font-mono">{h.balance.toFixed(4)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-right">
                                        {h.usdValue > 0 && (
                                            <p className="text-[11px] font-mono text-text-secondary">
                                                ${h.usdValue.toFixed(2)}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleSwapClick(h); }}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-primary hover:text-accent-neon cursor-pointer"
                                        title={`Swap ${h.symbol}`}
                                    >
                                        <ArrowRight size={12} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </motion.div>
    );
}
