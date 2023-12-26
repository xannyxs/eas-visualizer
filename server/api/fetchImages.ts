export default defineEventHandler(async (event): Promise<any> => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  console.log(query.address);

  if (!query.address) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing address",
    });
  }

  if (!config.private.OPENSEA_API) {
    console.log("Error");
    throw createError({
      statusCode: 400,
      statusMessage: "Missing OPENSEA_API",
    });
  }

  const { data, error } = await useFetch<any>(
    `https://api.opensea.io/v2/chain/optimism/account/${query.address}/nfts`,
    {
      headers: {
        accept: "application/json",
        "x-api-key": config.private.OPENSEA_API,
      },
    },
  );

  if (error.value) {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }

  console.log(data);

  return data;
});
