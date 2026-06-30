// BNB Chain (BSC) popular tokens
export const TOKENS = [
    {
        symbol: 'BNB',
        name: 'BNB',
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        decimals: 18,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png',
        isNative: true,
    },
    {
        symbol: 'WBNB',
        name: 'Wrapped BNB',
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        decimals: 18,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/logo.png',
        isNative: false,
    },
    {
        symbol: 'BUSD',
        name: 'Binance USD',
        address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        decimals: 18,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/logo.png',
        isNative: false,
    },
    {
        symbol: 'USDT',
        name: 'Tether USD',
        address: '0x55d398326f99059fF775485246999027B3197955',
        decimals: 18,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x55d398326f99059fF775485246999027B3197955/logo.png',
        isNative: false,
    },
    {
        symbol: 'USDC',
        name: 'USD Coin',
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        decimals: 18,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d/logo.png',
        isNative: false,
    },
    {
        symbol: 'CAKE',
        name: 'PancakeSwap',
        address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        decimals: 18,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png',
        isNative: false,
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        decimals: 18,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x2170Ed0880ac9A755fd29B2688956BD959F933F8/logo.png',
        isNative: false,
    },
    {
        symbol: 'BTCB',
        name: 'Bitcoin BEP2',
        address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
        decimals: 18,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c/logo.png',
        isNative: false,
    },
    {
        symbol: 'XRP',
        name: 'XRP Token',
        address: '0x1D2F0da169ceB9fC7B3144828DB6DFA82407931E',
        decimals: 18,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x1D2F0da169ceB9fC7B3144828DB6DFA82407931E/logo.png',
        isNative: false,
    },
    {
        symbol: 'ADA',
        name: 'Cardano',
        address: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
        decimals: 18,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47/logo.png',
        isNative: false,
    },
    {
        symbol: 'DOT',
        name: 'Polkadot',
        address: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
        decimals: 18,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402/logo.png',
        isNative: false,
    },
    {
        symbol: 'DOGE',
        name: 'Dogecoin',
        address: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
        decimals: 8,
        logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xbA2aE424d960c26247Dd6c32edC70B295c744C43/logo.png',
        isNative: false,
    },
];

// WBNB address for routing
export const WBNB_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';

// Common intermediate tokens for multi-hop routes
export const INTERMEDIATE_TOKENS = [
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD
    '0x55d398326f99059fF775485246999027B3197955', // USDT
    '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC
];

export function getTokenBySymbol(symbol) {
    return TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase());
}

export function getTokenByAddress(address) {
    return TOKENS.find((t) => t.address.toLowerCase() === address.toLowerCase());
}
