import { PublicationInterface } from "../interfaces/PublicationInterface";
import { config } from "../config/index";
import { message } from "antd";

export const fetchProteinPublication = async (
  id: string
): Promise<PublicationInterface[]> => {
  try {
    const response = await fetch(`${config.proteinInfoURl}${id}/publications`);
    const resData = await response.json();
    const data: PublicationInterface[] = resData.results.map(
      (res: {
        citation: {
          id: string;
          citationType: string;
          title: string;
          authors?: string[];
          citationCrossReferences: { database: string; id: string }[];
          journal: string;
          volume: string;
          lastPage: string;
          firstPage: string;
          publicationDate: string;
        };
        references: {
          referencePositions: string[];
          sourceCategories: string[];
        }[];
      }) => {
        const publicationId = res.citation.id;
        const citationType = res.citation.citationType;
        const title = res.citation.title;
        const authors = res.citation.authors || [];
        const citationCrossReferences = res.citation.citationCrossReferences;
        const citedFor = res.references.map(
          (el: { referencePositions: string[] }) => el.referencePositions
        );
        const categories = res.references.map(
          (el: { sourceCategories: string[] }) => el.sourceCategories
        );
        const journal = res.citation.journal;
        const volume = res.citation.volume;
        const firstPage = res.citation.firstPage;
        const lastPage = res.citation.lastPage;
        const publicationDate = res.citation.publicationDate;

        return {
          id: publicationId,
          citationType: citationType,
          title: title,
          authors: authors,
          citationCrossReferences: citationCrossReferences,
          citedFor: citedFor,
          categories: categories,
          journal: journal,
          volume: volume,
          firstPage: firstPage,
          lastPage: lastPage,
          publicationDate: publicationDate,
        };
      }
    );

    return data;
  } catch (er) {
    message.error("An error occurred while fetching the publications.");
    return [];
  }
};
