'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaRoute, FaExchangeAlt, FaClock, FaShieldAlt, FaGasPump, FaServer, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

const tokenLogos = {
    'BNB': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png',
    'CAKE': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png',
    'USDT': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    'ETH': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
    'BUSD': 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/logo.png',
};

const sampleRoutes = [
    {
        id: 1,
        from: 'BNB',
        to: 'CAKE',
        amountIn: '10.00',
        path: ['BNB', 'BUSD', 'CAKE'],
        dexes: ['PancakeSwap', 'Biswap'],
        estimatedOutput: '3,428.12 CAKE',
        savings: '+1.2%',
        savingsUsd: '+$45.20',
        time: '~0.6s',
        status: 'optimal',
        gas: '$0.35'
    },
    {
        id: 2,
        from: 'USDT',
        to: 'BNB',
        amountIn: '1,000.00',
        path: ['USDT', 'BNB'],
        dexes: ['PancakeSwap'],
        estimatedOutput: '1.548 BNB',
        savings: '+0.4%',
        savingsUsd: '+$4.00',
        time: '~0.3s',
        status: 'fastest',
        gas: '$0.28'
    },
    {
        id: 3,
        from: 'ETH',
        to: 'CAKE',
        amountIn: '2.50',
        path: ['ETH', 'BNB', 'BUSD', 'CAKE'],
        dexes: ['SushiSwap', 'PancakeSwap', 'Biswap'],
        estimatedOutput: '5,102.88 CAKE',
        savings: '+2.1%',
        savingsUsd: '+$142.50',
        time: '~0.8s',
        status: 'optimal',
        gas: '$0.65'
    },
    {
        id: 4,
        from: 'BNB',
        to: 'USDT',
        amountIn: '5.00',
        path: ['BNB', 'USDT'],
        dexes: ['MDEX'],
        estimatedOutput: '3,225.20 USDT',
        savings: '+0.1%',
        savingsUsd: '+$3.22',
        time: '~0.2s',
        status: 'fastest',
        gas: '$0.30'
    },
];

const networkStats = [
    { icon: FaServer, label: 'Nodes Online', value: '1,024', color: '#10B981' },
    { icon: FaGasPump, label: 'Avg Gas', value: '3 Gwei', color: '#3B82F6' },
    { icon: FaExchangeAlt, label: '24h Swaps', value: '142,891', color: '#8B5CF6' },
    { icon: FaShieldAlt, label: 'Scanned Contracts', value: '84,002', color: '#F59E0B' },
];

