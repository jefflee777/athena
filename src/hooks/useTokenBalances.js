'use client';

import { useAccount, useReadContracts } from 'wagmi';
import { TOKENS, WBNB_ADDRESS } from '@/config/tokens';
import { ERC20_ABI } from '@/config/abis';
import { useBalance } from 'wagmi';

export default function useTokenBalances() {
    const { address, isConnected } = useAccount();

    // Native BNB balance
    const { data: nativeBalance } = useBalance({
        address,
        query: { enabled: isConnected },
    });

    // ERC20 balances
    const erc20Tokens = TOKENS.filter((t) => !t.isNative);
    const contracts = erc20Tokens.map((token) => ({
        address: token.address,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address],
    }));

    const { data: erc20Balances } = useReadContracts({
        contracts: isConnected ? contracts : [],
        query: { enabled: isConnected },
    });

    const balances = {};

    if (nativeBalance) {
        balances['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'] = {
            raw: nativeBalance.value,
            formatted: nativeBalance.formatted,
            symbol: 'BNB',
        };
    }

    if (erc20Balances) {
        erc20Tokens.forEach((token, i) => {
            const result = erc20Balances[i];
            if (result?.status === 'success') {
                const raw = result.result;
                const formatted = (Number(raw) / 10 ** token.decimals).toFixed(6);
                balances[token.address] = { raw, formatted, symbol: token.symbol };
            }
        });
    }

    return { balances, isConnected };
}
