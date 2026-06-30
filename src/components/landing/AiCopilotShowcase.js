'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowDown, ShieldCheck, Zap, Bot, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SwapCard from '../swap/SwapCard';

export default function AiCopilotShowcase() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Animation Sequencer State (0 to 5)
    const [step, setStep] = useState(0);

    // Sequence timing logic
    useEffect(() => {
        if (!isInView) return;

        const timers = [
            setTimeout(() => setStep(1), 800),  // Step 1: User asks
            setTimeout(() => setStep(2), 2000), // Step 2: AI analyzing
            setTimeout(() => setStep(3), 4000), // Step 3: Swap UI updates with route
            setTimeout(() => setStep(4), 5000), // Step 4: AI found route
            setTimeout(() => setStep(5), 6500), // Step 5: AI security check
        ];

        return () => timers.forEach(clearTimeout);
    }, [isInView]);

    return (
        <section ref={sectionRef} className="relative py-20 bg-[#050507] overflow-hidden">

            {/* Extremely subtle radial background lighting (NOT linear gradients) */}
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_60%)] pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 md:mb-16"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#EAEAEA] heading">
                        Your Personal Trading Copilot
                    </h2>
                    <p className="mt-6 text-[#777] max-w-2xl mx-auto text-sm">
                        Athena doesn't just route your trades it analyzes them. Get real time qualitative insights, optimal routing strategy explanations, and smart contract security checks before you ever sign a transaction.
                    </p>
                </motion.div>

                {/* The Interactive Showcase layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* LEFT: The AI Chat Interface */}
                    <div className="lg:col-span-7 order-2 lg:order-1 relative rounded-[16px] overflow-hidden bg-[#111116] border border-[#222] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.8)]">

                        {/* Header Area - Solid Top Bar */}
                        <div className="flex items-center gap-4 px-6 py-4 bg-[#15151A] border-b border-[#222] shadow-[0_4px_20px_rgba(0,0,0,0.4)] relative z-10">
                            {/* Skeuomorphic Avatar */}
                            <div className="w-10 h-10 shrink-0 rounded-[10px] bg-[#1A1A22] border border-[#333] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                               <Image src="/agent.png" alt="Logo" width={40} height={40} />
                            </div>
                            <div>
                                <h3 className="text-[13px] font-bold text-white tracking-[0.05em] uppercase">Athena Intelligence</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
                                    <span className="text-[10px] font-mono text-[#666] uppercase tracking-widest">Online & Analyzing</span>
                                </div>
                            </div>
                        </div>

                        {/* Chat Body - Deep Inset Panel */}
                        <div className="p-6 space-y-6 h-[400px] sm:h-[450px] overflow-y-auto no-scrollbar relative flex flex-col bg-[#0A0A0E] shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]">

                            {/* User Message */}
                            <AnimatePresence>
                                {step >= 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                                        className="flex gap-4 self-end flex-row-reverse max-w-[85%]"
                                    >
                                        <div className="w-8 h-8 shrink-0 rounded-full bg-[#15151A] border border-[#222] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] flex items-center justify-center">
                                            <User size={14} className="text-[#666]" />
                                        </div>
                                        {/* User Bubble - Slightly raised */}
                                        <div className="px-5 py-3 rounded-[12px] rounded-tr-sm bg-[#1A1A22] border border-[#2A2A35] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_10px_rgba(0,0,0,0.3)]">
                                            <p className="text-[13px] text-[#DDD] leading-relaxed">
                                                I want to swap 10 BNB into CAKE. Can you find the best route and verify the CAKE contract?
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* AI Analyzing Message */}
                            <AnimatePresence>
                                {step >= 2 && step < 4 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                                        className="flex gap-4 max-w-[85%]"
                                    >
                                        <div className="w-8 h-8 shrink-0 rounded-[8px] bg-[#111116] border border-[#333] flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
                                           <Image src="/agent.png" alt="Logo" width={40} height={40} />
                                        </div>
                                        <div className="px-5 py-3 rounded-[12px] rounded-tl-sm bg-[#0E0E12] border border-[#1A1A22] flex items-center gap-4">
                                            <div className="flex gap-1.5 items-center h-5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#444] animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#555] animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#666] animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                            <span className="text-[11px] text-[#666] font-mono tracking-widest uppercase">Scanning Liquidity...</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* AI Route Found Message */}
                            <AnimatePresence>
                                {step >= 4 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                                        className="flex gap-4 max-w-[85%]"
                                    >
                                        <div className="w-8 h-8 shrink-0 rounded-[8px] bg-[#111116] border border-[#333] flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                                            <Bot size={14} className="text-[#AAA]" />
                                        </div>
                                        {/* AI Bubble - Solid, structured */}
                                        <div className="p-1 rounded-[12px] rounded-tl-sm bg-[#15151A] border border-[#222] shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
                                            <div className="px-5 py-3 border-b border-[#222]">
                                                <p className="text-[13px] text-white font-bold flex items-center gap-2">
                                                    Optimal Route Acquired
                                                    <span className="w-2 h-2 bg-[#10B981] rounded-full shadow-[0_0_8px_#10B981]" />
                                                </p>
                                            </div>
                                            {/* Inset Code Block / Data display */}
                                            <div className="m-2 p-4 bg-[#0A0A0E] rounded-[8px] border border-[#1A1A22] shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] space-y-3">
                                                <div className="flex items-center justify-between text-[11px] font-mono border-b border-[#1A1A22] pb-2">
                                                    <span className="text-[#555] uppercase tracking-widest">Strategy</span>
                                                    <span className="text-[#888]">Multi-hop Split</span>
                                                </div>
                                                <div className="text-[12px] font-mono text-[#AAA] leading-7">
                                                    BNB <span className="text-[#444] mx-2">→</span> BUSD <span className="text-[#555] ml-2 text-[10px] uppercase">(PancakeSwap)</span><br />
                                                    BUSD <span className="text-[#444] mx-2">→</span> CAKE <span className="text-[#555] ml-2 text-[10px] uppercase">(Biswap)</span>
                                                </div>
                                                <div className="pt-3 mt-1 border-t border-[#1A1A22] flex items-center gap-3 text-[12px]">
                                                    <div className="flex items-center gap-1.5 text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-[4px] border border-[#10B981]/20">
                                                        <Zap size={12} />
                                                        <span className="font-bold font-mono">3,428.12 CAKE</span>
                                                    </div>
                                                    <span className="text-[#555] text-[10px] font-mono">+1.2% vs direct route</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* AI Security Check Message */}
                            <AnimatePresence>
                                {step >= 5 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                                        className="flex gap-4 max-w-[85%]"
                                    >
                                        <div className="w-8 h-8 shrink-0 opacity-0" /> {/* Spacer */}
                                        <div className="px-5 py-4 rounded-[12px] bg-[#111116] border border-[#222] relative overflow-hidden group shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
                                            {/* Solid Green Left Border accent */}
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10B981]" />

                                            <div className="flex items-start gap-4 pl-2">
                                                <div className="w-6 h-6 rounded-full bg-[#10B981]/10 flex items-center justify-center shrink-0 border border-[#10B981]/20">
                                                    <ShieldCheck size={12} className="text-[#10B981]" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[12px] font-bold text-[#EEE] mb-1.5 uppercase tracking-wide">Contract Verified Secure</h4>
                                                    <p className="text-[12px] text-[#777] leading-relaxed">
                                                        CAKE is the official PancakeSwap token. No honeypot code detected. Buy/Sell tax is 0%. Safe to transact.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>

                        {/* Chat Input Mock - Solid raised bar */}
                        <div className="p-4 bg-[#111116] border-t border-[#222] shadow-[0_-4px_20px_rgba(0,0,0,0.5)] relative z-10">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-[8px] bg-[#0A0A0E] border border-[#1A1A22] shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]">
                                <div className="w-3 h-3 rounded-sm bg-[#333] animate-pulse" />
                                <span className="text-[11px] text-[#555] font-mono tracking-widest uppercase">Input commands...</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: The Swap Interface Mock */}
                    <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center justify-center w-full">
                        <div className="w-full max-w-[520px] relative pointer-events-none opacity-90 scale-95 lg:scale-100 origin-center">
                            <div className="absolute inset-0 z-50 rounded-3xl" />
                            <SwapCard />
                        </div>
                        <div className="mt-8 relative z-10">
                            <Link href="/swap" className="px-8 py-4 inline-flex items-center gap-2 rounded-xl font-bold text-sm tracking-wide bg-[#10B981] text-black shadow-[0_4px_15px_rgba(16,185,129,0.4),inset_0_2px_4px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-200 uppercase pointer-events-auto">
                                Go to Swap
                                <ArrowDown size={16} className="-rotate-90" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
