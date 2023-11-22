import SignClient from '@walletconnect/sign-client'
export let signClient: SignClient

export async function createSignClient(relayerRegionURL: string) {
  signClient = await SignClient.init({
    logger: 'debug',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    relayUrl: relayerRegionURL ?? process.env.NEXT_PUBLIC_RELAY_URL,
    metadata: {
      name: process.env.NEXT_PUBLIC_WALLET_METADATA_NAME || 'WC Demo wallet 1 for Casper',
      description: process.env.NEXT_PUBLIC_WALLET_METADATA_DESCRIPTION || 'Casper Demo Wallet 1 for WalletConnect',
      url: process.env.NEXT_PUBLIC_WALLET_METADATA_URL || 'https://walletconnect.com/',
      icons: [process.env.NEXT_PUBLIC_WALLET_METADATA_ICON || 'http://david.whiletrue.pro/click-logo-rev.png']
    }
  })

  try {
    const clientId = await signClient.core.crypto.getClientId()
    console.log('WalletConnect ClientID: ', clientId)
    localStorage.setItem('WALLETCONNECT_CLIENT_ID', clientId)
  } catch (error) {
    console.error('Failed to set WalletConnect clientId in localStorage: ', error)
  }
}

export async function updateSignClientChainId(chainId: string, address: string) {
  console.log('chainId', chainId, address)
  // get most recent session
  const sessions = signClient.session.getAll()
  if (!sessions) return
  const namespace = chainId.split(':')[0]
  sessions.forEach(async session => {
    await signClient.update({
      topic: session.topic,
      namespaces: {
        ...session.namespaces,
        [namespace]: {
          ...session.namespaces[namespace],
          chains: [
            ...new Set([chainId].concat(Array.from(session.namespaces[namespace].chains || [])))
          ],
          accounts: [
            ...new Set(
              [`${chainId}:${address}`].concat(Array.from(session.namespaces[namespace].accounts))
            )
          ]
        }
      }
    })
    await new Promise(resolve => setTimeout(resolve, 1000))

    const chainChanged = {
      topic: session.topic,
      event: {
        name: 'chainChanged',
        data: parseInt(chainId.split(':')[1])
      },
      chainId: chainId
    }

    const accountsChanged = {
      topic: session.topic,
      event: {
        name: 'accountsChanged',
        data: [`${chainId}:${address}`]
      },
      chainId
    }
    await signClient.emit(chainChanged)
    await signClient.emit(accountsChanged)
  })
}
