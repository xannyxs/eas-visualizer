import type { ICard as CardType, EthereumAddress } from "#imports";

export const gAttestations = useState<Attestation[] | null>(
  "attestations",
  () => null,
);

export const gAccounts = useState<Map<EthereumAddress, CardType> | null>(
  "accounts",
  () => null,
);

export const gSelectedNode = useState<string | null>(
  "selectedNode",
  () => null,
);
