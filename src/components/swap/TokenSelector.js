'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { TOKENS } from '@/config/tokens';
import useSwapStore from '@/stores/useSwapStore';

export default function TokenSelector() {
    const { selectorOpen, selectorSide, closeSelector, setTokenIn, setTokenOut, tokenIn, tokenOut } = useSwapStore();
    const [search, setSearch] = useState('');

    const filteredTokens = useMemo(() => {
        if (!search) return TOKENS;
        const q = search.toLowerCase();
        return TOKENS.filter(
            (t) =>
                t.symbol.toLowerCase().includes(q) ||
                t.name.toLowerCase().includes(q) ||
                t.address.toLowerCase().includes(q)
        );
    }, [search]);

    const handleSelect = (token) => {
        if (selectorSide === 'in') {
            if (token.address === tokenOut?.address) return;
            setTokenIn(token);
        } else {
            if (token.address === tokenIn?.address) return;
            setTokenOut(token);
        }
        setSearch('');
        closeSelector();
    };

    return (
        <AnimatePresence>
            {selectorOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={closeSelector}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.92, opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md skeu-panel overflow-hidden"
                    >
                        <div className="p-5">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-text-primary">
                                    Select Token
                                </h3>
                                <button
                                    onClick={closeSelector}
                                    className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-text-muted hover:text-text-primary"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Search */}
                            <div className="relative mb-4">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search by name or address..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="skeu-input w-full pl-10 pr-4 py-3 text-sm"
                                    autoFocus
                                />
                            </div>

                            {/* Popular tokens */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {TOKENS.slice(0, 6).map((token) => {
                                    const isSelected =
                                        token.address === tokenIn?.address || token.address === tokenOut?.address;
                                    return (
                                        <button
                                            key={token.address}
                                            onClick={() => handleSelect(token)}
                                            disabled={isSelected}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0
                        ${isSelected
                                                    ? 'opacity-40 cursor-not-allowed border border-border bg-bg-secondary'
                                                    : 'border border-border hover:border-accent-primary/30 hover:bg-white/5 cursor-pointer'
                                                }`}
                                        >
                                            {token.logo ? (
                                                <Image src={token.logo} alt={token.symbol} width={16} height={16} className="rounded-full" unoptimized />
                                            ) : (
                                                <span className="text-base">{token.symbol === 'BNB' ? '🔶' : token.symbol === 'USDT' ? '💵' : token.symbol === 'CAKE' ? '🥞' : '🪙'}</span>
                                            )}
                                            <span className="text-text-secondary">{token.symbol}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Token list */}
                            <div className="max-h-64 overflow-y-auto space-y-1">
                                {filteredTokens.map((token) => {
                                    const isSelected =
                                        token.address === tokenIn?.address || token.address === tokenOut?.address;
                                    return (
                                        <button
                                            key={token.address}
                                            onClick={() => handleSelect(token)}
                                            disabled={isSelected}
                                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all
                        ${isSelected
                                                    ? 'opacity-40 cursor-not-allowed'
                                                    : 'hover:bg-white/5 cursor-pointer'
                                                }`}
                                        >
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg overflow-hidden shrink-0"
                                                style={{ background: 'rgba(92,124,255,0.1)' }}
                                            >
                                                {token.logo ? (
                                                    <Image src={token.logo} alt={token.symbol} width={32} height={32} unoptimized />
                                                ) : (
                                                    token.symbol.charAt(0)
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-text-primary truncate">{token.symbol}</p>
                                                <p className="text-xs text-text-muted truncate">{token.name}</p>
                                            </div>
                                            {isSelected && (
                                                <span className="text-xs text-accent-primary font-medium">Selected</span>
                                            )}
                                        </button>
                                    );
                                })}
                                {filteredTokens.length === 0 && (
                                    <div className="text-center py-8 text-text-muted text-sm">
                                        No tokens found
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
