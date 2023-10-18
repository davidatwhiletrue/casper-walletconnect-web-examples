import { getAppMetadata } from "@walletconnect/utils";

if (!process.env.NEXT_PUBLIC_PROJECT_ID)
  throw new Error("`NEXT_PUBLIC_PROJECT_ID` env variable is missing.");

export const DEFAULT_MAIN_CHAINS = [
  // mainnets
  "eip155:1",
  "eip155:137",
  "casper:casper",
];

export const DEFAULT_TEST_CHAINS = [
  // testnets
  "eip155:5",
  "eip155:80001",
  "casper:casper-test",
];

export const DEFAULT_CHAINS = [...DEFAULT_MAIN_CHAINS, ...DEFAULT_TEST_CHAINS];

export const DEFAULT_PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const DEFAULT_RELAY_URL = process.env.NEXT_PUBLIC_RELAY_URL;

export const DEFAULT_LOGGER = "debug";

export const DEFAULT_APP_METADATA = {
  name: "CSPR.click App",
  description: "CSPR.click Demo App for WalletConnect",
  url: "https://walletconnect.com/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  verifyUrl: "https://verify.walletconnect.com",
};

/**
 * EIP155
 */
export enum DEFAULT_EIP155_METHODS {
  ETH_SEND_TRANSACTION = "eth_sendTransaction",
  PERSONAL_SIGN = "personal_sign",
}

export enum DEFAULT_EIP155_OPTIONAL_METHODS {
  ETH_SIGN_TRANSACTION = "eth_signTransaction",
  ETH_SIGN = "eth_sign",
  ETH_SIGN_TYPED_DATA = "eth_signTypedData",
  ETH_SIGN_TYPED_DATA_V4 = "eth_signTypedData_v4",
}

export enum DEFAULT_EIP_155_EVENTS {
  ETH_CHAIN_CHANGED = "chainChanged",
  ETH_ACCOUNTS_CHANGED = "accountsChanged",
}

type RelayerType = {
  value: string | undefined;
  label: string;
};



/**CASPER
 */
export enum DEFAULT_CASPER_METHODS {
  CASPER_SIGN_MESSAGE = "casper_sign_message",
  CASPER_SIGN_DEPLOY = "casper_sign_deploy",
}

export enum DEFAULT_CASPER_EVENTS {}

export const REGIONALIZED_RELAYER_ENDPOINTS: RelayerType[] = [
  {
    value: DEFAULT_RELAY_URL,
    label: "Default",
  },

  {
    value: "wss://us-east-1.relay.walletconnect.com",
    label: "US",
  },
  {
    value: "wss://eu-central-1.relay.walletconnect.com",
    label: "EU",
  },
  {
    value: "wss://ap-southeast-1.relay.walletconnect.com",
    label: "Asia Pacific",
  },
];

export const ORIGIN_OPTIONS = [
  {
    value: getAppMetadata().url,
    label: "VALID",
  },
  {
    value: "https://invalid.origin",
    label: "INVALID",
  },
  {
    value: "unknown",
    label: "UNKNOWN",
  },
];
