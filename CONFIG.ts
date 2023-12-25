export const c_Schemaid =
  "0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b";
export const c_Attester = "0x621477dBA416E12df7FF0d48E14c4D20DC85D7D9";
export const c_Client_uri = "https://optimism.easscan.org/graphql";

export const c_Query = `
query Attestations($where: AttestationWhereInput) {
  attestations(where: $where) {
      attester
      recipient
      decodedDataJson
  }
}
`;

export const c_Gql_variables = {
  where: {
    AND: [
      { schemaId: { equals: c_Schemaid } },
      { revoked: { equals: false } },
      { attester: { equals: c_Attester } },
    ],
  },
};
