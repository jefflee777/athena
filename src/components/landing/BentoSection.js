'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Shield, Route, Layers, Activity } from 'lucide-react';

// Reusable Skeuomorphic Card Component
const BentoCard = ({ className, children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative rounded-[24px] overflow-hidden transition-all duration-500 ease-out group ${className}`}
            style={{
                background: isHovered
                    ? 'linear-gradient(180deg, #2A2A2F 0%, #1A1A20 100%)'
                    : 'linear-gradient(180deg, #15151A 0%, #0D0D11 100%)',
                border: isHovered
                    ? '1px solid rgba(255,255,255,0.2)'
                    : '1px solid rgba(255,255,255,0.06)',
                boxShadow: isHovered
                    ? '0 0 40px rgba(255,255,255,0.05), inset 0 1px 1px rgba(255,255,255,0.15)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.02), 0 10px 30px rgba(0,0,0,0.5)',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            }}
        >
            {/* Subtle inner hover glow */}
            {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
            )}

            <div className="relative z-10 h-full flex flex-col p-8 sm:p-10">
                {children}
            </div>
        </motion.div>
    );
};

export default function BentoSection() {
    return (
        <section className="relative py-24 sm:py-32 bg-[#050507] overflow-hidden z-10 w-full">
            {/* Extremely subtle background light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-20"
                >
                    <h2 className="text-3xl heading sm:text-4xl text-white font-bold mb-4">
                        Engineered for Precision
                    </h2>
                    <p className="text-[#888] max-w-xl text-sm sm:text-base leading-relaxed">
                        Every trade is optimized through our proprietary multi-layer architecture, delivering unparalleled execution quality and safety.
                    </p>
                </motion.div>

                {/* The Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,_auto)]">

                    {/* BENTO 1: AI Copilot (Spans 2 columns) */}
                    <BentoCard className="md:col-span-2" delay={0.1}>
                        <div className="flex justify-between items-start mb-auto">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-white group-hover:bg-white/[0.06] group-hover:scale-110 transition-all duration-500">
                                <Sparkles size={22} />
                            </div>
                            <div className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-mono tracking-widest text-[#777] uppercase">
                                Intelligence
                            </div>
                        </div>

                        <div className="mt-12 relative">
                            {/* Abstract UI representation */}
                            <div className="absolute -top-12 right-0 w-64 h-32 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                <div className="absolute right-0 top-0 bg-[#1A1A22] border border-white/10 p-3 rounded-xl shadow-2xl transform translate-x-4 group-hover:translate-x-0 transition-transform duration-700 delay-100">
                                    <div className="flex gap-2 items-center mb-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22CC44]" />
                                        <div className="h-1.5 w-16 bg-white/20 rounded-full" />
                                    </div>
                                    <div className="h-1.5 w-24 bg-white/10 rounded-full" />
                                </div>
                                <div className="absolute right-12 top-14 bg-[#15151C] border border-white/5 p-3 rounded-xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                    <div className="flex gap-2 items-center mb-2">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#A855F7]" />
                                        <div className="h-1.5 w-20 bg-white/20 rounded-full" />
                                    </div>
                                    <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                                </div>
                            </div>

                            <h3 className="text-xl heading sm:text-2xl font-semibold text-white mb-3">AI-Powered Trade Copilot</h3>
                            <p className="text-[#888] text-sm leading-relaxed max-w-sm">
                                Llama 4 Maverick continuously analyzes market conditions to suggest optimal strategies, warn about token risks, and provide real-time qualitative insight for every pair.
                            </p>
                        </div>
                    </BentoCard>

                    {/* BENTO 2: Slippage Protection (Spans 1 column) */}
                    <BentoCard className="md:col-span-1" delay={0.2}>
                        <div className="flex justify-between items-start mb-auto">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-white group-hover:bg-white/[0.06] group-hover:scale-110 transition-all duration-500">
                                <Shield size={22} />
                            </div>
                        </div>

                        {/* Animated concentric rings */}
                        <div className="absolute top-8 right-8 w-32 h-32 flex items-center justify-center opacity-30 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none">
                            <div className="absolute w-full h-full border border-white/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                            <div className="absolute w-2/3 h-2/3 border border-white/30 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
                            <div className="w-1/3 h-1/3 bg-white/10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                        </div>

                        <div className="mt-20 relative z-10">
                            <h3 className="text-xl heading sm:text-2xl font-semibold text-white mb-3">MEV Guard</h3>
                            <p className="text-[#888] text-sm leading-relaxed">
                                Advanced transaction bundling and strict strict slippage tolerance to protect against front-running and sandwich attacks.
                            </p>
                        </div>
                    </BentoCard>

                    {/* BENTO 3: Multi-DEX Aggregation (Spans 1 column) */}
                    <BentoCard className="md:col-span-1" delay={0.3}>
                        <div className="flex justify-between items-start mb-auto">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-white group-hover:bg-white/[0.06] group-hover:scale-110 transition-all duration-500">
                                <Layers size={22} />
                            </div>
                        </div>

                        {/* Floating elements representing DEXs */}
                        <div className="absolute top-10 right-8 grid grid-cols-2 gap-2 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 transform transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_4px_10px_rgba(0,0,0,0.5)]" style={{ transitionDelay: `${i * 50}ms` }} />
                            ))}
                        </div>

                        <div className="mt-20 relative z-10">
                            <h3 className="text-xl heading sm:text-2xl font-semibold text-white mb-3">Unified Liquidity</h3>
                            <p className="text-[#888] text-sm leading-relaxed">
                                Access deep liquidity from PancakeSwap, SushiSwap, Biswap, and more—all securely aggregated in a single interface.
                            </p>
                        </div>
                    </BentoCard>

                    {/* BENTO 4: Deep Routing Algorithm (Spans 2 columns) */}
                    <BentoCard className="md:col-span-2 overflow-hidden" delay={0.4}>
                        <div className="flex justify-between items-start mb-auto z-10 relative">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-white group-hover:bg-white/[0.06] group-hover:scale-110 transition-all duration-500">
                                <Route size={22} />
                            </div>
                            <div className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-mono tracking-widest text-[#777] uppercase">
                                Execution
                            </div>
                        </div>

                        {/* Decorative Network Graph */}
                        <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 group-hover:opacity-60 transition-opacity duration-1000 flex items-center justify-start pointer-events-none">
                            <svg viewBox="0 0 200 200" className="w-full h-full stroke-white/40 fill-none pl-10" strokeWidth="1">
                                <path d="M 0 100 Q 50 50 100 100 T 200 100" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                                <path d="M 0 100 Q 50 150 100 100 T 200 50" strokeDasharray="4 4" className="animate-[dash_15s_linear_infinite]" />
                                <circle cx="100" cy="100" r="4" className="fill-white stroke-none" />
                                <circle cx="50" cy="75" r="3" className="fill-white/50 stroke-none" />
                                <circle cx="150" cy="125" r="3" className="fill-white/50 stroke-none" />
                                <circle cx="150" cy="75" r="3" className="fill-white/50 stroke-none" />
                            </svg>
                        </div>

                        <div className="mt-16 sm:mt-12 relative z-10">
                            <h3 className="text-xl heading sm:text-2xl font-semibold text-white mb-3">Sub-Second Route Optimization</h3>
                            <p className="text-[#888] text-sm leading-relaxed max-w-sm">
                                Athena mathematically computes thousands of potential direct and multi-hop routing permutations to guarantee the highest absolute output for your token swaps.
                            </p>
                        </div>
                    </BentoCard>

                </div>
            </div>

            <style jsx global>{`
                @keyframes dash {
                    to {
                        stroke-dashoffset: -100;
                    }
                }
            `}</style>
        </section>
    );
}
