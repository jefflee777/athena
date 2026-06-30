import { create } from 'zustand';
import { TOKENS } from '@/config/tokens';

const useSwapStore = create((set, get) => ({
    // Token selection
    tokenIn: TOKENS[0],  // BNB
    tokenOut: TOKENS[3],  // USDT
    amountIn: '',
    amountOut: '',

    // Route data
    route: null,
    allRoutes: [],
    loading: false,
    error: null,

    // Settings
    slippage: 0.5,
    deadline: 20, // minutes

    // Transaction
    txStatus: 'idle', // idle | approving | swapping | success | error
    txHash: null,
    txError: null,

    // Quote freshness
    quoteTimestamp: null,

    // Token selector modal
    selectorOpen: false,
    selectorSide: 'in', // 'in' or 'out'

    // Actions
    setTokenIn: (token) => set({ tokenIn: token, route: null, amountOut: '' }),
    setTokenOut: (token) => set({ tokenOut: token, route: null, amountOut: '' }),
    setAmountIn: (amount) => set({ amountIn: amount }),
    setAmountOut: (amount) => set({ amountOut: amount }),
    setRoute: (route) => set({ route }),
    setAllRoutes: (routes) => set({ allRoutes: routes }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setSlippage: (slippage) => set({ slippage }),
    setDeadline: (deadline) => set({ deadline }),
    setTxStatus: (status) => set({ txStatus: status }),
    setTxHash: (hash) => set({ txHash: hash }),
    setTxError: (error) => set({ txError: error }),
    setQuoteTimestamp: (ts) => set({ quoteTimestamp: ts }),
    openSelector: (side) => set({ selectorOpen: true, selectorSide: side }),
    closeSelector: () => set({ selectorOpen: false }),

    // Swap direction
    switchTokens: () => {
        const { tokenIn, tokenOut } = get();
        set({
            tokenIn: tokenOut,
            tokenOut: tokenIn,
            amountIn: '',
            amountOut: '',
            route: null,
        });
    },

    // Reset
    resetSwap: () =>
        set({
            amountIn: '',
            amountOut: '',
            route: null,
            allRoutes: [],
            error: null,
            txStatus: 'idle',
            txHash: null,
            txError: null,
            quoteTimestamp: null,
        }),
}));

export default useSwapStore;
