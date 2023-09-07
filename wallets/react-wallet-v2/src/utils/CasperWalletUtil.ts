import CasperLib from '@/lib/CasperLib'

export let wallet1: CasperLib
export let wallet2: CasperLib
export let casperWallets: Record<string, CasperLib>
export let casperAddresses: string[]

let address1: string
let address2: string

/**
 * Utilities
 */
export async function createOrRestoreCasperWallet() {
  const privateKey1 = localStorage.getItem('CASPER_PRIVATE_KEY_1')
  const privateKey2 = localStorage.getItem('CASPER_PRIVATE_KEY_2')

  if (privateKey1 && privateKey2) {
    wallet1 = await CasperLib.init({ privateKey: privateKey1 })
    wallet2 = await CasperLib.init({ privateKey: privateKey2 })
  } else {
    wallet1 = await CasperLib.init({})
    wallet2 = await CasperLib.init({})

    // Don't store mnemonic in local storage in a production project!
    localStorage.setItem('CASPER_PRIVATE_KEY_1', wallet1.getPrivKey())
    localStorage.setItem('CASPER_PRIVATE_KEY_2', wallet2.getPrivKey())
  }

  address1 = await wallet1.getAddress()
  address2 = await wallet2.getAddress()

  casperWallets = {
    [address1]: wallet1,
    [address2]: wallet2
  }
  casperAddresses = Object.keys(casperWallets)

  return {
    casperWallets,
    casperAddresses
  }
}
