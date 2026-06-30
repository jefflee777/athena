'use client';

import { useEffect, useRef, useCallback } from 'react';
import useSwapStore from '@/stores/useSwapStore';

export default function useQuote() {
    const {
        tokenIn,
        tokenOut,
        amountIn,
        setAmountOut,
        setRoute,
        setAllRoutes,
        setLoading,
        setError,
        setQuoteTimestamp,
    } = useSwapStore();

    const timerRef = useRef(null);
    const refreshRef = useRef(null);

    const fetchQuote = useCallback(async () => {
        if (!tokenIn || !tokenOut || !amountIn || parseFloat(amountIn) <= 0) {
            setAmountOut('');
            setRoute(null);
            setAllRoutes([]);
            setQuoteTimestamp(null);
            return;
        }

        try {
            const params = new URLSearchParams({
                tokenIn: tokenIn.address,
                tokenOut: tokenOut.address,
                amountIn: amountIn,
                decimalsIn: tokenIn.decimals.toString(),
                decimalsOut: tokenOut.decimals.toString(),
            });

            const res = await fetch(`/api/quote?${params}`);
            const data = await res.json();

            if (data.error) {
                setError(data.error);
                setAmountOut('');
                setRoute(null);
                setQuoteTimestamp(null);
                return;
            }

            setAmountOut(data.bestRoute?.amountOut || '');
            setRoute(data.bestRoute || null);
            setAllRoutes(data.allRoutes || []);
            setQuoteTimestamp(Date.now());
            setError(null);
        } catch (err) {
            console.error('Quote fetch error:', err);
            setError('Failed to fetch quote');
            setAmountOut('');
            setRoute(null);
            setQuoteTimestamp(null);
        } finally {
            setLoading(false);
        }
    }, [tokenIn, tokenOut, amountIn, setAmountOut, setRoute, setAllRoutes, setLoading, setError, setQuoteTimestamp]);

    // Debounced initial fetch on input change
    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);

        if (!tokenIn || !tokenOut || !amountIn || parseFloat(amountIn) <= 0) {
            setAmountOut('');
            setRoute(null);
            setAllRoutes([]);
            setQuoteTimestamp(null);
            return;
        }

        setLoading(true);

        timerRef.current = setTimeout(() => {
            fetchQuote();
        }, 500);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [tokenIn, tokenOut, amountIn, setAmountOut, setRoute, setAllRoutes, setLoading, setQuoteTimestamp, fetchQuote]);

    // Auto-refresh quote every 15 seconds while inputs are valid
    useEffect(() => {
        if (refreshRef.current) clearInterval(refreshRef.current);

        if (!tokenIn || !tokenOut || !amountIn || parseFloat(amountIn) <= 0) {
            return;
        }

        refreshRef.current = setInterval(() => {
            fetchQuote();
        }, 15_000);

        return () => {
            if (refreshRef.current) clearInterval(refreshRef.current);
        };
    }, [tokenIn, tokenOut, amountIn, fetchQuote]);
}
