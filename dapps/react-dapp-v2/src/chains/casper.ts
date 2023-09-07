import { JsonRpcRequest } from "@walletconnect/jsonrpc-utils";

import {
  NamespaceMetadata,
  ChainMetadata,
  ChainRequestRender,
  ChainsMap,
} from "../helpers";

export const CasperMetadata: NamespaceMetadata = {
  casper: {
    logo: "https://backend.casper.network/assets/8091a091-5089-4359-b2f0-1f86b84fb7d3",
    rgb: "27, 31, 53",
  },
  "casper-test": {
    logo: "https://backend.casper.network/assets/8091a091-5089-4359-b2f0-1f86b84fb7d3",
    rgb: "27, 31, 53",
  },
};

export const CasperChainData: ChainsMap = {
  casper: {
    name: "Casper Mainnet",
    id: "casper:casper",
    rpc: [
      "https://limitless-fortress-93850-88d6ee7d4a49.herokuapp.com/http://52.35.59.254:7777/rpc",
    ],
    slip44: 397,
    testnet: true,
  },
  "casper-test": {
    name: "Casper Testnet",
    id: "casper:casper-test",
    rpc: [
      "https://limitless-fortress-93850-88d6ee7d4a49.herokuapp.com/http://52.35.59.254:7777/rpc",
    ],
    slip44: 397,
    testnet: true,
  },
};

export function getChainMetadata(chainId: string): ChainMetadata {
  const reference = chainId.split(":")[1];
  const metadata = CasperMetadata[reference];
  if (typeof metadata === "undefined") {
    throw new Error(`No chain metadata found for chainId: ${chainId}`);
  }
  return metadata;
}

export function getChainRequestRender(
  request: JsonRpcRequest
): ChainRequestRender[] {
  return [
    { label: "Method", value: request.method },
    {
      label: "params",
      value: JSON.stringify(request.params, null, "\t"),
    },
  ];
}
