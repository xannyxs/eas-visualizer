import { Sprite } from "three";
import type { ICard as CardType, EthereumAddress } from "#imports";

export const gAttestations = useState<Attestation[] | null>(
  "attestations",
  () => null,
);

export const gSpriteCache = useState<Map<EthereumAddress, Sprite>>(
  "spriteCache",
  () => {
    return new Map<EthereumAddress, Sprite>();
  },
);

export const gAccounts = useState<Map<EthereumAddress, CardType> | null>(
  "accounts",
  () => null,
);

export const gSelectedNode = useState<string | null>(
  "selectedNode",
  () => null,
);
