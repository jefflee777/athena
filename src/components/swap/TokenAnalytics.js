'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import useSwapStore from '@/stores/useSwapStore';
import { Activity, TrendingUp, TrendingDown, Droplets, ShieldCheck, ShieldAlert, ExternalLink, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';

export default function TokenAnalytics() {
    const { tokenIn, tokenOut } = useSwapStore();
    const [inData, setInData] = useState(null);
    const [outData, setOutData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('in');

    useEffect(() => {
        async function fetchInfo() {
            setLoading(true);
            try {
                const [inRes, outRes] = await Promise.all([
                    tokenIn?.address ? fetch(`/api/token-info?address=${tokenIn.address}`) : null,
                    tokenOut?.address ? fetch(`/api/token-info?address=${tokenOut.address}`) : null,
                ]);
                if (inRes?.ok) setInData(await inRes.json());
                else setInData(null);
                if (outRes?.ok) setOutData(await outRes.json());
                else setOutData(null);
            } catch {
                setInData(null);
                setOutData(null);
            } finally {
                setLoading(false);
            }
        }
        fetchInfo();
    }, [tokenIn?.address, tokenOut?.address]);

    const activeToken = activeTab === 'in' ? tokenIn : tokenOut;
    const activeData = activeTab === 'in' ? inData : outData;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="skeu-panel overflow-hidden"
        >
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Activity size={14} className="text-accent-primary" />
                    <h3 className="text-sm heading font-semibold text-text-primary">Token Analytics</h3>
                </div>

                {/* Tab switcher */}
                <div className="flex gap-1 mb-3">
                    {[
                        { key: 'in', token: tokenIn },
                        { key: 'out', token: tokenOut },
                    ].map(({ key, token }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                            style={{
                                background: activeTab === key ? 'rgba(92,124,255,0.1)' : 'rgba(255,255,255,0.02)',
                                border: activeTab === key ? '1px solid rgba(92,124,255,0.2)' : '1px solid rgba(255,255,255,0.04)',
                                color: activeTab === key ? '#5C7CFF' : '#6B7280',
                            }}
                        >
                            {token?.logo && (
                                <Image src={token.logo} alt="" width={14} height={14} className="rounded-full" unoptimized />
                            )}
                            {token?.symbol || '—'}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {loading ? (
                    <div className="space-y-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-8 rounded-lg shimmer" />
                        ))}
                    </div>
                ) : activeData ? (
                    <div className="space-y-2">
                        {/* Price */}
                        {activeData.price_usd && (
                            <InfoRow
                                icon={<BarChart3 size={12} />}
                                label="Price"
                                value={`$${parseFloat(activeData.price_usd).toLocaleString(undefined, { maximumFractionDigits: 6 })}`}
                            />
                        )}

                        {/* 24h Change */}
                        {activeData.price_change_24h !== null && activeData.price_change_24h !== undefined && (
                            <InfoRow
                                icon={parseFloat(activeData.price_change_24h) >= 0
                                    ? <TrendingUp size={12} style={{ color: '#00D68F' }} />
                                    : <TrendingDown size={12} style={{ color: '#FF4757' }} />
                                }
                                label="24h Change"
                                value={`${parseFloat(activeData.price_change_24h) >= 0 ? '+' : ''}${parseFloat(activeData.price_change_24h).toFixed(2)}%`}
                                valueStyle={{
                                    color: parseFloat(activeData.price_change_24h) >= 0 ? '#00D68F' : '#FF4757'
                                }}
                            />
                        )}

                        {/* Volume */}
                        {activeData.volume_24h && (
                            <InfoRow
                                icon={<Activity size={12} />}
                                label="24h Volume"
                                value={`$${formatBigNumber(parseFloat(activeData.volume_24h))}`}
                            />
                        )}

                        {/* Liquidity */}
                        {activeData.total_reserve > 0 && (
                            <InfoRow
                                icon={<Droplets size={12} style={{ color: '#00E0FF' }} />}
                                label="Total Liquidity"
                                value={`$${formatBigNumber(activeData.total_reserve)}`}
                            />
                        )}

                        {/* Pool count */}
                        {activeData.pool_count > 0 && (
                            <InfoRow
                                icon={<BarChart3 size={12} />}
                                label="Active Pools"
                                value={activeData.pool_count.toString()}
                            />
                        )}

                        {/* FDV */}
                        {activeData.fdv && (
                            <InfoRow
                                icon={<TrendingUp size={12} />}
                                label="FDV"
                                value={`$${formatBigNumber(parseFloat(activeData.fdv))}`}
                            />
                        )}

                        {/* Verification */}
                        <div className="flex items-center justify-between py-2 border-t border-border/20">
                            <span className="text-[11px] text-text-muted flex items-center gap-1.5">
                                {activeData.verified
                                    ? <ShieldCheck size={12} style={{ color: '#00D68F' }} />
                                    : <ShieldAlert size={12} style={{ color: '#FFB800' }} />
                                }
                                {activeData.verified ? 'Verified Token' : 'Unverified'}
                            </span>
                            {activeData.address && (
                                <a
                                    href={`https://bscscan.com/token/${activeData.address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-accent-neon flex items-center gap-1 hover:underline"
                                >
                                    BscScan <ExternalLink size={9} />
                                </a>
                            )}
                        </div>

                        {/* Risk indicator */}
                        {activeData.total_reserve > 0 && activeData.total_reserve < 50000 && (
                            <div
                                className="rounded-lg p-2 text-[10px] flex items-center gap-1.5"
                                style={{
                                    background: 'rgba(255,71,87,0.06)',
                                    border: '1px solid rgba(255,71,87,0.15)',
                                    color: '#FF4757',
                                }}
                            >
                                <ShieldAlert size={11} />
                                Low liquidity — higher slippage risk
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-xs text-text-disabled text-center py-4">
                        Select a token to view analytics
                    </p>
                )}
            </div>
        </motion.div>
    );
}

function InfoRow({ icon, label, value, valueStyle }) {
    return (
        <div className="flex items-center justify-between py-1.5">
            <span className="text-[11px] text-text-muted flex items-center gap-1.5">
                {icon} {label}
            </span>
            <span className="text-[11px] font-mono text-text-secondary font-medium" style={valueStyle}>
                {value}
            </span>
        </div>
    );
}

function formatBigNumber(num) {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toFixed(2);
}
