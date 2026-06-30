'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, Bot, User, Lightbulb, TrendingUp, Shield, Zap } from 'lucide-react';
import useSwapStore from '@/stores/useSwapStore';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

const QUICK_PROMPTS = [
    { icon: <Lightbulb size={12} />, text: 'Analyze my swap', prompt: 'Analyze my current swap setup and suggest if this is a good trade.' },
    { icon: <Shield size={12} />, text: 'Slippage tips', prompt: 'What slippage should I use for my current swap? Explain the risks.' },
    { icon: <TrendingUp size={12} />, text: 'Price impact', prompt: 'Explain the price impact of my trade and how to minimize it.' },
    { icon: <Zap size={12} />, text: 'Gas savings', prompt: 'How can I optimize gas fees when swapping on BNB Chain?' },
];

export default function AthenaAssistant() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    const { tokenIn, tokenOut, amountIn, amountOut, route, allRoutes, slippage } = useSwapStore();

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getSwapContext = () => {
        if (!tokenIn || !tokenOut) return null;
        return {
            tokenIn: tokenIn.symbol,
            tokenOut: tokenOut.symbol,
            amountIn: amountIn || undefined,
            amountOut: amountOut || undefined,
            rate: amountIn && amountOut && parseFloat(amountIn) > 0
                ? (parseFloat(amountOut) / parseFloat(amountIn)).toFixed(6)
                : undefined,
            priceImpact: route?.priceImpact?.toFixed(2),
            dex: route?.dex?.name,
            routesScanned: allRoutes?.length,
            slippage,
        };
    };

    const sendMessage = async (text) => {
        if (!text.trim() || loading) return;

        const userMsg = { role: 'user', content: text.trim() };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages.map(m => ({ role: m.role, content: m.content })),
                    context: getSwapContext(),
                }),
            });

            const data = await res.json();

            if (data.error) {
                setMessages([...newMessages, {
                    role: 'assistant',
                    content: `⚠️ ${data.error}`,
                }]);
            } else {
                setMessages([...newMessages, {
                    role: 'assistant',
                    content: data.reply,
                }]);
            }
        } catch (err) {
            setMessages([...newMessages, {
                role: 'assistant',
                content: '⚠️ Failed to connect to AI service. Please try again.',
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="skeu-panel overflow-hidden"
        >
            <div className="p-4">
                {/* Header */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between mb-3 cursor-pointer"
                >
                    <div className="flex items-center gap-2">
                        <div
                            className="w-6 h-6 rounded-lg flex items-center justify-center overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, rgba(92,124,255,0.2), rgba(0,224,255,0.2))',
                                border: '1px solid rgba(92,124,255,0.3)',
                            }}
                        >
                            <Image src="/agent.png" alt="agent" width={24} height={24} />
                        </div>
                        <h3 className="text-sm heading font-semibold text-text-primary">Athena AI</h3>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                            style={{ background: 'rgba(92,124,255,0.1)', color: '#5C7CFF' }}
                        >
                            BETA
                        </span>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-text-muted"
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Quick prompts */}
                            {messages.length === 0 && (
                                <div className="grid grid-cols-2 gap-1.5 mb-3">
                                    {QUICK_PROMPTS.map((qp, i) => (
                                        <button
                                            key={i}
                                            onClick={() => sendMessage(qp.prompt)}
                                            className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] text-text-muted hover:text-text-primary transition-all cursor-pointer text-left"
                                            style={{
                                                background: 'rgba(255,255,255,0.02)',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                            }}
                                        >
                                            {qp.icon}
                                            {qp.text}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Chat messages */}
                            {messages.length > 0 && (
                                <div
                                    className="space-y-3 mb-3 max-h-[300px] overflow-y-auto pr-1"
                                    style={{ scrollbarWidth: 'thin' }}
                                >
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            {msg.role === 'assistant' && (
                                                <div
                                                    className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 overflow-hidden"
                                                    style={{ background: 'linear-gradient(135deg, rgba(92,124,255,0.2), rgba(0,224,255,0.2))' }}
                                                >
                                                    <Image src="/agent.png" alt="agent" width={24} height={24} />
                                                </div>
                                            )}
                                            <div
                                                className={`rounded-xl px-3 py-2 max-w-[85%] text-xs leading-relaxed ${msg.role === 'user' ? 'text-text-primary' : 'text-text-secondary'
                                                    }`}
                                                style={{
                                                    background: msg.role === 'user'
                                                        ? 'rgba(92,124,255,0.12)'
                                                        : 'rgba(255,255,255,0.03)',
                                                    border: msg.role === 'user'
                                                        ? '1px solid rgba(92,124,255,0.2)'
                                                        : '1px solid rgba(255,255,255,0.05)',
                                                    whiteSpace: msg.role === 'user' ? 'pre-wrap' : 'normal',
                                                }}
                                            >
                                                {msg.role === 'assistant' ? (
                                                    <ReactMarkdown
                                                        components={{
                                                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 opacity-90" {...props} />,
                                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 opacity-90" {...props} />,
                                                            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                            strong: ({ node, ...props }) => <strong className="font-semibold text-text-primary" {...props} />,
                                                            code: ({ node, inline, ...props }) =>
                                                                inline ? (
                                                                    <code className="bg-white/10 px-1 py-0.5 rounded text-[10px] font-mono" {...props} />
                                                                ) : (
                                                                    <pre className="bg-black/40 p-2 rounded-lg text-[10px] font-mono overflow-x-auto mb-2"><code {...props} /></pre>
                                                                )
                                                        }}
                                                    >
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                ) : (
                                                    msg.content
                                                )}
                                            </div>
                                            {msg.role === 'user' && (
                                                <div
                                                    className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                                                    style={{ background: 'rgba(0,224,255,0.1)' }}
                                                >
                                                    <User size={10} style={{ color: '#00E0FF' }} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {loading && (
                                        <div className="flex gap-2">
                                            <div
                                                className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                                                style={{ background: 'linear-gradient(135deg, rgba(92,124,255,0.2), rgba(0,224,255,0.2))' }}
                                            >
                                                <Bot size={10} className="text-accent-primary" />
                                            </div>
                                            <div className="flex items-center gap-1 px-3 py-2 rounded-xl"
                                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                                            >
                                                <Loader2 size={10} className="animate-spin text-accent-primary" />
                                                <span className="text-[10px] text-text-muted">Thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>
                            )}

                            {/* Input */}
                            <div
                                className="flex items-center gap-2 rounded-xl px-3 py-2"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                                    placeholder="Ask Athena AI..."
                                    className="flex-1 bg-transparent text-xs text-text-primary outline-none placeholder:text-text-disabled"
                                    disabled={loading}
                                />
                                <button
                                    onClick={() => sendMessage(input)}
                                    disabled={loading || !input.trim()}
                                    className="text-accent-primary hover:text-accent-neon transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <Send size={14} />
                                </button>
                            </div>

                            <p className="text-[9px] text-text-disabled text-center mt-2">
                                Powered by Athena AI · Not financial advice
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