function ComplexRouteCard({ route, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
            className="rounded-[20px] bg-[#0A0A0E] border border-[#1A1A22] overflow-hidden relative group"
            style={{
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05), 0 10px 30px -10px rgba(0,0,0,0.8)',
            }}
        >
            {/* Glowing accent border top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

            {/* Header: Trade Intro */}
            <div className="px-6 py-5 bg-[#111116] border-b border-[#1A1A22] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#15151A] border-2 border-[#111116] p-1 flex items-center justify-center relative z-20 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                            <Image src={tokenLogos[route.from]} alt={route.from} width={24} height={24} className="rounded-full" unoptimized />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#15151A] border-2 border-[#111116] p-1 flex items-center justify-center relative z-10 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                            <Image src={tokenLogos[route.to]} alt={route.to} width={24} height={24} className="rounded-full" unoptimized />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-white tracking-tight">Swap {route.from}</span>
                            <span className="text-[#666] text-xs">for</span>
                            <span className="text-lg font-bold text-white tracking-tight">{route.to}</span>
                        </div>
                        <div className="text-[11px] font-mono text-[#888] tracking-widest uppercase mt-0.5">
                            {route.amountIn} {route.from} → {route.estimatedOutput}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row sm:flex-col items-end justify-between sm:justify-start">
                    <div className="px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center gap-1.5 shadow-[inset_0_1px_1px_rgba(16,185,129,0.2)]">
                        <FaCheckCircle className="text-[#10B981] text-[10px]" />
                        <span className="text-[10px] font-bold font-mono text-[#10B981] uppercase tracking-widest">{route.status}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#666] mt-1.5 uppercase hidden sm:block">Gas: {route.gas}</span>
                </div>
            </div>

            {/* Body: Route Path & Visuals */}
            <div className="p-6 relative">

                {/* Visual Route Connectors */}
                <div className="relative mb-8 mt-2">
                    {/* Background line */}
                    <div className="absolute top-[18px] left-8 right-8 h-[2px] bg-[#1A1A22] rounded-full" />

                    <div className="flex items-center justify-between relative z-10">
                        {route.path.map((node, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="w-[38px] h-[38px] rounded-full bg-[#15151A] border-2 border-[#2A2A35] flex items-center justify-center p-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.6)] relative group-hover:border-[#444] transition-colors">
                                    <Image src={tokenLogos[node] || tokenLogos['BNB']} alt={node} width={20} height={20} className="rounded-full drop-shadow-md" unoptimized />
                                </div>
                                <span className="text-[10px] font-bold font-mono text-[#AAA] tracking-widest">{node}</span>
                            </div>
                        ))}
                    </div>

                    {/* DEX labels between tokens */}
                    <div className="absolute top-[48px] left-0 right-0 flex justify-around px-[10%] opacity-80">
                        {route.dexes.map((dex, i) => (
                            <div key={i} className="text-[9px] font-mono text-[#666] bg-[#0A0A0E] px-2 py-0.5 rounded-full border border-[#1A1A22] uppercase tracking-wide flex items-center gap-1">
                                <FaExchangeAlt className="text-[8px]" /> {dex}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Stats Sheet */}
                <div className="grid grid-cols-3 gap-2 p-1 bg-[#111116] rounded-[12px] border border-[#1A1A22] shadow-[inset_0_2px_5px_rgba(0,0,0,0.4)]">
                    <div className="p-3 bg-[#0A0A0E] rounded-[8px] border border-[#1A1A22] flex flex-col items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                        <span className="text-[10px] text-[#666] font-mono uppercase tracking-widest mb-1 shadow-sm">Routing Time</span>
                        <span className="text-[13px] font-bold text-[#EAEAEA] font-mono">{route.time}</span>
                    </div>
                    <div className="p-3 bg-[#0A0A0E] rounded-[8px] border border-[#1A1A22] flex flex-col items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#10B981_0%,transparent_70%)] opacity-5 pointer-events-none" />
                        <span className="text-[10px] text-[#666] font-mono uppercase tracking-widest mb-1">Cost Savings</span>
                        <span className="text-[14px] font-bold text-[#10B981] font-mono drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">{route.savingsUsd}</span>
                    </div>
                    <div className="p-3 bg-[#0A0A0E] rounded-[8px] border border-[#1A1A22] flex flex-col items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                        <span className="text-[10px] text-[#666] font-mono uppercase tracking-widest mb-1">Impact</span>
                        <span className="text-[13px] font-bold text-[#EAEAEA] font-mono">{route.savings}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function RoutesPage() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

    return (
        <div className="min-h-screen flex flex-col relative bg-[#050507]">
            <Navbar />

            <main ref={sectionRef} className="flex-1 relative z-10 pt-32 pb-24 px-4 overflow-hidden">

                {/* Skeuomorphic Glass Grid Background */}
                <div className="absolute inset-0 pointer-events-none flex justify-center opacity-30">
                    <div className="w-[800px] h-[800px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
                </div>

                <div className="max-w-[1000px] mx-auto relative z-10">

                    {/* Premium Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111116] border border-[#222] text-[#888] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] font-bold font-mono tracking-widest uppercase">Live Network Feed</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                                Routing <span className="text-[#888]">Intelligence</span>
                            </h1>
                            <p className="text-[#777] text-sm md:text-base leading-relaxed">
                                Watch Athena's AI engine instantly analyze thousands of liquidity pools to construct the most efficient swap paths across all major BNB Chain DEXs.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#0A0A0E] border border-[#1A1A22] rounded-[16px] p-4 flex gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.5)]"
                        >
                            <div className="flex flex-col">
                                <span className="text-[10px] text-[#666] font-mono uppercase tracking-widest mb-1">24h Vol routed</span>
                                <span className="text-xl font-bold text-white font-mono">$12.4M</span>
                            </div>
                            <div className="w-[1px] bg-[#1A1A22]" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-[#666] font-mono uppercase tracking-widest mb-1">Users saved</span>
                                <span className="text-xl font-bold text-[#10B981] font-mono">$842k</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hardware Dashboard Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
                    >
                        {networkStats.map((stat, i) => (
                            <div key={i} className="relative rounded-[20px] p-5 bg-[#111116] border border-[#222] shadow-[inset_0_2px_5px_rgba(255,255,255,0.02),0_8px_20px_rgba(0,0,0,0.4)] overflow-hidden group">
                                {/* Hardware screw details */}
                                <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#0A0A0E] shadow-[inset_0_1px_1px_rgba(0,0,0,1),0_1px_0_rgba(255,255,255,0.1)]" />
                                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#0A0A0E] shadow-[inset_0_1px_1px_rgba(0,0,0,1),0_1px_0_rgba(255,255,255,0.1)]" />
                                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[#0A0A0E] shadow-[inset_0_1px_1px_rgba(0,0,0,1),0_1px_0_rgba(255,255,255,0.1)]" />
                                <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[#0A0A0E] shadow-[inset_0_1px_1px_rgba(0,0,0,1),0_1px_0_rgba(255,255,255,0.1)]" />

                                <div className="flex flex-col items-center justify-center text-center mt-2 relative z-10">
                                    <div className="p-3 rounded-[12px] bg-[#0A0A0E] border border-[#1A1A22] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] mb-4 group-hover:bg-[#111116] transition-colors">
                                        <stat.icon style={{ color: stat.color }} className="text-xl" />
                                    </div>
                                    <span className="text-2xl font-bold font-mono text-[#EAEAEA] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{stat.value}</span>
                                    <span className="text-[10px] font-mono text-[#666] tracking-widest uppercase mt-1">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Routing Feed List Title */}
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <FaRoute className="text-[#888]" />
                        <h2 className="text-sm font-bold text-[#EAEAEA] uppercase tracking-widest">Live Route Feed</h2>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-[#222] to-transparent" />
                    </div>

                    {/* Complex Route Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sampleRoutes.map((route, index) => (
                            <ComplexRouteCard key={route.id} route={route} index={index} />
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
