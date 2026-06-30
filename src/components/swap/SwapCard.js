'use client';

import { motion } from 'framer-motion';
import { ArrowDownUp, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import useSwapStore from '@/stores/useSwapStore';
import SwapSettings from './SwapSettings';
import SwapButton from './SwapButton';
import SwapAnalytics from './SwapAnalytics';
import RoutePreview from './RoutePreview';
import useQuote from '@/hooks/useQuote';

export default function SwapCard() {
    const {
        tokenIn,
        tokenOut,
        amountIn,
        amountOut,
        setAmountIn,
        switchTokens,
        openSelector,
        loading,
        route,
    } = useSwapStore();

    // Fetch quote when amountIn changes
    useQuote();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-[520px]"
        >
            <div className="skeu-panel overflow-hidden">
                <div className="p-5 sm:p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg heading font-semibold text-text-primary">Swap</h2>
                        <SwapSettings />
                    </div>

                    {/* Token In */}
                    <div className="token-row mb-2">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-text-muted">You Pay</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                inputMode="decimal"
                                placeholder="0.0"
                                value={amountIn}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^[0-9]*\.?[0-9]*$/.test(val)) {
                                        setAmountIn(val);
                                    }
                                }}
                                className="flex-1 heading min-w-0 bg-transparent text-2xl sm:text-3xl font-semibold text-text-primary outline-none placeholder:text-text-disabled font-mono"
                            />
                            <button
                                onClick={() => openSelector('in')}
                                className="shrink-0 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-xl transition-all hover:bg-white/5"
                                style={{
                                    background: 'rgba(92,124,255,0.08)',
                                    border: '1px solid rgba(92,124,255,0.15)',
                                }}
                            >
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden"
                                    style={{ background: 'linear-gradient(135deg, #5C7CFF, #00E0FF)' }}
                                >
                                    {tokenIn?.logo ? (
                                        <Image src={tokenIn.logo} alt={tokenIn.symbol} width={24} height={24} unoptimized />
                                    ) : (
                                        tokenIn?.symbol?.charAt(0)
                                    )}
                                </div>
                                <span className="text-sm font-semibold text-text-primary truncate max-w-[60px] sm:max-w-[100px]">{tokenIn?.symbol}</span>
                                <ChevronDown size={14} className="text-text-muted" />
                            </button>
                        </div>
                    </div>

                    {/* Swap direction button */}
                    <div className="flex justify-center -my-3 relative z-10">
                        <motion.button
                            whileHover={{ rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            onClick={switchTokens}
                            className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
                            style={{
                                background: 'linear-gradient(145deg, #1C1C21, #111114)',
                                border: '1px solid var(--color-border)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            }}
                        >
                            <ArrowDownUp size={16} className="text-accent-primary" />
                        </motion.button>
                    </div>

                    {/* Token Out */}
                    <div className="token-row mt-2 mb-5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-text-muted">You Receive</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 min-w-0 overflow-hidden">
                                {loading ? (
                                    <div className="h-8 w-24 sm:w-40 rounded-lg shimmer" />
                                ) : (
                                    <div className="text-2xl sm:text-3xl font-semibold heading truncate"
                                        style={{ color: amountOut ? '#F1F3F7' : '#4A4D55' }}
                                        title={amountOut || '0.0'}
                                    >
                                        {amountOut || '0.0'}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => openSelector('out')}
                                className="shrink-0 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-xl transition-all hover:bg-white/5"
                                style={{
                                    background: 'rgba(0,224,255,0.06)',
                                    border: '1px solid rgba(0,224,255,0.12)',
                                }}
                            >
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden"
                                    style={{ background: 'linear-gradient(135deg, #00E0FF, #00B8D4)' }}
                                >
                                    {tokenOut?.logo ? (
                                        <Image src={tokenOut.logo} alt={tokenOut.symbol} width={24} height={24} unoptimized />
                                    ) : (
                                        tokenOut?.symbol?.charAt(0)
                                    )}
                                </div>
                                <span className="text-sm font-semibold text-text-primary truncate max-w-[60px] sm:max-w-[100px]">{tokenOut?.symbol}</span>
                                <ChevronDown size={14} className="text-text-muted" />
                            </button>
                        </div>
                    </div>

                    {/* Route Preview */}
                    <RoutePreview />

                    {/* Analytics */}
                    <div className="mb-5">
                        <SwapAnalytics />
                    </div>

                    {/* Swap Button */}
                    <SwapButton />
                </div>
            </div>
        </motion.div>
    );
}
