// DEX Registry — BNB Chain
export const DEXES = [
    {
        name: 'PancakeSwap V2',
        slug: 'pancakeswap',
        router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
        fee: 0.0025, // 0.25%
        color: '#D4A017',
        logo: '🥞',
    },
    {
        name: 'SushiSwap',
        slug: 'sushiswap',
        router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
        factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
        fee: 0.003, // 0.3%
        color: '#E04DBE',
        logo: '🍣',
    },
    {
        name: 'BiSwap',
        slug: 'biswap',
        router: '0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8',
        factory: '0x858E3312ed3A876947EA49d572A7C42DE08af7EE',
        fee: 0.001, // 0.1%
        color: '#FF6B35',
        logo: '🔄',
    },
    {
        name: 'MDEX',
        slug: 'mdex',
        router: '0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8',
        factory: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
        fee: 0.003, // 0.3%
        color: '#4ECDC4',
        logo: '🌀',
    },
    {
        name: 'BabySwap',
        slug: 'babyswap',
        router: '0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd',
        factory: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
        fee: 0.002, // 0.2%
        color: '#FF69B4',
        logo: '👶',
    },
    {
        name: 'ApeSwap',
        slug: 'apeswap',
        router: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
        factory: '0x0841BD0B734E4F5853f0dD8d7Ea989fAf63BF7D4',
        fee: 0.002, // 0.2%
        color: '#A16207',
        logo: '🦍',
    },
];

export function getDexBySlug(slug) {
    return DEXES.find((d) => d.slug === slug);
}
