import type { Attestation } from "~/utils/types";
import { c_QUERY, c_ATTESTER, c_GQL_VARIABLES } from "~/CONFIG";
import { useAsyncQuery, gql } from "#imports";

const fetchAttestations = async (round: string): Promise<Attestation[]> => {
  const query = gql`
    query Query($where: AttestationWhereInput) {
      attestations(where: $where) {
        attester
        recipient
        decodedDataJson
        timeCreated
      }
    }
  `;

  const { data } = await useAsyncQuery(query);
  console.log(data);

  return data.attestations
    .filter((attestation: Attestation) => attestation.attester === c_ATTESTER)
    .map((attestation: any) => ({
      ...attestation,
      decodedDataJson: JSON.parse(attestation.decodedDataJson),
    }))
    .filter(
      (attestation: Attestation) =>
        attestation.decodedDataJson[0].value.value === round,
    );
};

export default defineEventHandler(async (event): Promise<any> => {
  const query = getQuery(event);
  if (!query?.round) {
    throw createError({
      statusCode: 400,
      statusMessage: "No round param in URL",
    });
  }

  const attestations = fetchAttestations(query.round as string);
  return attestations;
});
