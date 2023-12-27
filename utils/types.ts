export type EthereumAddress = `0x${string}`;

export type NFT = {
  identifier: string;
  collection: string;
  contract: string;
  description: string;
  image_url?: string;
  is_disabled: boolean;
  is_nsfw: boolean;
  metadata_url: string;
  name: string;
  opensea_url: string;
  token_standard: "erc721" | string;
  updated_at: string;
};

export type OpenseaNFT = {
  nfts: NFT[];
};

export interface ICard {
  currentAddress: EthereumAddress;
  referredBy: EthereumAddress | string;
  referredMethod: EthereumAddress;
  retroPGFRound: number | null;
  ens: string | null;
  imageUrl?: string;
}

export interface DecodedDataJsonItemValue {
  name: string;
  type: string;
  value: EthereumAddress;
}

export interface DecodedDataJsonItem {
  name: string;
  signature: string;
  type: string;
  value: DecodedDataJsonItemValue;
}
export interface Attestation {
  __typename: "Attestation";
  attester: EthereumAddress;
  recipient: EthereumAddress;
  decodedDataJson: DecodedDataJsonItem[];
}

export interface AttestationData {
  attestations: Attestation[];
}

export interface IGraph {
  nodes: {
    id: string;
    name: string;
    type: string;
    links: any[];
  }[];
  links: {
    source: string;
    target: string;
    type: string;
  }[];
}

export enum ActiveView {
  Grid = "grid",
  List = "list",
  Credits = "credits",
  Bug = "bug",
  Feature = "feature",
  None = "none",
}
