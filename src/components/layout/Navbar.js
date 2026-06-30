'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, LogOut, ExternalLink, Menu, X } from 'lucide-react';
import { FaWallet } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const handleConnect = () => {
        if (typeof window !== 'undefined') {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            // If on mobile and no injected wallet found (like MetaMask app browser), deep link to MetaMask
            if (isMobile && !window.ethereum) {
                window.location.href = `https://metamask.app.link/dapp/${window.location.host}${pathname}`;
                return;
            }
        }
        connect({ connector: injected() });
    };

    const truncatedAddress = address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : '';

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Swap', href: '/swap' },
        { label: 'Routes', href: '/routes' },
        { label: 'Roadmap', href: '/roadmap' },
        { label: 'BscScan', href: 'https://bscscan.com', external: true },
    ];

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-20"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
                {/* Liquid Glass Pill Container */}
                <div className="rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between relative "
                    style={{
                        background: 'rgba(10, 10, 14, 0.6)',
                        backdropFilter: 'blur(40px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {/* Liquid glass specular highlight */}
                    <div className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.01) 100%)',
                        }}
                    />

                    {/* Logo */}
                    <Link href="/" className="relative z-10 shrink-0">
                        <Image src="/logo.png" alt="Athena" width={100} height={50} className="sm:h-6 h-5 w-auto" />
                    </Link>

                    {/* Desktop Nav Links — Skeuomorphic Pills */}
                    <div className="hidden md:flex items-center gap-1.5 relative z-10">
                        {navLinks.map((link) => {
                            const isActive = !link.external && pathname === link.href;
                            const Component = link.external ? 'a' : Link;
                            const extraProps = link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

                            return (
                                <Component
                                    key={link.label}
                                    href={link.href}
                                    {...extraProps}
                                    className={`px-4 py-2 rounded-full text-[13px] font-medium tracking-widest transition-all duration-200 ${isActive
                                        ? 'bg-[#EAEAEA] text-[#0A0A0E] shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.1),0_2px_8px_rgba(255,255,255,0.1)]'
                                        : 'text-[#888] hover:text-[#EAEAEA] hover:bg-white/5'
                                        }`}
                                >
                                    {link.label}
                                </Component>
                            );
                        })}
                    </div>

                    {/* Right Side: Wallet + Mobile Toggle */}
                    <div className="flex items-center gap-2 relative z-10">

                        {/* Wallet Button */}
                        <div className="relative">
                            {isConnected ? (
                                <div>
                                    <button
                                        onClick={() => setMenuOpen(!menuOpen)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-mono font-bold uppercase tracking-wider transition-all duration-200 bg-[#111116] border border-[#2A2A35] text-[#AAA] hover:text-[#EAEAEA] hover:border-[#444]"
                                        style={{
                                            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.4)',
                                        }}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-[#10B981]"
                                            style={{ boxShadow: '0 0 8px rgba(16,185,129,0.5)' }}
                                        />
                                        {truncatedAddress}
                                        <ChevronDown size={12} className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {menuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-3 w-52 rounded-[16px] p-2 bg-[#111116] z-50 border border-[#222] shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                            >
                                                <a
                                                    href={`https://bscscan.com/address/${address}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[12px] font-medium text-[#888] hover:text-[#EAEAEA] hover:bg-white/5 transition-all  tracking-widest"
                                                >
                                                    <ExternalLink size={14} />
                                                    View on BscScan
                                                </a>
                                                <button
                                                    onClick={() => { disconnect(); setMenuOpen(false); }}
                                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[12px] font-medium text-red-400 hover:bg-red-400/10 transition-all  tracking-widest"
                                                >
                                                    <LogOut size={14} />
                                                    Disconnect
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <button
                                    onClick={handleConnect}
                                    className="flex items-center gap-2 px-5 py-2 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all duration-200 text-[#0A0A0E] active:translate-y-px"
                                    style={{
                                        background: '#EAEAEA',
                                        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -3px 4px rgba(0,0,0,0.1), 0 4px 12px rgba(255,255,255,0.1)',
                                    }}
                                >
                                    <FaWallet className="text-sm" />
                                    <span className="hidden sm:inline">Connect</span>
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#111116] border border-[#222] text-[#888] hover:text-[#EAEAEA] transition-all"
                            style={{
                                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.4)',
                            }}
                        >
                            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav Dropdown */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="md:hidden mt-2 rounded-[20px] p-3 overflow-hidden"
                            style={{
                                background: 'rgba(10, 10, 14, 0.85)',
                                backdropFilter: 'blur(40px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                            }}
                        >
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link) => {
                                    const isActive = !link.external && pathname === link.href;
                                    const Component = link.external ? 'a' : Link;
                                    const extraProps = link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

                                    return (
                                        <Component
                                            key={link.label}
                                            href={link.href}
                                            {...extraProps}
                                            onClick={() => setMobileOpen(false)}
                                            className={`px-4 py-3 rounded-[12px] text-[13px] font-medium tracking-widest transition-all duration-200 ${isActive
                                                ? 'bg-[#EAEAEA] text-[#0A0A0E] shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),0_2px_8px_rgba(255,255,255,0.1)]'
                                                : 'text-[#888] hover:text-[#EAEAEA] hover:bg-white/5'
                                                }`}
                                        >
                                            {link.label}
                                        </Component>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
