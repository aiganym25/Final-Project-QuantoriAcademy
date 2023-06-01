import { message } from "antd";
import { config } from "../config";

export async function fetchFilterOptions(query: string): Promise<{
  annotationScores: { value: string; label: string }[];
  proteinWith: { value: string; label: string }[];
  popularOrganisms: { value: string; label: string }[];
}> {
  const GET_FILTER_OPTIONS = `${config.filterProteinUrl}(${encodeURIComponent(
    query
  )})`;

  try {
    const response = await fetch(GET_FILTER_OPTIONS);
    const responseData = await response.json();
    const annotationScores = responseData.facets[2].values.map(
      (value: { value: string; count: number }) => ({
        value: value.value,
        label: value.value,
      })
    );

    const proteinWith = responseData.facets[1].values.map(
      (value: { label: string; value: string; count: number }) => ({
        value: value.value,
        label: value.label,
      })
    );

    const popularOrganisms = responseData.facets[0].values.map(
      (value: { label: string; value: string; count: number }) => ({
        value: value.value,
        label: value.label,
      })
    );

    return {
      annotationScores,
      proteinWith,
      popularOrganisms,
    };
  } catch (error) {
    message.error("Something went wrong. Try again");
    throw error;
  }
}
