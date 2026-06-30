'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SwapCard from '@/components/swap/SwapCard';
import TokenSelector from '@/components/swap/TokenSelector';
import DexComparison from '@/components/swap/DexComparison';
import AthenaSavings from '@/components/swap/AthenaSavings';
import SwapHistory from '@/components/swap/SwapHistory';
import SwapReceipt from '@/components/swap/SwapReceipt';
import AthenaAssistant from '@/components/swap/AthenaAssistant';
import TokenAnalytics from '@/components/swap/TokenAnalytics';
import GasTracker from '@/components/swap/GasTracker';
import PortfolioTracker from '@/components/swap/PortfolioTracker';
import useSwapStore from '@/stores/useSwapStore';

function SwapBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                style={{
                    background: 'radial-gradient(ellipse, rgba(92,124,255,0.04) 0%, transparent 60%)',
                }}
            />
        </div>
    );
}

export default function SwapPage() {
    const { txStatus } = useSwapStore();
    const [showReceipt, setShowReceipt] = useState(false);

    useEffect(() => {
        if (txStatus === 'success') {
            setShowReceipt(true);
        }
    }, [txStatus]);

    return (
        <div className="min-h-screen flex flex-col relative">
            <SwapBackground />
            <Navbar />
            <TokenSelector />

            <main className="flex-1 relative z-10 pt-24 pb-16 px-4">
                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-semibold heading text-text-primary mb-2">Swap Tokens</h1>
                    <p className="text-sm text-balance text-text-muted max-w-md mx-auto">
                        Athena scans every liquidity pool on BNB Chain and routes your swap through the most efficient path.
                    </p>
                </motion.div>

                {/* 3-column layout on desktop */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(480px,520px)_1fr] gap-6 items-start">

                    {/* Left sidebar */}
                    <div className="hidden lg:flex flex-col gap-4 order-1">
                        <DexComparison />
                        <TokenAnalytics />
                        <AthenaSavings />
                    </div>

                    {/* Center — Swap Card */}
                    <div className="order-2 flex justify-center">
                        <SwapCard />
                    </div>

                    {/* Right sidebar */}
                    <div className="hidden lg:flex flex-col gap-4 order-3">
                        <GasTracker />
                        <PortfolioTracker />
                        <SwapHistory />
                        <AthenaAssistant />
                    </div>

                    {/* Mobile: all panels stacked below */}
                    <div className="lg:hidden order-4 flex flex-col gap-4">
                        <GasTracker />
                        <DexComparison />
                        <TokenAnalytics />
                        <PortfolioTracker />
                        <AthenaSavings />
                        <SwapHistory />
                        <AthenaAssistant />
                    </div>
                </div>
            </main>

            <Footer />

            <SwapReceipt
                isOpen={showReceipt}
                onClose={() => setShowReceipt(false)}
            />
        </div>
    );
}
