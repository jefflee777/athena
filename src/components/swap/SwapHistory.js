'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { getSwapHistory, clearSwapHistory } from '@/hooks/useSwapHistory';
import { getTokenBySymbol } from '@/config/tokens';

export default function SwapHistory() {
    const [history, setHistory] = useState([]);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        setHistory(getSwapHistory());
    }, []);

    const handleClear = () => {
        clearSwapHistory();
        setHistory([]);
    };

    if (history.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="skeu-panel overflow-hidden"
            >
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <History size={14} className="text-accent-primary" />
                        <h3 className="text-sm heading font-semibold text-text-primary">Swap History</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <History size={32} className="text-text-disabled mb-3" />
                        <p className="text-xs text-text-muted">No swaps yet</p>
                        <p className="text-[10px] text-text-disabled mt-1">Your completed swaps will appear here</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="skeu-panel overflow-hidden"
        >
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <History size={14} className="text-accent-primary" />
                        <h3 className="text-sm heading font-semibold text-text-primary">Swap History</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono"
                            style={{ background: 'rgba(92,124,255,0.1)', color: '#5C7CFF' }}
                        >
                            {history.length}
                        </span>
                    </div>
                    <button
                        onClick={handleClear}
                        className="text-text-disabled hover:text-error text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                        <Trash2 size={10} />
                        Clear
                    </button>
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                    {history.map((entry, i) => {
                        const isExpanded = expanded === entry.id;
                        const inToken = getTokenBySymbol(entry.tokenIn?.symbol);
                        const outToken = getTokenBySymbol(entry.tokenOut?.symbol);
                        const timeAgo = getTimeAgo(entry.timestamp);

                        return (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * i }}
                                className="rounded-xl overflow-hidden cursor-pointer transition-all"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.04)',
                                }}
                                onClick={() => setExpanded(isExpanded ? null : entry.id)}
                            >
                                <div className="p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 rounded-full overflow-hidden border border-border z-10"
                                                style={{ background: 'rgba(92,124,255,0.1)' }}
                                            >
                                                {inToken?.logo && <Image src={inToken.logo} alt="" width={24} height={24} unoptimized />}
                                            </div>
                                            <div className="w-6 h-6 rounded-full overflow-hidden border border-border -ml-2"
                                                style={{ background: 'rgba(0,224,255,0.1)' }}
                                            >
                                                {outToken?.logo && <Image src={outToken.logo} alt="" width={24} height={24} unoptimized />}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-text-primary">
                                                {entry.tokenIn?.symbol} → {entry.tokenOut?.symbol}
                                            </p>
                                            <p className="text-[10px] text-text-disabled">{timeAgo}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <p className="text-xs font-mono text-text-secondary">
                                                +{parseFloat(entry.amountOut || 0).toFixed(4)}
                                            </p>
                                        </div>
                                        {isExpanded ? <ChevronUp size={12} className="text-text-muted" /> : <ChevronDown size={12} className="text-text-muted" />}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="border-t border-border/20"
                                        >
                                            <div className="p-3 space-y-2 text-[11px]">
                                                <div className="flex justify-between">
                                                    <span className="text-text-disabled">Amount In</span>
                                                    <span className="font-mono text-text-secondary">{entry.amountIn} {entry.tokenIn?.symbol}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-text-disabled">Amount Out</span>
                                                    <span className="font-mono text-text-secondary">{parseFloat(entry.amountOut || 0).toFixed(6)} {entry.tokenOut?.symbol}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-text-disabled">Rate</span>
                                                    <span className="font-mono text-text-secondary">{entry.rate}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-text-disabled">DEX</span>
                                                    <span className="text-text-secondary">{entry.dex || '—'}</span>
                                                </div>
                                                {entry.txHash && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-text-disabled">Tx</span>
                                                        <a
                                                            href={`https://bscscan.com/tx/${entry.txHash}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-accent-neon hover:underline"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {entry.txHash.slice(0, 8)}...{entry.txHash.slice(-4)}
                                                            <ExternalLink size={9} />
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

function getTimeAgo(timestamp) {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}
