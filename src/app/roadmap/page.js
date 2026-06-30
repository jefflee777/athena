'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Target, Zap, Globe, Rocket, Shield, LineChart, ChevronRight, Activity, Terminal, Cpu, Network } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ROADMAP_DATA = [
    {
        id: "phase-1",
        phase: "Phase 1",
        title: "Foundation & Infrastructure",
        status: "Completed / In Progress",
        statusColor: "#10B981", // Emerald
        statusText: "SYS_ONLINE",
        progress: 95,
        icon: Shield,
        items: [
            "Project concept and ecosystem architecture design",
            "Athena AI branding and positioning",
            "AI-powered DEX execution model research",
            "Core liquidity aggregation structure planning",
            "Website and social channel launch",
            "Community foundation setup",
            "Strategic partner onboarding initiation"
        ]
    },
    {
        id: "phase-2",
        phase: "Phase 2",
        title: "Community & Market Expansion",
        status: "Current Phase",
        statusColor: "#3B82F6", // Blue
        statusText: "EXECUTING",
        progress: 40,
        icon: Globe,
        items: [
            "Global community growth across X, Telegram, and Web3 channels",
            "AI x DeFi narrative marketing campaigns",
            "KOL and ecosystem partnership expansion",
            "Exchange communication and listing preparation",
            "Liquidity strategy planning",
            "Ecosystem awareness campaigns"
        ],
        extra: {
            title: "Exchange Discussions",
            list: ["Gate", "KuCoin", "BingX", "MEXC"]
        }
    },
    {
        id: "phase-3",
        phase: "Phase 3",
        title: "Product & Ecosystem Development",
        status: "Upcoming",
        statusColor: "#8B5CF6", // Purple
        statusText: "QUEUED",
        progress: 0,
        icon: Terminal,
        items: [
            "AI-powered execution intelligence infrastructure development",
            "Advanced DEX routing optimization system",
            "Liquidity aggregation engine enhancement",
            "Trading analytics and AI optimization features",
            "Strategic ecosystem integrations",
            "Cross-platform liquidity support preparation"
        ]
    },
    {
        id: "phase-4",
        phase: "Phase 4",
        title: "TGE & Exchange Expansion",
        status: "Planned",
        statusColor: "#F59E0B", // Amber
        statusText: "AWAITING_DEPLOY",
        progress: 0,
        icon: Rocket,
        items: [
            "Token Generation Event (TGE)",
            "Centralized exchange listings",
            "Trading campaigns and launch marketing",
            "Liquidity expansion initiatives",
            "Community incentive programs",
            "Market maker and ecosystem coordination"
        ]
    },
    {
        id: "phase-5",
        phase: "Phase 5",
        title: "Long-Term Ecosystem Growth",
        status: "Future Vision",
        statusColor: "#EC4899", // Pink
        statusText: "LOCKED",
        progress: 0,
        icon: Network,
        items: [
            "Expansion into multi-chain liquidity intelligence",
            "AI-powered decentralized trading infrastructure scaling",
            "Institutional-grade execution optimization tools",
            "Advanced AI trading analytics",
            "Global ecosystem partnership expansion",
            "Sustainable long-term DeFi infrastructure growth"
        ]
    }
];

