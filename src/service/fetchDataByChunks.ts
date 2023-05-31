export const fetchDataByChunks = async (
  api: string
): Promise<{ totalCount: number; nextPageUrl: string | null }> => {
  const response = await fetch(api);
  const totalCountHeader = response.headers.get("X-Total-Results");
  const linkHeader = response.headers.get("link");
  const nextPageUrl = extractUrlFromLinkHeader(linkHeader);
  const totalCount = totalCountHeader ? parseInt(totalCountHeader) : 0;
  return { totalCount, nextPageUrl };
};

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
