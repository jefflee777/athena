'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import useSwapStore from '@/stores/useSwapStore';
import { getTokenBySymbol } from '@/config/tokens';
import { addSwapToHistory } from '@/hooks/useSwapHistory';
import { X, Download, ExternalLink, Check, ArrowRight, Copy, CheckCheck } from 'lucide-react';

export default function SwapReceipt({ isOpen, onClose }) {
    const receiptRef = useRef(null);
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const { tokenIn, tokenOut, amountIn, amountOut, route, txHash, slippage } = useSwapStore();

    const rate = amountOut && amountIn && parseFloat(amountIn) > 0
        ? (parseFloat(amountOut) / parseFloat(amountIn)).toFixed(6)
        : '—';

    // Save to history once when receipt opens
    useEffect(() => {
        if (isOpen && txHash && !saved) {
            addSwapToHistory({
                tokenIn: { symbol: tokenIn?.symbol, logo: tokenIn?.logo, address: tokenIn?.address },
                tokenOut: { symbol: tokenOut?.symbol, logo: tokenOut?.logo, address: tokenOut?.address },
                amountIn,
                amountOut,
                rate,
                dex: route?.dex?.name,
                path: route?.path,
                txHash,
                slippage,
                priceImpact: route?.priceImpact,
                status: 'success',
            });
            setSaved(true);
        }
        if (!isOpen) setSaved(false);
    }, [isOpen, txHash, saved, tokenIn, tokenOut, amountIn, amountOut, rate, route, slippage]);

    const copyHash = useCallback(() => {
        if (txHash) {
            navigator.clipboard.writeText(txHash);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [txHash]);

    const downloadReceipt = useCallback(async () => {
        const el = receiptRef.current;
        if (!el) return;

        setDownloading(true);
        try {
            // Dynamic import to avoid SSR issues
            const html2canvasModule = await import('html2canvas');
            const html2canvas = html2canvasModule.default;

            const canvas = await html2canvas(el, {
                backgroundColor: '#0D0D12',
                scale: 2,
                useCORS: true,
                logging: false,
                allowTaint: true,
                removeContainer: true,
                // Ignore external images that fail CORS
                onclone: (clonedDoc) => {
                    const imgs = clonedDoc.querySelectorAll('img');
                    imgs.forEach(img => {
                        img.crossOrigin = 'anonymous';
                    });
                },
            });

            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `athena-swap-${new Date().toISOString().slice(0, 10)}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error('Failed to download receipt:', e);
            // Fallback: create a text receipt
            try {
                const text = [
                    '═══ ATHENA SWAP RECEIPT ═══',
                    '',
                    `${amountIn} ${tokenIn?.symbol} → ${amountOut} ${tokenOut?.symbol}`,
                    '',
                    `Rate: 1 ${tokenIn?.symbol} = ${rate} ${tokenOut?.symbol}`,
                    `Price Impact: ${(route?.priceImpact || 0).toFixed(2)}%`,
                    `Slippage: ${slippage}%`,
                    `DEX: ${route?.dex?.name || '—'}`,
                    `Route: ${route?.path?.join(' → ') || '—'}`,
                    `Time: ${new Date().toLocaleString()}`,
                    `Tx: https://bscscan.com/tx/${txHash || '—'}`,
                    '',
                    'Powered by Athena Protocol',
                ].join('\n');

                const blob = new Blob([text], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `athena-swap-${new Date().toISOString().slice(0, 10)}.txt`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            } catch { }
        } finally {
            setDownloading(false);
        }
    }, [amountIn, amountOut, tokenIn, tokenOut, rate, route, slippage, txHash]);

    if (!isOpen) return null;

    const inToken = getTokenBySymbol(tokenIn?.symbol);
    const outToken = getTokenBySymbol(tokenOut?.symbol);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-200 flex items-center justify-center p-4"
                style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25 }}
                    className="w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Receipt card */}
                    <div ref={receiptRef} className="skeu-panel overflow-hidden">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-text-primary">Swap Receipt</h2>
                                <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Success badge */}
                            <div className="flex justify-center mb-6">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(0,214,143,0.15), rgba(0,214,143,0.05))',
                                        border: '2px solid rgba(0,214,143,0.3)',
                                        boxShadow: '0 0 30px rgba(0,214,143,0.1)',
                                    }}
                                >
                                    <Check size={32} style={{ color: '#00D68F' }} />
                                </div>
                            </div>

                            {/* Token swap visualization */}
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center" style={{ background: 'rgba(92,124,255,0.1)' }}>
                                        {inToken?.logo ? <Image src={inToken.logo} alt={tokenIn?.symbol || ''} width={40} height={40} unoptimized /> : <span className="text-sm font-bold">{tokenIn?.symbol?.charAt(0)}</span>}
                                    </div>
                                    <span className="text-lg font-bold font-mono text-text-primary">{parseFloat(amountIn || 0).toFixed(4)}</span>
                                    <span className="text-xs text-text-muted">{tokenIn?.symbol}</span>
                                </div>

                                <ArrowRight size={20} className="text-accent-primary mt-[-16px]" />

                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center" style={{ background: 'rgba(0,224,255,0.1)' }}>
                                        {outToken?.logo ? <Image src={outToken.logo} alt={tokenOut?.symbol || ''} width={40} height={40} unoptimized /> : <span className="text-sm font-bold">{tokenOut?.symbol?.charAt(0)}</span>}
                                    </div>
                                    <span className="text-lg font-bold font-mono" style={{ color: '#00D68F' }}>{parseFloat(amountOut || 0).toFixed(4)}</span>
                                    <span className="text-xs text-text-muted">{tokenOut?.symbol}</span>
                                </div>
                            </div>

                            {/* Details */}
                            <div
                                className="rounded-xl p-4 space-y-3 mb-4"
                                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                <DetailRow label="Rate" value={`1 ${tokenIn?.symbol} = ${rate} ${tokenOut?.symbol}`} />
                                <DetailRow label="Price Impact" value={`${(route?.priceImpact || 0).toFixed(2)}%`} />
                                <DetailRow label="Slippage" value={`${slippage}%`} />
                                <DetailRow label="DEX" value={route?.dex?.name || '—'} />
                                <DetailRow label="Route" value={route?.path?.join(' → ') || '—'} />
                                <DetailRow label="Time" value={new Date().toLocaleString()} />

                                {txHash && (
                                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                                        <span className="text-xs text-text-muted">Tx Hash</span>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-mono text-accent-neon">
                                                {txHash.slice(0, 8)}...{txHash.slice(-6)}
                                            </span>
                                            <button onClick={copyHash} className="text-text-muted hover:text-text-primary cursor-pointer">
                                                {copied ? <CheckCheck size={10} style={{ color: '#00D68F' }} /> : <Copy size={10} />}
                                            </button>
                                            <a
                                                href={`https://bscscan.com/tx/${txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-text-muted hover:text-accent-primary"
                                            >
                                                <ExternalLink size={10} />
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Athena branding */}
                            <p className="text-[10px] text-text-disabled text-center">
                                Powered by Athena Protocol — Optimized Routing on BNB Chain
                            </p>
                        </div>
                    </div>

                    {/* Download button (outside receipt so it's not captured) */}
                    <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={downloadReceipt}
                        disabled={downloading}
                        className="w-full mt-3 py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        style={{
                            background: 'linear-gradient(135deg, #5C7CFF, #4A66D9)',
                            boxShadow: '0 4px 15px rgba(92,124,255,0.3)',
                        }}
                    >
                        <Download size={16} />
                        {downloading ? 'Generating...' : 'Download Receipt'}
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">{label}</span>
            <span className="text-xs font-mono text-text-secondary">{value}</span>
        </div>
    );
}
