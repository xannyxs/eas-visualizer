import * as THREE from "three";
import type { ICard as CardType } from "#imports";

export const gAttestations = useState<Attestation[] | null>(
  "attestations",
  () => null,
);

export const gSpriteCache = useState<Map<string, THREE.Sprite>>(
  "spriteCache",
  () => {
    return new Map<string, THREE.Sprite>();
  },
);

export const gAccounts = useState<Map<EthereumAddress, CardType> | null>(
  "accounts",
  () => null,
);
