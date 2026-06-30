'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

const HeroScene = dynamic(() => import('./HeroScene'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#050507]" />,
});


export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
            {/* Black base */}
            <div className="absolute inset-0 bg-[#050507]" />

            {/* 3D Scene */}
            {mounted && <HeroScene />}

            {/* Radial overlay for text readability */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(5,5,7,0.2) 0%, rgba(5,5,7,0.75) 65%, rgba(5,5,7,0.95) 100%)',
                }}
            />

            {/* Hero content — white & gray only */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold heading leading-[0.92] mb-5 tracking-tight"
                >
                    <span className="text-white block">ATHENA</span>
                    <span
                        className="block mt-1 text-gray-300/80"
                    >
                        PROTOCOL
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-10"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                    An intelligent swap routing engine that scans multiple DEXs, analyzes liquidity pools, and finds the optimal path for every trade with AI powered insights built in.
                </motion.p>

                {/* CTA Buttons — Skeuomorphic white/dark */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    {/* Primary — white skeu button */}
                    <Link
                        href="/swap"
                        className="group flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                        style={{
                            background: 'linear-gradient(180deg, #FFFFFF 0%, #E8E8E8 100%)',
                            color: '#0A0A0E',
                            boxShadow: '0 2px 0 #C0C0C0, 0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.9)',
                            border: '1px solid rgba(255,255,255,0.3)',
                        }}
                    >
                        Swap Now
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    {/* Secondary — dark skeu button */}
                    <a
                        href="#features"
                        className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                        style={{
                            background: 'linear-gradient(180deg, #1A1A22 0%, #111116 100%)',
                            color: 'rgba(255,255,255,0.7)',
                            boxShadow: '0 2px 0 #000, 0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        <FileText size={16} />
                        Read More
                    </a>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="flex items-center justify-center gap-6 sm:gap-10 mt-14"
                >
                    {[
                        { value: '6+', label: 'DEXs Aggregated' },
                        { value: '12+', label: 'Tokens Supported' },
                        { value: '<1s', label: 'Route Analysis' },
                        { value: 'AI', label: 'Powered Insights' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-xl sm:text-2xl font-bold text-white mb-0.5">
                                {stat.value}
                            </p>
                            <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-medium"
                                style={{ color: 'rgba(255,255,255,0.3)' }}
                            >
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom fade to page bg */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, var(--bg-primary), transparent)',
                }}
            />
        </section>
    );
}
