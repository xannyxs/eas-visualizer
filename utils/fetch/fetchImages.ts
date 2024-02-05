import { type OpenseaNFT } from "../types";

export async function fetchImages(address: EthereumAddress) {
  const config = useRuntimeConfig();

  if (!address) {
    console.error("Missing the address");
    return null;
  }

  const { data, error } = await useFetch<OpenseaNFT>(
    `https://api.opensea.io/v2/chain/optimism/account/${address}/nfts`,
    {
      headers: {
        accept: "application/json",
        "x-api-key": config.public.PUBLIC_OPENSEA_API,
      },
    },
  );

  if (!data.value) {
    console.error("Something went wrong ", error.value);
    return null;
  }

  const optimismNFT = data.value.nfts?.find(
    (nft: any) => nft.collection === "optimist-nft",
  );

  return optimismNFT ? optimismNFT.image_url : "";
}
