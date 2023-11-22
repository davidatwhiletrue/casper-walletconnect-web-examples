import { Keys, DeployUtil } from 'casper-js-sdk'

/**
 * Types
 */
interface IInitArguments {
  privateKey?: string
}

const insecureRandomKeyHex = (size: any) =>
  [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

/**
 * Library
 */
export default class CasperLib {
  private keyPair: Keys.AsymmetricKey

  constructor(keyPair: Keys.AsymmetricKey) {
    this.keyPair = keyPair
  }

  static init({ privateKey }: IInitArguments) {
    privateKey = privateKey ? privateKey : insecureRandomKeyHex(64)
    const privateKeyBuffer = Keys.Secp256K1.parsePrivateKey(
      Uint8Array.from(Buffer.from(privateKey || '', 'hex')),
      'raw'
    )

    const publicKey = Keys.Secp256K1.privateToPublicKey(Uint8Array.from(privateKeyBuffer))
    let keys = Keys.Secp256K1.parseKeyPair(publicKey, Uint8Array.from(privateKeyBuffer), 'raw')

    return new CasperLib(keys)
  }

  public getPrivKey() {
    return Buffer.from(this.keyPair.privateKey).toString('hex')
  }

  public getAddress() {
    return this.keyPair.accountHex()
  }

  public async signDeploy(unsignedDeploy: DeployUtil.Deploy) {
    return DeployUtil.signDeploy(unsignedDeploy, this.keyPair)
  }

  public async signMessage(message: string) {
    const signature = this.keyPair.sign(Uint8Array.from(Buffer.from(message)))
    // TODO: implement sign message
    return { signature: Buffer.from(signature).toString('hex') }
  }
}
