'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative py-8 bg-[#050507] border-t border-[#111116] mt-auto overflow-hidden">
            <div className="max-w-[1000px] mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Brand / Logo */}
                    <div className="flex items-center gap-3">
                       <Image src="/logo.png" alt="Logo" width={140} height={80} />
                    </div>

                    {/* Navigation Links - Skeuomorphic Pills */}
                    <div className="flex items-center flex-wrap justify-center gap-3 flex-row">
                        <Link href="/swap"
                            className="px-4 py-2 rounded-[8px] bg-[#0A0A0E] border border-[#1A1A22] text-[12px] font-medium text-[#888] tracking-widest hover:text-[#EAEAEA] hover:bg-[#111116] hover:border-[#333] transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02),0_2px_5px_rgba(0,0,0,0.3)] active:translate-y-[1px]"
                        >
                            Swap
                        </Link>
                        <Link href="/roadmap"
                            className="px-4 py-2 rounded-[8px] bg-[#0A0A0E] border border-[#1A1A22] text-[12px] font-medium text-[#888] tracking-widest hover:text-[#EAEAEA] hover:bg-[#111116] hover:border-[#333] transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02),0_2px_5px_rgba(0,0,0,0.3)] active:translate-y-[1px]"
                        >
                            Roadmap
                        </Link>

                        <a href="https://bscscan.com" target="_blank" rel="noopener noreferrer"
                            className="px-4 py-2 rounded-[8px] bg-[#0A0A0E] border border-[#1A1A22] text-[12px] font-medium text-[#888] tracking-widest hover:text-[#EAEAEA] hover:bg-[#111116] hover:border-[#333] transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02),0_2px_5px_rgba(0,0,0,0.3)] active:translate-y-[1px]"
                        >
                            BscScan
                        </a>

                        <a href="https://x.com/athena_protocol" target="_blank" rel="noopener noreferrer"
                            className="px-4 py-2 rounded-[8px] bg-[#0A0A0E] border border-[#1A1A22] text-[12px] font-medium text-[#888] tracking-widest hover:text-[#EAEAEA] hover:bg-[#111116] hover:border-[#333] transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02),0_2px_5px_rgba(0,0,0,0.3)] active:translate-y-[1px]"
                        >
                            Follow on X
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
