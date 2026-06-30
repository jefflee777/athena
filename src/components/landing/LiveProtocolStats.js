'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Activity, Clock, Layers, Zap } from 'lucide-react';

// Animated Counter component
function Counter({ from, to, duration = 2, delay = 0, format = (v) => v }) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const formatted = useTransform(rounded, (latest) => format(latest));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView) {
            const controls = animate(count, to, {
                duration,
                delay,
                ease: "easeOut",
            });
            return controls.stop;
        }
    }, [count, from, to, duration, delay, inView]);

    return <motion.span ref={ref}>{formatted}</motion.span>;
}

// Decimal Animated Counter component
function DecimalCounter({ from, to, decimals = 1, duration = 2, delay = 0, prefix = "", suffix = "" }) {
    const count = useMotionValue(from);
    const formatted = useTransform(count, (latest) => `${prefix}${latest.toFixed(decimals)}${suffix}`);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView) {
            const controls = animate(count, to, {
                duration,
                delay,
                ease: "easeOut",
            });
            return controls.stop;
        }
    }, [count, from, to, duration, delay, inView]);

    return <motion.span ref={ref}>{formatted}</motion.span>;
}

const STATS_DATA = [
    {
        id: "volume",
        label: "Total Volume Routed",
        value: 124.5,
        prefix: "$",
        suffix: "M+",
        decimals: 1,
        icon: <Activity size={18} />,
        color: "from-blue-500",
        shadowColor: "rgba(59, 130, 246, 0.4)",
    },
    {
        id: "dexes",
        label: "Supported DEX Engines",
        value: 6,
        prefix: "",
        suffix: "+",
        decimals: 0,
        icon: <Layers size={18} />,
        color: "from-purple-500",
        shadowColor: "rgba(168, 85, 247, 0.4)",
    },
    {
        id: "speed",
        label: "Average Route Time",
        value: 0.8,
        prefix: "< ",
        suffix: "s",
        decimals: 1,
        icon: <Zap size={18} />,
        color: "from-emerald-500",
        shadowColor: "rgba(16, 185, 129, 0.4)",
    },
    {
        id: "uptime",
        label: "Protocol Uptime",
        value: 99.99,
        prefix: "",
        suffix: "%",
        decimals: 2,
        icon: <Clock size={18} />,
        color: "from-amber-500",
        shadowColor: "rgba(245, 158, 11, 0.4)",
    }
];

export default function LiveProtocolStats() {
    return (
        <section className="relative py-20 bg-[#050507] overflow-hidden border-t border-b border-white/[0.04]">

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {STATS_DATA.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative flex flex-col items-center justify-center p-8 rounded-[20px] group transition-transform duration-500 hover:scale-[1.02]"
                            style={{
                                background: 'linear-gradient(180deg, #111116 0%, #0A0A0E 100%)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)',
                            }}
                        >
                            {/* Hover Neon Accent Line */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] opacity-0 group-hover:w-1/2 group-hover:opacity-100 transition-all duration-500 ease-out"
                                style={{
                                    background: `linear-gradient(90deg, transparent 0%, ${stat.shadowColor} 50%, transparent 100%)`,
                                    boxShadow: `0 2px 10px ${stat.shadowColor}`
                                }}
                            />

                            {/* Inner glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                {/* Icon container */}
                                <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A1A22] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-[#888] group-hover:text-white transition-colors duration-500">
                                    {stat.icon}
                                </div>

                                {/* Animated Number */}
                                <div className="text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-2 flex items-baseline heading justify-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                                    <DecimalCounter
                                        from={0}
                                        to={stat.value}
                                        decimals={stat.decimals}
                                        duration={2.5}
                                        delay={0.2 + (index * 0.1)}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                    />
                                </div>

                                {/* Label */}
                                <div className="text-[11px] font-mono tracking-[0.2em] text-[#666] uppercase font-bold group-hover:text-[#888] transition-colors duration-500 mt-2">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
