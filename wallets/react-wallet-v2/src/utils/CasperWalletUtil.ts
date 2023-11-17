import CasperLib from '@/lib/CasperLib'

export let wallet1: CasperLib
export let wallet2: CasperLib
export let wallet3: CasperLib
export let wallet4: CasperLib
export let wallet5: CasperLib
export let wallet6: CasperLib
export let casperWallets: Record<string, CasperLib>
export let casperAddresses: string[]

let address1: string
let address2: string
let address3: string
let address4: string
let address5: string
let address6: string

/**
 * Utilities
 */
export async function createOrRestoreCasperWallet() {
  const privateKey1 = localStorage.getItem('CASPER_PRIVATE_KEY_1')
  const privateKey2 = localStorage.getItem('CASPER_PRIVATE_KEY_2')
  const privateKey3 = localStorage.getItem('CASPER_PRIVATE_KEY_3')
  const privateKey4 = localStorage.getItem('CASPER_PRIVATE_KEY_4')
  const privateKey5 = localStorage.getItem('CASPER_PRIVATE_KEY_5')
  const privateKey6 = localStorage.getItem('CASPER_PRIVATE_KEY_6')

  if (privateKey1 && privateKey2 && privateKey3 && privateKey4 && privateKey5 && privateKey6) {
    wallet1 = await CasperLib.init({ privateKey: privateKey1 })
    wallet2 = await CasperLib.init({ privateKey: privateKey2 })
    wallet3 = await CasperLib.init({ privateKey: privateKey3 })
    wallet4 = await CasperLib.init({ privateKey: privateKey4 })
    wallet5 = await CasperLib.init({ privateKey: privateKey5 })
    wallet6 = await CasperLib.init({ privateKey: privateKey6 })
  } else {
    wallet1 = await CasperLib.init({})
    wallet2 = await CasperLib.init({})
    wallet3 = await CasperLib.init({})
    wallet4 = await CasperLib.init({})
    wallet5 = await CasperLib.init({})
    wallet6 = await CasperLib.init({})

    // Don't store mnemonic in local storage in a production project!
    localStorage.setItem('CASPER_PRIVATE_KEY_1', wallet1.getPrivKey())
    localStorage.setItem('CASPER_PRIVATE_KEY_2', wallet2.getPrivKey())
    localStorage.setItem('CASPER_PRIVATE_KEY_3', wallet3.getPrivKey())
    localStorage.setItem('CASPER_PRIVATE_KEY_4', wallet4.getPrivKey())
    localStorage.setItem('CASPER_PRIVATE_KEY_5', wallet5.getPrivKey())
    localStorage.setItem('CASPER_PRIVATE_KEY_6', wallet6.getPrivKey())
  }

  address1 = await wallet1.getAddress()
  address2 = await wallet2.getAddress()
  address3 = await wallet3.getAddress()
  address4 = await wallet4.getAddress()
  address5 = await wallet5.getAddress()
  address6 = await wallet6.getAddress()

  casperWallets = {
    [address1]: wallet1,
    [address2]: wallet2,
    [address3]: wallet3,
    [address4]: wallet4,
    [address5]: wallet5,
    [address6]: wallet6,
  }
  casperAddresses = Object.keys(casperWallets)

  return {
    casperWallets,
    casperAddresses
  }
}
