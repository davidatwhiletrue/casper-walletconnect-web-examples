/**
 * Types
 */
export type TCasperChain = keyof typeof CASPER_TEST_CHAIN

/**
 * Chains
 */
export const CASPER_MAINNET_CHAIN = {
  'casper:casper': {
    chainId: 'casper',
    name: 'Casper',
    logo: '/chain-logos/casper.png',
    rgb: '185, 187, 191',
    rpc: 'https://limitless-fortress-93850-88d6ee7d4a49.herokuapp.com/http://52.35.59.254:7777/rpc'
  }
}

interface CasperTestChains {
  [key: string]: ChainMetadata
}

type ChainMetadata = {
  chainId: string
  name: string
  logo: string
  rgb: string
  rpc: string
}

export const CASPER_TEST_CHAIN: CasperTestChains = {
  'casper:casper-test': {
    chainId: 'casper-test',
    name: 'Casper Testnet',
    logo: '/chain-logos/casper.png',
    rgb: '99, 125, 234',
    rpc: 'https://limitless-fortress-93850-88d6ee7d4a49.herokuapp.com/http://52.35.59.254:7777/rpc'
  }
}

export const CASPER_CHAINS = { ...CASPER_MAINNET_CHAIN, ...CASPER_TEST_CHAIN }

/**
 * Methods
 */
export const CASPER_SIGNING_METHODS = {
  CASPER_SIGN_MESSAGE: 'casper_sign_message',
  CASPER_SIGN_DEPLOY: 'casper_sign_deploy'
}
