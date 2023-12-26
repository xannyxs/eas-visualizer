export async function fetchImages(address: EthereumAddress) {
  if (!address) {
    console.error("Missing the address");
    return null;
  }

  const { data, error } = await useFetch(
    `/api/fetchImages?address=${address}`,
    {
      immediate: false,
      lazy: true,
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
