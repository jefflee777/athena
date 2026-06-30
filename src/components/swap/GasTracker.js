'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fuel, Zap, Clock, TrendingDown } from 'lucide-react';

export default function GasTracker() {
    const [gasData, setGasData] = useState(null);
    const [bnbPrice, setBnbPrice] = useState(null);

    useEffect(() => {
        async function fetchGas() {
            try {
                // Fetch gas price from BSC RPC
                const gasRes = await fetch('https://bsc-dataseed.binance.org', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'eth_gasPrice',
                        params: [],
                        id: 1,
                    }),
                });
                const gasJson = await gasRes.json();
                const gasPriceWei = parseInt(gasJson.result, 16);
                const gasPriceGwei = gasPriceWei / 1e9;

                setGasData({
                    low: Math.max(1, gasPriceGwei * 0.8),
                    standard: gasPriceGwei,
                    fast: gasPriceGwei * 1.2,
                    rawWei: gasPriceWei,
                });

                // Fetch BNB price from GeckoTerminal
                const priceRes = await fetch('/api/token-info?address=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c');
                if (priceRes.ok) {
                    const priceData = await priceRes.json();
                    setBnbPrice(parseFloat(priceData.price_usd || 0));
                }
            } catch (e) {
                console.error('Gas fetch error:', e);
            }
        }

        fetchGas();
        const interval = setInterval(fetchGas, 15_000);
        return () => clearInterval(interval);
    }, []);

    // Estimate swap cost (~150k gas for a typical swap)
    const SWAP_GAS = 150_000;
    const swapCostBNB = gasData ? (gasData.rawWei * SWAP_GAS) / 1e18 : 0;
    const swapCostUSD = swapCostBNB * (bnbPrice || 0);

    const getGasLevel = () => {
        if (!gasData) return 'normal';
        if (gasData.standard <= 3) return 'low';
        if (gasData.standard <= 5) return 'normal';
        return 'high';
    };

    const levelConfig = {
        low: { color: '#00D68F', label: 'Low', bg: 'rgba(0,214,143,0.06)' },
        normal: { color: '#FFB800', label: 'Normal', bg: 'rgba(255,184,0,0.06)' },
        high: { color: '#FF4757', label: 'Busy', bg: 'rgba(255,71,87,0.06)' },
    };

    const level = getGasLevel();
    const config = levelConfig[level];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="skeu-panel overflow-hidden"
        >
            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Fuel size={14} style={{ color: config.color }} />
                        <h3 className="text-sm heading font-semibold text-text-primary">Gas Tracker</h3>
                    </div>
                    <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                        style={{ background: config.bg, color: config.color, border: `1px solid ${config.color}22` }}
                    >
                        {config.label}
                    </span>
                </div>

                {gasData ? (
                    <>
                        {/* Gas tiers */}
                        <div className="grid grid-cols-3 gap-1.5 mb-3">
                            {[
                                { label: '🐢 Low', value: gasData.low, icon: <Clock size={10} /> },
                                { label: '⚡ Standard', value: gasData.standard, icon: <Zap size={10} /> },
                                { label: '🚀 Fast', value: gasData.fast, icon: <TrendingDown size={10} /> },
                            ].map((tier) => (
                                <div
                                    key={tier.label}
                                    className="rounded-lg p-2 text-center"
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                    }}
                                >
                                    <p className="text-[9px] text-text-disabled mb-1">{tier.label}</p>
                                    <p className="text-xs font-mono font-bold text-text-primary">
                                        {tier.value.toFixed(1)}
                                    </p>
                                    <p className="text-[8px] text-text-disabled">gwei</p>
                                </div>
                            ))}
                        </div>

                        {/* Estimated swap cost */}
                        <div
                            className="rounded-lg p-2.5 flex items-center justify-between"
                            style={{
                                background: 'rgba(92,124,255,0.04)',
                                border: '1px solid rgba(92,124,255,0.08)',
                            }}
                        >
                            <span className="text-[11px] text-text-muted">Est. Swap Cost</span>
                            <div className="text-right">
                                <p className="text-xs font-mono font-semibold text-text-primary">
                                    {swapCostBNB.toFixed(5)} BNB
                                </p>
                                {swapCostUSD > 0 && (
                                    <p className="text-[9px] font-mono text-text-disabled">
                                        ≈ ${swapCostUSD.toFixed(4)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="space-y-2">
                        <div className="h-16 rounded-lg shimmer" />
                        <div className="h-10 rounded-lg shimmer" />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
