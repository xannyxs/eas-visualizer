import type { EthereumAddress } from "./types";

export async function fetchImages(address: EthereumAddress) {
  try {
    const res = await fetch(`/api/fetchnft?address=${address}`);
    if (res.ok) {
      const data = await res.json();
      const optimismNFT = data.nfts?.find(
        (nft: any) => nft.collection === "optimist-nft",
      );
      return optimismNFT ? optimismNFT.image_url : "";
    } else {
      console.log("Failed to fetch data. Status:", res.status);
      return "";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return "";
  }
}
