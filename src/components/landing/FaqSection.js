'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { BsChatSquareQuote } from 'react-icons/bs';

const faqs = [
    {
        question: "What is Athena Intelligence and how does it work?",
        answer: "Athena is a next-generation DEX aggregator on the BNB Chain powered by Llama 4. It doesn't just find the best prices across multiple liquidity pools; it also utilizes an AI Copilot to provide real-time qualitative analysis, risk assessment, and optimal routing strategies before you execute a trade."
    },
    {
        question: "How does the AI Copilot keep my trades secure?",
        answer: "Before any transaction is signed, Athena's AI Copilot scans the destination smart contract for honeypot code, hidden taxes, and contract ownership anomalies. It translates complex blockchain data into plain English, ensuring you always know exactly what you're buying."
    },
    {
        question: "Which decentralized exchanges (DEXs) do you support?",
        answer: "We aggregate liquidity across all major BNB Chain DEXs, including PancakeSwap, Biswap, SushiSwap, ApeSwap, and MDEX. Our routing algorithm automatically splits your trade across multiple pools if it results in a better overall return."
    },
    {
        question: "Are there any additional fees for using the AI Copilot?",
        answer: "No. Athena is completely free to use. We do not charge any additional premium routing fees or subscription costs for accessing the AI Copilot. You simply pay the standard network gas fees and the underlying DEX swap fees."
    },
    {
        question: "Do I need to create an account to use Athena?",
        answer: "No account creation is required. Athena is fully decentralized and non-custodial. Simply connect your Web3 wallet (like MetaMask or Trust Wallet) and you can start swapping immediately while retaining full control of your assets at all times."
    }
];

function FaqItem({ faq, isOpen, onToggle, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-4"
        >
            {/* Skeuomorphic Base Panel */}
            <div className="relative rounded-[16px] overflow-hidden bg-[#111116] border border-[#222] transition-all duration-300"
                style={{
                    boxShadow: isOpen
                        ? 'inset 0 1px 1px rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.6)'
                        : 'inset 0 1px 0 rgba(255,255,255,0.02), 0 4px 10px rgba(0,0,0,0.4)'
                }}
            >
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left relative z-10 group bg-[#111116] active:bg-[#0E0E12] transition-colors"
                >
                    <span className="text-[14px] md:text-[15px] font-medium text-[#EAEAEA] tracking-wide pr-8">
                        {faq.question}
                    </span>

                    {/* Skeuomorphic Toggle Button */}
                    <div className="shrink-0 w-8 h-8 rounded-[8px] bg-[#1A1A22] border border-[#333] flex items-center justify-center transition-all duration-300 group-hover:border-[#444]"
                        style={{
                            boxShadow: isOpen
                                ? 'inset 0 2px 5px rgba(0,0,0,0.5)'
                                : 'inset 0 1px 1px rgba(255,255,255,0.05), 0 2px 5px rgba(0,0,0,0.3)'
                        }}
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {isOpen ? (
                                <FiMinus className="text-[#10B981] text-lg" />
                            ) : (
                                <FiPlus className="text-[#888] group-hover:text-[#DDD] text-lg" />
                            )}
                        </motion.div>
                    </div>
                </button>

                {/* Animated Answer Section */}
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {/* Deep Inset Panel for Answer */}
                            <div className="px-5 md:px-6 pb-6 pt-2 bg-[#0A0A0E] border-t border-[#1A1A22]"
                                style={{ boxShadow: 'inset 0 8px 15px -10px rgba(0,0,0,0.8)' }}
                            >
                                <p className="text-[14px] text-[#777] leading-relaxed relative z-10">
                                    {faq.answer}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default function FaqSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section ref={sectionRef} className="relative py-24 bg-transparent overflow-hidden">

            {/* Subtle radial background lighting */}
            <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_60%)] pointer-events-none" />

            <div className="max-w-[800px] mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-2xl heading sm:text-3xl md:text-4xl font-semibold text-[#EAEAEA]">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-6 text-[#777] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        Everything you need to know about Athena, the AI Copilot, and how we ensure you get the best and safest trades on the BNB Chain.
                    </p>
                </motion.div>

                <div className="space-y-1">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            faq={faq}
                            index={index}
                            isOpen={index === openIndex}
                            onToggle={() => setOpenIndex(index === openIndex ? -1 : index)}
                        />
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 text-center hidden"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-[16px] bg-[#0A0A0E] border border-[#1A1A22] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                        <span className="text-[13px] text-[#666] font-mono uppercase tracking-widest">Still have questions?</span>
                        <a href="https://t.me/athena_protocol" target="_blank" rel="noopener noreferrer"
                            className="px-6 py-2.5 rounded-[8px] bg-[#111116] border border-[#333] text-[13px] font-bold text-[#EAEAEA] tracking-wide hover:bg-[#15151A] hover:border-[#444] transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_2px_5px_rgba(0,0,0,0.5)] active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] active:translate-y-[1px]">
                            Join our Telegram
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
