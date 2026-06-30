import { http, createConfig } from 'wagmi';
import { bsc } from 'wagmi/chains';

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(process.env.NEXT_PUBLIC_RPC_URL || 'https://bsc-dataseed.binance.org'),
  },
  ssr: true,
});
