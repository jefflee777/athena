'use client';

import { useEffect, useCallback } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi';
import { parseUnits, maxUint256 } from 'viem';
import useSwapStore from '@/stores/useSwapStore';
import { ROUTER_ABI, ERC20_ABI } from '@/config/abis';
import { WBNB_ADDRESS } from '@/config/tokens';

export default function useSwap() {
    const { address } = useAccount();
    const publicClient = usePublicClient();
    const { writeContract, data: txHash, error: writeError, isPending: writePending, reset: resetWrite } = useWriteContract();
    const { isLoading: txLoading, isSuccess: txSuccess, isError: txError } = useWaitForTransactionReceipt({ hash: txHash });
    const { tokenIn, tokenOut, amountIn, route, slippage, deadline, txStatus, setTxStatus, setTxHash } = useSwapStore();

    // Sync txHash to store
    useEffect(() => {
        if (txHash) setTxHash(txHash);
    }, [txHash, setTxHash]);

    // Track tx lifecycle
    useEffect(() => {
        if (writeError) {
            console.error('Write error:', writeError.message);
            setTxStatus('error');
        } else if (txError) {
            setTxStatus('error');
        } else if (txSuccess && txStatus === 'swapping') {
            setTxStatus('success');
        } else if (txSuccess && txStatus === 'approving') {
            setTxStatus('idle');
        }
    }, [txSuccess, txError, writeError, txStatus, setTxStatus]);

    // ── Helpers ──

    /** Convert slippage (e.g. 0.5) to basis points BigInt (e.g. 50n) */
    const slippageBps = BigInt(Math.round(slippage * 100)); // 0.5% → 50

    /** Calculate amountOutMin from raw BigInt string, avoiding all floating-point math */
    const getAmountOutMin = useCallback(() => {
        if (!route?.amountOutRaw) return 0n;
        const raw = BigInt(route.amountOutRaw);
        // amountOutMin = raw * (10000 - slippageBps) / 10000
        return (raw * (10000n - slippageBps)) / 10000n;
    }, [route, slippageBps]);

    /** Build path addresses from route or fallback */
    const getPathAddresses = useCallback(() => {
        if (route?.pathAddresses?.length) return route.pathAddresses;
        return [
            tokenIn?.isNative ? WBNB_ADDRESS : tokenIn?.address,
            tokenOut?.isNative ? WBNB_ADDRESS : tokenOut?.address,
        ];
    }, [route, tokenIn, tokenOut]);

    /** Build deadline timestamp */
    const getDeadlineTs = useCallback(() => {
        return BigInt(Math.floor(Date.now() / 1000) + deadline * 60);
    }, [deadline]);

    /** Determine swap function name based on token types */
    const getSwapFunctionName = useCallback((useFeeOnTransfer = false) => {
        if (tokenIn?.isNative) {
            return useFeeOnTransfer
                ? 'swapExactETHForTokensSupportingFeeOnTransferTokens'
                : 'swapExactETHForTokens';
        }
        if (tokenOut?.isNative) {
            return useFeeOnTransfer
                ? 'swapExactTokensForETHSupportingFeeOnTransferTokens'
                : 'swapExactTokensForETH';
        }
        return useFeeOnTransfer
            ? 'swapExactTokensForTokensSupportingFeeOnTransferTokens'
            : 'swapExactTokensForTokens';
    }, [tokenIn, tokenOut]);

    /** Build swap args */
    const getSwapArgs = useCallback(() => {
        const amountInWei = parseUnits(amountIn, tokenIn.decimals);
        const amountOutMin = getAmountOutMin();
        const pathAddresses = getPathAddresses();
        const deadlineTs = getDeadlineTs();

        if (tokenIn.isNative) {
            return {
                args: [amountOutMin, pathAddresses, address, deadlineTs],
                value: amountInWei,
            };
        }
        return {
            args: [amountInWei, amountOutMin, pathAddresses, address, deadlineTs],
            value: undefined,
        };
    }, [amountIn, tokenIn, address, getAmountOutMin, getPathAddresses, getDeadlineTs]);

    // ── Approve ──

    const approve = useCallback(async () => {
        if (!route || !tokenIn || tokenIn.isNative || !amountIn) return;

        try {
            resetWrite();
            setTxStatus('approving');

            // Approve max to avoid repeated approvals
            writeContract({
                address: tokenIn.address,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [route.dex.router, maxUint256],
            });
        } catch (err) {
            console.error('Approval error:', err);
            setTxStatus('error');
        }
    }, [route, tokenIn, amountIn, writeContract, resetWrite, setTxStatus]);

    // ── Swap ──

    const swap = useCallback(async () => {
        if (!route || !address || !amountIn || !publicClient) return;

        try {
            resetWrite();
            setTxStatus('swapping');

            const functionName = getSwapFunctionName(false);
            const { args, value } = getSwapArgs();

            // ── Step 1: Simulate the transaction to catch reverts early ──
            let shouldUseFeeOnTransfer = false;

            try {
                await publicClient.simulateContract({
                    address: route.dex.router,
                    abi: ROUTER_ABI,
                    functionName,
                    args,
                    value,
                    account: address,
                });
            } catch (simError) {
                console.warn('Standard swap simulation failed, trying fee-on-transfer variant…', simError.message);

                // ── Step 2: Retry with fee-on-transfer variant ──
                const feeFunction = getSwapFunctionName(true);
                try {
                    await publicClient.simulateContract({
                        address: route.dex.router,
                        abi: ROUTER_ABI,
                        functionName: feeFunction,
                        args,
                        value,
                        account: address,
                    });
                    shouldUseFeeOnTransfer = true;
                } catch (feeSimError) {
                    console.error('Both swap variants failed simulation:', feeSimError.message);
                    setTxStatus('error');
                    return;
                }
            }

            // ── Step 3: Execute the actual write ──
            const finalFunctionName = shouldUseFeeOnTransfer
                ? getSwapFunctionName(true)
                : functionName;

            writeContract({
                address: route.dex.router,
                abi: ROUTER_ABI,
                functionName: finalFunctionName,
                args,
                value,
            });
        } catch (err) {
            console.error('Swap error:', err);
            setTxStatus('error');
        }
    }, [route, address, amountIn, publicClient, writeContract, resetWrite, setTxStatus, getSwapFunctionName, getSwapArgs]);

    // ── Reset ──

    const resetTx = useCallback(() => {
        resetWrite();
        setTxStatus('idle');
        setTxHash(null);
    }, [resetWrite, setTxStatus, setTxHash]);

    return { approve, swap, resetTx, txHash, txLoading, txSuccess };
}
