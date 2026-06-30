'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const DEX_LOGOS = [
    { name: 'BNB Chain', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png' },
    { name: 'PancakeSwap', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png' },
    { name: 'SushiSwap', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2/logo.png' },
    { name: 'Biswap', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x965F527D9159dCe6288a2219DB51fc6Eef120dD1/logo.png' },
    { name: 'MDEX', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x9C65AB58d8d978DB963e63f2bfB7121627e3a739/logo.png' },
    { name: 'ApeSwap', logo: 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/BANANA.svg' },
    { name: 'BabySwap', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657/logo.png' },
];

// Duplicate the array to create a seamless infinite loop
const MARQUEE_ITEMS = [...DEX_LOGOS, ...DEX_LOGOS, ...DEX_LOGOS, ...DEX_LOGOS];

export default function EcosystemMarquee() {
    return (
        <section className="relative py-12 sm:py-16 bg-[#050507] overflow-hidden border-t border-white/[0.04]">

            {/* Very subtle gradient overlay for the text */}
            <div className="max-w-[1200px] mx-auto px-4 relative z-10 mb-8 sm:mb-12">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-[10px] heading sm:text-xs font-mono tracking-[0.3em] text-[#555] uppercase font-bold text-center">
                        Synthesizing Liquidity From
                    </p>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="relative flex overflow-x-hidden group">

                {/* Left & Right gradient masks for smooth fade out */}
                <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#050507] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#050507] to-transparent z-20 pointer-events-none" />

                {/* Animated Track */}
                <motion.div
                    className="flex items-center gap-12 sm:gap-20 whitespace-nowrap py-4"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ ease: 'linear', duration: 35, repeat: Infinity }}
                >
                    {MARQUEE_ITEMS.map((dex, index) => (
                        <div
                            key={`${dex.name}-${index}`}
                            className="flex items-center gap-3 sm:gap-4 opacity-40 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0 cursor-pointer"
                        >
                            <div className="relative w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300">
                                <Image
                                    src={dex.logo}
                                    alt={dex.name}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            <span className="text-sm sm:text-base font-semibold text-[#EAEAEA] heading tracking-wider">
                                {dex.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <style jsx global>{`
                /* Pause animation on hover for better UX */
                .group:hover div {
                    animation-play-state: paused !important;
                }
            `}</style>
        </section>
    );
}
