import { message } from "antd";
// let dataCounter = 0;

export const fetchDataByChunks = async (
  api: string
): Promise<{
  totalDataCount: number;
  nextPageUrl: string | null;
  newEntities: Protein[];
}> => {
  const response = await fetch(api);
  const totalCountHeader = response.headers.get("X-Total-Results");
  const linkHeader = response.headers.get("link");
  const nextPageUrl = extractUrlFromLinkHeader(linkHeader);
  const totalDataCount = totalCountHeader ? parseInt(totalCountHeader) : 0;
  const newEntities = await getNewEntities(api);
  return { totalDataCount, nextPageUrl, newEntities };
};

export interface Protein {
  key: number;
  primaryAccession: string;
  uniProtkbId: string;
  genes: string;
  organism: string;
  locations: string;
  length: number;
}
const getNewEntities = async (api: string): Promise<Protein[]> => {
  try {
    const response = await fetch(api);
    const res = await response.json();
    // dataCounter = res.results.length;
    const newEntities: Protein[] = res.results.map(
      (
        result: {
          primaryAccession: string;
          uniProtkbId: string;
          genes?: {
            orfNames?: { value: string }[];
            geneName?: { value: string };
          }[];
          organism: { scientificName: string };
          sequence: { length: number };
          comments?: {
            subcellularLocations: { location: { value: string } }[];
          }[];
        },
        index: number
      ) => {
        let genes = "";
        if (result.genes) {
          if (result.genes[0]?.orfNames) {
            genes = result.genes
              .map((gene) =>
                gene.orfNames?.map((value) => value.value).join(", ")
              )
              .join(", ");
          } else if (result.genes[0]?.geneName) {
            genes = result.genes.map((gene) => gene.geneName?.value).join(", ");
          }
        }
        const organism = result.organism.scientificName;
        const length = result.sequence.length;
        const locations = result.comments
          ?.map(
            (el: { subcellularLocations: { location: { value: string } }[] }) =>
              el.subcellularLocations.map(
                (loc: { location: { value: string } }) => loc.location.value
              )
          )
          ?.join(", ");

        return {
          key: generateUniqueKey(),
          primaryAccession: result.primaryAccession,
          uniProtkbId: result.uniProtkbId,
          genes: genes,
          organism: organism,
          locations: locations,
          length: length,
        };
      }
    );
    return newEntities;
  } catch (er) {
    message.error("Something went wrong while fetching the data");
    return [];
  }
};
const generateUniqueKey = (() => {
  let counter = 0;
  return () => {
    counter++;
    return counter;
  };
})();

export function extractUrlFromLinkHeader(
  linkHeader: string | null
): string | null {
  if (!linkHeader) {
    return null;
  }

  const regex = /<([^>]+)>;\s*rel="next"/;
  const match = regex.exec(linkHeader);
  if (match && match.length >= 2) {
    return match[1];
  }

  return null;
}
