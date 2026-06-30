'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, BarChart3, Layers, Sparkles, User, Box, Code } from 'lucide-react';

const ATHENA_LAYERS = [
    {
        id: 'interface',
        title: 'INTERFACE LAYER',
        functions: ['Portfolio Tracking', 'Swap Dashboard'],
        role: 'Intuitive user interface for tracking token holdings, viewing allocation breakdowns, and executing swaps instantly.',
        icon: <Box size={16} />
    },
    {
        id: 'intelligence',
        title: 'INTELLIGENCE LAYER',
        functions: ['AI-Powered Insights', 'Trade Analysis'],
        role: 'Built-in AI assistant powered by Llama 4 that analyzes your trades, suggests optimal strategies, and provides safety warnings.',
        icon: <Sparkles size={16} />
    },
    {
        id: 'aggregation',
        title: 'AGGREGATION LAYER',
        functions: ['Multi-DEX Synthesis', 'Pool Scanning'],
        role: 'Aggregates fragmented liquidity from PancakeSwap, SushiSwap, BiSwap, MDEX, BabySwap, and ApeSwap into a single unified engine.',
        icon: <Layers size={16} />
    },
    {
        id: 'analysis',
        title: 'ANALYSIS LAYER',
        functions: ['Real-Time Analytics', 'Gas Tracking'],
        role: 'Provides live token analytics, gas tracking, price impact calculation, and route visualization before execution.',
        icon: <BarChart3 size={16} />
    },
    {
        id: 'routing',
        title: 'ROUTING LAYER',
        functions: ['Optimal Path Finding', 'Multi-Hop Routes'],
        role: 'Analyzes direct and multi-hop paths across 6+ DEXs to mathematically find the best output amount for every swap.',
        icon: <Zap size={16} />
    },
    {
        id: 'execution',
        title: 'EXECUTION LAYER',
        functions: ['Slippage Guard', 'Transaction Bundling'],
        role: 'Calculates price impact and enforces slippage tolerance to protect against unfavorable trade execution and MEV bots.',
        icon: <Shield size={16} />
    }
];

