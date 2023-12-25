import * as THREE from "three";

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
