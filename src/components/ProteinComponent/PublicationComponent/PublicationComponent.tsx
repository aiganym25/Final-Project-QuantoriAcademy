import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PublicationComponent.css";
import LinkIcon from "../../../assets/link-icon.svg";
import LinkInactiveIcon from "../../../assets/linkInactive.svg";

interface PublicationType {
  id: string;
  citationType: string;
  authors: string[];
  citationCrossReferences: {
    database: string;
    id: string;
  }[];
  title: string;
  categories: string;
  citedFor: string;
  journal: string;
  volume: string;
  firstPage: string;
  lastPage: string;
  publicationDate: string;
}

export default function PublicationComponent(): JSX.Element {
  const { id } = useParams();
  const [publications, setPublications] = useState<PublicationType[]>([]);

  const handlePudMedLink = (publicationId: string): void => {
    window.open(`https://pubmed.ncbi.nlm.nih.gov/${publicationId}`);
  };
  const handleEuropePMCLink = (publicationId: string): void => {
    window.open(`https://pubmed.ncbi.nlm.nih.gov/${publicationId}`);
  };

  const handleThirdLink = (publicationId: string): void => {
    window.open(`https://dx.doi.org/${publicationId}`);
  };
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://rest.uniprot.org/uniprotkb/${id}/publications`
        );

        const resData = await response.json();
        resData.results.forEach((res: any) => {
          const publicationId = res.citation.id;
          const citationType = res.citation.citationType;
          const title = res.citation.title;
          const authors = res.citation.authors;
          const citationCrossReferences = res.citation.citationCrossReferences;
          const citedFor = res.references.map(
            (el: any) => el.referencePositions
          );
          const categories = res.references.map(
            (el: any) => el.sourceCategories
          );
          const journal = res.citation.journal;
          const volume = res.citation.volume;
          const firstPage = res.citation.firstPage;
          const lastPage = res.citation.lastPage;
          const publicationDate = res.citation.publicationDate;

          const data = {
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
          setPublications((prevData) => [...prevData, data]);
        });
      } catch (er) {
        message.error("An error occurred while fetching the publications.");
      }
    };
    fetchData();
  }, [id]);
  return (
    <div>
      {publications &&
        publications.map((publication, index) => (
          <div key={index} className="publication__container ">
            <div className="publication__title">{publication.title}</div>
            <div className="publication__authors">
              <ul className="publication__author-list">
                {publication.authors.map((author: string, i: number) => (
                  <li key={i}>
                    <u>{author}</u>
                    {i !== publication.authors.length - 1 && ","}
                  </li>
                ))}
              </ul>
            </div>
            <div className="publication__details">
              <div className="publication__details_detail">
                <div className="publication__details__label">Categories: </div>
                <div className="publication__details__value">
                  {publication.categories}
                </div>
              </div>
              <div className="publication__details_detail">
                <div className="publication__details__label">Cited for: </div>
                <div className="publication__details__value">
                  {publication.citedFor}
                </div>
              </div>
              <div className="publication__details_detail">
                <div className="publication__details__label">Source: </div>
                <div className="publication__details__value">
                  {publication.citationType}
                </div>
              </div>
            </div>
            {publication.citationCrossReferences && (
              <div className="publication__links" key={index}>
                <div
                  className="publication__link"
                  onClick={() => handlePudMedLink(publication.id)}
                >
                  PubMed
                  <img src={LinkIcon} alt="" />
                </div>

                <div
                  className="publication__link"
                  onClick={() => handleEuropePMCLink(publication.id)}
                >
                  Europe PMC
                  <img src={LinkIcon} alt="" />
                </div>

                <div
                  className={`publication__link ${
                    publication.citationCrossReferences.length !== 2 &&
                    "inactive"
                  }`}
                  onClick={() =>
                    handleThirdLink(publication.citationCrossReferences[1].id)
                  }
                >
                  {`${publication.journal} ${publication.volume}:${publication.firstPage}-${publication.lastPage} (${publication.publicationDate})`}
                  <img
                    src={
                      publication.citationCrossReferences.length === 2
                        ? LinkIcon
                        : LinkInactiveIcon
                    }
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