function RoadmapNode({ phase, index }) {
    const isEven = index % 2 === 0;
    const Icon = phase.icon;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className={`relative flex flex-col md:flex-row items-center w-full mb-12 sm:mb-24 ${isEven ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Center Timeline Node (Hardware Style) */}
            <div className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 sm:flex hidden flex-col items-center justify-center z-20 top-0">
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                    className="w-[42px] h-[42px] rounded-full bg-[#0A0A0E] border-2 border-[#1A1A22] hidden md:flex items-center justify-center shadow-[inset_0_2px_5px_rgba(255,255,255,0.05),0_4px_15px_rgba(0,0,0,0.8)] relative group cursor-default"
                >
                    {/* Pulsing Core */}
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: phase.statusColor }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: phase.statusColor, boxShadow: `0 0 12px ${phase.statusColor}, 0 0 24px ${phase.statusColor}` }} />
                    
                    {/* Outer Ring */}
                    <svg className="absolute -inset-[8px] w-[54px] h-[54px] -rotate-90 pointer-events-none opacity-50">
                        <circle cx="27" cy="27" r="26" stroke="#222" strokeWidth="1" fill="none" />
                        <circle cx="27" cy="27" r="26" stroke={phase.statusColor} strokeWidth="1.5" fill="none" strokeDasharray="163" strokeDashoffset={163 - (163 * phase.progress) / 100} className="transition-all duration-1000 ease-out" />
                    </svg>
                </motion.div>
                {/* Horizontal Connector Line for Desktop
                <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={`hidden md:block absolute top-[21px] w-12 h-[2px] bg-gradient-to-r ${isEven ? 'right-full origin-left' : 'left-full origin-right'}`}
                    style={{
                        backgroundImage: `linear-gradient(to ${isEven ? 'left' : 'right'}, ${phase.statusColor}80, transparent)`
                    }}
                /> */}
            </div>

            {/* Content Module */}
            <div className={`w-full md:w-1/2 px-0 sm:pl-20 sm:pr-4 md:px-12 relative z-10 ${isEven ? 'text-left' : 'text-left'}`}>
                <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 70 }}
                    className="relative group"
                >
                    {/* Advanced Skeuomorphic Hardware Card */}
                    <div className="relative rounded-[24px] bg-[#08080B] border border-[#1A1A22] p-1 overflow-hidden transition-all duration-500 hover:border-[#333] shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                        
                        {/* Glow Behind */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{ background: `radial-gradient(600px circle at ${isEven ? '100% 0%' : '0% 0%'}, ${phase.statusColor}15, transparent)` }} 
                        />

                        <div className="relative h-full w-full bg-[#0C0C10] rounded-[20px] p-6 sm:p-8 border border-[#1A1A22] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] overflow-hidden">
                            
                            {/* Hardware Screws */}
                            <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-[#050507] shadow-[inset_0_1px_1px_rgba(0,0,0,1),0_1px_0_rgba(255,255,255,0.1)]" />
                            <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#050507] shadow-[inset_0_1px_1px_rgba(0,0,0,1),0_1px_0_rgba(255,255,255,0.1)]" />
                            
                            {/* Header Section */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                                <div className="p-3 rounded-[14px] bg-[#050507] border border-[#1A1A22] shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center shrink-0">
                                    <Icon className="w-6 h-6" style={{ color: phase.statusColor }} />
                                </div>
                                <div className={`flex flex-col`}>
                                    <span className="text-sm font-semibold text-[#555] font-mono bg-clip-text">
                                        {phase.phase} — {phase.status}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold heading text-white mb-6 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {phase.title}
                            </h3>

                            {/* Divider */}
                            <div className="w-full h-[1px] bg-gradient-to-r from-[#1A1A22] via-[#2A2A35] to-[#1A1A22] mb-6 opacity-50" />

                            <ul className={`space-y-4 flex flex-col`}>
                                {phase.items.map((item, i) => (
                                    <li key={i} className={`flex items-start gap-3 text-sm text-[#888] font-medium leading-relaxed group/item max-w-lg text-left`}>
                                        <div className={`mt-1.5 w-[5px] h-[5px] rounded-full  text-left transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_8px_rgba(255,255,255,0.5)]`} style={{ backgroundColor: phase.statusColor }} />
                                        <span className={`transition-colors duration-300 group-hover/item:text-[#EAEAEA] text-left`}>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Extra Info (Terminal Block) */}
                            {phase.extra && (
                                <div className="mt-8 relative">
                                    <div className="absolute inset-0 bg-[#050507] rounded-[12px] opacity-80" />
                                    <div className={`relative p-4 border border-[#1A1A22] rounded-[12px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] flex flex-col ${isEven ? 'md:items-end' : 'items-start'}`}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Activity size={12} className="text-[#555]" />
                                            <span className="text-[10px] font-mono tracking-widest uppercase text-[#555] font-bold">
                                                {phase.extra.title}
                                            </span>
                                        </div>
                                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                                            {phase.extra.list.map((item, i) => (
                                                <span key={i} className="px-3 py-1.5 rounded-[6px] bg-[#111116] border border-[#2A2A35] text-[11px] font-mono text-[#AAA] shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:text-white transition-colors cursor-default">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function RoadmapPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="min-h-screen bg-[#030305] text-[#EAEAEA] font-sans selection:bg-[#5C7CFF]/30 overflow-x-hidden relative flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-24 relative z-10">
                {/* Advanced Tech Background */}
                <div className="fixed inset-0 pointer-events-none opacity-40">
                    <div className="absolute bottom-[0%] right-[0%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,224,255,0.04)_0%,transparent_60%)] blur-[80px]" />
                </div>
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_10%,transparent_100%)] opacity-30" />
                <div className="absolute inset-0 pointer-events-none bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10" ref={containerRef}>
                    
                    {/* Hero Header */}
                    <div className="text-center mb-32 relative">                
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold heading tracking-tight text-white mb-6 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                        >
                            Development <span className="text-[#5C7CFF]">Roadmap</span>
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-[#777] max-w-2xl mx-auto text-sm sm:text-base text-balance"
                        >
                            Initializing strategic blueprint for scalable AI powered execution intelligence. Sequence initiated.
                        </motion.p>
                    </div>

                    {/* Timeline Track Container */}
                    <div className="relative w-full max-w-5xl mx-auto">
                        
                        {/* Main Vertical Track Background */}
                        <div className="hidden sm:block absolute left-[48px] md:left-1/2 top-4 bottom-0 w-[4px] bg-[#0A0A0E] border-x border-[#111116] md:-translate-x-1/2 z-0" />
                        
                        {/* Main Vertical Glowing Track (Animated) */}
                        <div className="hidden sm:block absolute left-[49px] md:left-1/2 top-4 bottom-0 w-[2px] md:-translate-x-1/2 z-0 origin-top overflow-hidden">
                            <motion.div 
                                className="w-full h-full bg-gradient-to-b from-[#10B981] via-[#3B82F6] to-transparent opacity-80"
                                style={{ scaleY }}
                            />
                        </div>

                        {ROADMAP_DATA.map((phase, index) => (
                            <RoadmapNode key={phase.id} phase={phase} index={index} />
                        ))}

                    </div>

                    {/* Long Term Goal Component - Premium Server Rack Style */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-32 max-w-4xl mx-auto relative"
                    >
                        <div className="relative p-1 rounded-[32px] overflow-hidden group bg-gradient-to-b from-[#1A1A22] to-[#0A0A0E] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-[#222]">
                            
                            {/* Animated scanner line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#5C7CFF] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20" />
                            
                            <div className="relative p-8 md:p-14 rounded-[28px] bg-[#08080B] flex flex-col items-center text-center shadow-[inset_0_2px_20px_rgba(255,255,255,0.02)] overflow-hidden">
                                
                                {/* Background Grid for the card */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />

                                <div className="relative w-20 h-20 rounded-2xl bg-[#050507] border border-[#2A2A35] flex items-center justify-center mb-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.5)] group-hover:border-[#5C7CFF]/50 transition-colors duration-500">
                                    <div className="absolute inset-0 bg-[#5C7CFF] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl" />
                                    <Globe className="w-10 h-10 text-[#EAEAEA] drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                                </div>
                                
                                <h3 className="text-3xl md:text-4xl font-semibold heading text-white mb-6 tracking-tight z-10">
                                    The Core Directive
                                </h3>
                                
                                <p className="text-[#888] text-base md:text-lg leading-relaxed max-w-2xl mx-auto z-10">
                                    Athena AI aims to become a scalable AI-powered execution intelligence layer for decentralized finance, helping users achieve smarter liquidity access, optimized execution, and more efficient decentralized trading experiences across the evolving Web3 ecosystem.
                                </p>

                                {/* Bottom Decorative UI */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-30">
                                    <div className="w-8 h-[2px] bg-[#333]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#555]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#555]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#555]" />
                                    <div className="w-8 h-[2px] bg-[#333]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
