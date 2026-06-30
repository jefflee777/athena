'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaRocket, FaShieldAlt, FaBolt } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';

export default function CtaSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="relative py-24 sm:py-32 bg-[#050507] overflow-hidden border-t border-[#111116]">

            {/* Background lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-[1000px] mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* The Main Skeuomorphic Card */}
                    <div className="relative rounded-[24px] p-8 md:p-14 bg-[#0A0A0E] border border-[#1A1A22] text-center overflow-hidden"
                        style={{
                            boxShadow: 'inset 0 2px 20px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.6)'
                        }}
                    >
                        {/* Decorative top accent */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                        {/* Three mini-feature badges floating around top */}
                        <div className="flex justify-center gap-4 md:gap-8 mb-8">
                            <div className="w-12 h-12 flex items-center justify-center rounded-[12px] bg-[#111116] border border-[#222] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_10px_rgba(0,0,0,0.4)]">
                                <FaBolt className="text-xl" />
                            </div>
                            <div className="w-16 h-16 flex items-center justify-center rounded-[16px] bg-[#EAEAEA] border border-white text-[#0A0A0E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_6px_15px_rgba(255,255,255,0.1)] -mt-2">
                                <FaRocket className="text-3xl" />
                            </div>
                            <div className="w-12 h-12 flex items-center justify-center rounded-[12px] bg-[#111116] border border-[#222] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_10px_rgba(0,0,0,0.4)]">
                                <FaShieldAlt className="text-xl" />
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-[#EAEAEA] tracking-tight mb-4">
                            Start Trading Smarter
                        </h2>

                        <p className="text-[#888] text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-10">
                            Stop leaving money on the table. Connect your wallet to Athena and let the AI Copilot route your next swap across the BNB chain for optimal returns and ironclad security.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">

                            {/* Primary Skeuomorphic Action Button */}
                            <Link href="/swap" className="w-full sm:w-auto px-10 py-4 rounded-[12px] font-bold text-[14px] tracking-widest uppercase transition-all duration-300 relative overflow-hidden group border border-transparent hover:border-white/20 flex items-center justify-center gap-3 text-black"
                                style={{
                                    background: '#EAEAEA',
                                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -4px 4px rgba(0,0,0,0.1), 0 10px 20px -5px rgba(255,255,255,0.2)'
                                }}
                            >
                                <span className="relative z-10 transition-transform group-active:translate-y-[2px]">Swap</span>
                                <BsArrowRight className="text-lg relative z-10 transition-transform group-active:translate-y-[2px]" />
                            </Link>

                            {/* Secondary Button */}
                            <a href="https://docs.athena-ai.xyz" target="_blank" rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 rounded-[12px] font-bold text-[14px] tracking-widest uppercase transition-all duration-300 bg-[#111116] border border-[#333] text-[#AAA] hover:text-[#EAEAEA] hover:bg-[#15151A] hover:border-[#444] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_10px_rgba(0,0,0,0.4)] flex items-center justify-center active:translate-y-[2px]"
                            >
                                Read Docs
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
