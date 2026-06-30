'use client';

import { useAccount, useConnect, useReadContract } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { motion } from 'framer-motion';
import { Wallet, ArrowRight, Loader2, Check, AlertCircle, Unlock, RefreshCw } from 'lucide-react';
import { parseUnits, maxUint256 } from 'viem';
import { useEffect, useState } from 'react';
import useSwapStore from '@/stores/useSwapStore';
import useSwap from '@/hooks/useSwap';
import useTokenBalances from '@/hooks/useTokenBalances';
import { ERC20_ABI } from '@/config/abis';

export default function SwapButton() {
    const { isConnected, address } = useAccount();
    const { connect } = useConnect();
    const {
        tokenIn, tokenOut, amountIn, route, loading, txStatus, setTxStatus, quoteTimestamp
    } = useSwapStore();

    const { approve, swap, resetTx, txSuccess } = useSwap();
    const { balances } = useTokenBalances();

    const amountInWei = amountIn && tokenIn ? (() => {
        try { return parseUnits(amountIn, tokenIn.decimals); }
        catch { return 0n; }
    })() : 0n;

    // Allowance check for ERC20 tokens
    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: tokenIn?.isNative ? undefined : tokenIn?.address,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [address, route?.dex?.router],
        query: {
            enabled: !!address && !!route && !!tokenIn && !tokenIn.isNative,
        }
    });

    useEffect(() => {
        if (txSuccess && txStatus === 'approving') {
            refetchAllowance();
            setTxStatus('idle');
        }
    }, [txSuccess, txStatus, refetchAllowance, setTxStatus]);

    const isApproveRequired = !tokenIn?.isNative && allowance !== undefined && allowance < amountInWei;

    // Quote freshness — stale if > 30s old
    const [isQuoteStale, setIsQuoteStale] = useState(false);
    useEffect(() => {
        if (!quoteTimestamp) { setIsQuoteStale(false); return; }
        const check = () => setIsQuoteStale(Date.now() - quoteTimestamp > 30_000);
        check();
        const interval = setInterval(check, 5_000);
        return () => clearInterval(interval);
    }, [quoteTimestamp]);

    // State machine for button config
    const getButtonConfig = () => {
        if (!isConnected) {
            return {
                text: 'Connect Wallet',
                icon: <Wallet size={18} />,
                disabled: false,
                onClick: () => connect({ connector: injected() }),
                style: 'primary',
            };
        }
        if (!tokenIn || !tokenOut) {
            return {
                text: 'Select Tokens',
                icon: null,
                disabled: true,
                onClick: null,
                style: 'disabled',
            };
        }
        if (!amountIn || parseFloat(amountIn) <= 0) {
            return {
                text: 'Enter Amount',
                icon: null,
                disabled: true,
                onClick: null,
                style: 'disabled',
            };
        }
        if (loading) {
            return {
                text: 'Finding Best Route...',
                icon: <Loader2 size={18} className="animate-spin" />,
                disabled: true,
                onClick: null,
                style: 'loading',
            };
        }
        if (txStatus === 'approving') {
            return {
                text: 'Approving...',
                icon: <Loader2 size={18} className="animate-spin" />,
                disabled: true,
                onClick: null,
                style: 'loading',
            };
        }
        if (txStatus === 'swapping') {
            return {
                text: 'Swapping...',
                icon: <Loader2 size={18} className="animate-spin" />,
                disabled: true,
                onClick: null,
                style: 'loading',
            };
        }
        if (txStatus === 'success') {
            return {
                text: 'Swap Successful!',
                icon: <Check size={18} />,
                disabled: false,
                onClick: resetTx,
                style: 'success',
            };
        }
        if (txStatus === 'error') {
            return {
                text: 'Swap Failed — Try Again',
                icon: <RefreshCw size={18} />,
                disabled: false,
                onClick: resetTx,
                style: 'error',
            };
        }

        // Balance check
        const userBalance = balances[tokenIn.address]?.raw || 0n;
        const hasInsufficientBalance = amountInWei > BigInt(userBalance);

        if (hasInsufficientBalance && route) {
            return {
                text: `Insufficient ${tokenIn.symbol} balance`,
                icon: <AlertCircle size={18} />,
                disabled: true,
                onClick: null,
                style: 'error',
            };
        }

        // Stale quote warning
        if (isQuoteStale && route) {
            return {
                text: 'Quote expired — refreshing...',
                icon: <Loader2 size={18} className="animate-spin" />,
                disabled: true,
                onClick: null,
                style: 'loading',
            };
        }

        if (route) {
            if (isApproveRequired) {
                return {
                    text: `Approve ${tokenIn.symbol}`,
                    icon: <Unlock size={18} />,
                    disabled: false,
                    onClick: approve,
                    style: 'primary',
                };
            }

            return {
                text: `Swap ${tokenIn.symbol} for ${tokenOut.symbol}`,
                icon: <ArrowRight size={18} />,
                disabled: false,
                onClick: swap,
                style: 'primary',
            };
        }
        return {
            text: 'Swap',
            icon: <ArrowRight size={18} />,
            disabled: true,
            onClick: null,
            style: 'disabled',
        };
    };

    const config = getButtonConfig();

    const styleMap = {
        primary: {
            background: 'linear-gradient(135deg, #5C7CFF, #4A66D9)',
            boxShadow: '0 4px 15px rgba(92,124,255,0.35), 0 1px 0 rgba(255,255,255,0.1) inset',
        },
        disabled: {
            background: 'linear-gradient(135deg, #2A2A30, #1C1C21)',
            boxShadow: 'none',
        },
        loading: {
            background: 'linear-gradient(135deg, #3A3A42, #2A2A30)',
            boxShadow: '0 0 20px rgba(92,124,255,0.15)',
        },
        success: {
            background: 'linear-gradient(135deg, #00D68F, #00B87A)',
            boxShadow: '0 4px 15px rgba(0,214,143,0.35)',
        },
        error: {
            background: 'linear-gradient(135deg, #FF4757, #D63031)',
            boxShadow: '0 4px 15px rgba(255,71,87,0.35)',
        },
    };

    return (
        <motion.button
            whileHover={!config.disabled ? { y: -1 } : {}}
            whileTap={!config.disabled ? { y: 1, scale: 0.98 } : {}}
            onClick={config.onClick}
            disabled={config.disabled}
            className="w-full py-4 heading rounded-2xl text-base font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
            style={styleMap[config.style]}
        >
            {config.icon}
            {config.text}
        </motion.button>
    );
}