export default function FeaturesSection() {
    const [hoveredLayer, setHoveredLayer] = useState(null);

    return (
        <section id="features" className="relative py-24 sm:py-32 bg-[#050507] overflow-hidden">
            {/* Dot grid background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            <div className="max-w-[1400px] mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl heading sm:text-4xl md:text-5xl font-bold text-white ">
                        Technical Path
                    </h2>
                </motion.div>

                {/* Desktop Layout — 3 Columns */}
                <div className="hidden lg:block relative">
                    {/* Headers */}
                    <div className="grid grid-cols-12 gap-8 mb-16 text-[10px] font-mono tracking-[0.2em] text-[#555] uppercase font-bold px-4">
                        <div className="col-span-3 text-right">Core Products / Functions</div>
                        <div className="col-span-6 text-center">Architecture Layer</div>
                        <div className="col-span-3 text-left">Role & Value</div>
                    </div>

                    {/* Layers Container */}
                    <div className="space-y-4 relative">
                        {ATHENA_LAYERS.map((layer, index) => {
                            const isHovered = hoveredLayer === layer.id;
                            const isDimmed = hoveredLayer !== null && !isHovered;

                            return (
                                <div
                                    key={layer.id}
                                    className="relative grid grid-cols-12 gap-8 items-center py-2 px-4 transition-all duration-500 ease-out group"
                                    onMouseEnter={() => setHoveredLayer(layer.id)}
                                    onMouseLeave={() => setHoveredLayer(null)}
                                >
                                    {/* Left Column — Functions */}
                                    <div
                                        className="col-span-3 flex flex-col items-end justify-center gap-3 relative transition-all duration-500"
                                        style={{ opacity: isDimmed ? 0.2 : 1 }}
                                    >
                                        {layer.functions.map((fn, i) => (
                                            <div key={i} className="flex items-center gap-4 w-full justify-end group/fn">
                                                <span className={`text-[13px] font-medium whitespace-nowrap transition-colors duration-300 ${isHovered ? 'text-gray-200' : 'text-[#666]'}`}>
                                                    {fn}
                                                </span>
                                                {/* Connecting horizontal line to layer */}
                                                <div className={`h-px transition-all duration-500 ${isHovered ? 'w-12 bg-gray-500' : 'w-8 bg-[#222]'}`} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Center Column — The Layer Block (Skeuomorphic) */}
                                    <div className="col-span-6 flex justify-center relative">
                                        <div
                                            className="w-full max-w-[480px] rounded-[14px] flex items-center justify-center py-5 relative transition-all duration-500 cursor-default overflow-hidden"
                                            style={{
                                                background: isHovered
                                                    ? 'linear-gradient(180deg, #2A2A2F 0%, #1A1A20 100%)'
                                                    : 'linear-gradient(180deg, #15151A 0%, #0D0D11 100%)',
                                                border: isHovered
                                                    ? '1px solid rgba(255,255,255,0.4)'
                                                    : '1px solid rgba(255,255,255,0.06)',
                                                boxShadow: isHovered
                                                    ? '0 0 40px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.8)'
                                                    : 'inset 0 1px 0 rgba(255,255,255,0.02), 0 4px 15px rgba(0,0,0,0.4)',
                                                transform: isHovered ? 'scale(1.03) translateY(-2px)' : 'scale(1)',
                                                zIndex: isHovered ? 20 : 10,
                                                opacity: isDimmed ? 0.4 : 1,
                                            }}
                                        >
                                            {/* Suble inner glow on hover */}
                                            {isHovered && (
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                                            )}

                                            <div className="flex items-center gap-4 px-8 relative z-10 w-full justify-center">
                                                <div className={`transition-colors duration-500 ${isHovered ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-[#555]'}`}>
                                                    {layer.icon}
                                                </div>
                                                <span className={`text-[15px] heading tracking-[0.15em] font-bold uppercase transition-colors duration-500 ${isHovered ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-[#777]'}`}>
                                                    {layer.title}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column — Description */}
                                    <div
                                        className="col-span-3 flex items-center relative transition-all duration-500"
                                        style={{ opacity: isDimmed ? 0.2 : 1 }}
                                    >
                                        {/* Connecting horizontal line from layer */}
                                        <div className={`h-px mr-6 w-7 transition-all duration-500 shrink-0 ${isHovered ? 'bg-gray-500' : 'bg-[#222]'}`} />

                                        {/* Vertical line left border effect for description block on hover */}
                                        <div className="relative pl-4 overflow-hidden">
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: '100%', opacity: 1 }}
                                                    className="absolute left-0 top-0 w-[2px] bg-white/60"
                                                />
                                            )}
                                            <p className={`text-[13px] leading-relaxed transition-colors duration-500 ${isHovered ? 'text-gray-200' : 'text-[#555]'}`}>
                                                {layer.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile / Tablet Layout — Stacked Cards (Also updated for Skeuomorphism) */}
                <div className="lg:hidden space-y-6">
                    {ATHENA_LAYERS.map((layer) => {
                        const isHovered = hoveredLayer === layer.id;
                        const isDimmed = hoveredLayer !== null && !isHovered;

                        return (
                            <div
                                key={layer.id}
                                className="relative rounded-[16px] p-6 transition-all duration-500 ease-out overflow-hidden"
                                onMouseEnter={() => setHoveredLayer(layer.id)}
                                onMouseLeave={() => setHoveredLayer(null)}
                                style={{
                                    opacity: isDimmed ? 0.4 : 1,
                                    background: isHovered
                                        ? 'linear-gradient(180deg, #2A2A2F 0%, #1A1A20 100%)'
                                        : 'linear-gradient(180deg, #15151A 0%, #0D0D11 100%)',
                                    border: isHovered
                                        ? '1px solid rgba(255,255,255,0.3)'
                                        : '1px solid rgba(255,255,255,0.06)',
                                    boxShadow: isHovered
                                        ? '0 0 30px rgba(255,255,255,0.05), inset 0 1px 1px rgba(255,255,255,0.15)'
                                        : 'inset 0 1px 0 rgba(255,255,255,0.02)',
                                    transform: isHovered ? 'scale(1.02) translateY(-2px)' : 'scale(1)',
                                }}
                            >
                                {isHovered && (
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                                )}

                                <div className="flex items-center gap-4 mb-6 relative z-10 border-b border-white/5 pb-4">
                                    <div className={`transition-colors duration-500 ${isHovered ? 'text-white' : 'text-[#666]'}`}>
                                        {layer.icon}
                                    </div>
                                    <span className={`text-[15px] tracking-[0.1em] font-bold uppercase transition-colors duration-500 ${isHovered ? 'text-white' : 'text-[#777]'}`}>
                                        {layer.title}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                                    <div>
                                        <h4 className="text-[10px] font-mono tracking-widest text-[#444] font-bold mb-4 uppercase">
                                            Functions
                                        </h4>
                                        <ul className="space-y-3">
                                            {layer.functions.map((fn, i) => (
                                                <li key={i} className={`text-[13px] font-medium flex items-center gap-3 transition-colors duration-500 ${isHovered ? 'text-gray-200' : 'text-[#666]'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isHovered ? 'bg-white/40' : 'bg-[#333]'}`} />
                                                    {fn}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-mono tracking-widest text-[#444] font-bold mb-4 uppercase">
                                            Role & Value
                                        </h4>
                                        <p className={`text-[13px] leading-relaxed transition-colors duration-500 ${isHovered ? 'text-gray-200' : 'text-[#555]'}`}>
                                            {layer.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
