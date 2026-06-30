'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X } from 'lucide-react';
import useSwapStore from '@/stores/useSwapStore';

export default function SwapSettings() {
    const { slippage, setSlippage, deadline, setDeadline } = useSwapStore();
    const [open, setOpen] = useState(false);
    const [customSlippage, setCustomSlippage] = useState('');

    const presets = [0.1, 0.5, 1.0];

    const handleCustom = (val) => {
        setCustomSlippage(val);
        const num = parseFloat(val);
        if (!isNaN(num) && num > 0 && num <= 50) {
            setSlippage(num);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-text-muted hover:text-text-primary"
            >
                <Settings size={18} className={open ? 'animate-spin' : ''} style={{ animationDuration: '2s' }} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 w-72 skeu-panel p-4 z-50"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-text-primary">Transaction Settings</h4>
                            <button onClick={() => setOpen(false)} className="text-text-muted hover:text-text-primary">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Slippage */}
                        <div className="mb-4">
                            <label className="text-xs text-text-muted mb-2 block">Slippage Tolerance</label>
                            <div className="flex gap-2">
                                {presets.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => { setSlippage(p); setCustomSlippage(''); }}
                                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${slippage === p && !customSlippage
                                                ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                                                : 'bg-bg-secondary border border-border text-text-secondary hover:border-border-hover'
                                            }`}
                                    >
                                        {p}%
                                    </button>
                                ))}
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Custom"
                                        value={customSlippage}
                                        onChange={(e) => handleCustom(e.target.value)}
                                        className="skeu-input w-full py-2 px-2 text-xs text-center"
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-text-muted">%</span>
                                </div>
                            </div>
                            {slippage > 5 && (
                                <p className="text-xs text-warning mt-1.5">⚠️ High slippage may result in unfavorable trades</p>
                            )}
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="text-xs text-text-muted mb-2 block">Transaction Deadline</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={deadline}
                                    onChange={(e) => setDeadline(parseInt(e.target.value) || 20)}
                                    className="skeu-input w-20 py-2 px-3 text-xs text-center"
                                    min={1}
                                    max={180}
                                />
                                <span className="text-xs text-text-muted">minutes</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
