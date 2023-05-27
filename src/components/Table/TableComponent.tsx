/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { message, Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface DataType {
  key: React.Key;
  primaryAccession: string;
  uniProtkbId: string;
  genes: string[];
  organism: string;
  locations: string[];
  length: number;
}

export default function TableComponent(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const [data, setData] = useState<DataType[]>([]);
  const resultText = `${data.length} Search Results for "${query}"`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetch(
          `https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location&query=${query}`
        );
        const resData = await res.json();

        // Map and format the fetched data to match the DataType interface
        resData.results.forEach((result: any, index: number) => {
          const genes = result.genes
            .map((gene: any) => gene.geneName.value)
            .join(", ");
          const organism = result.organism.scientificName;
          const length = result.sequence.length;
          const locations = result.comments
            .map((el: any) =>
              el.subcellularLocations.map((loc: any) => loc.location.value)
            )
            .join(", ");
          const dataUl = {
            key: index,
            primaryAccession: result.primaryAccession,
            uniProtkbId: result.uniProtkbId,
            genes: genes,
            organism: organism,
            locations: locations,
            length: length,
          };
          setData((prevData) => [...prevData, dataUl]);
        });
      } catch (er) {
        message.error("An error occurred while fetching the data.");
      }
    };
    if (query !== null) {
      fetchData();
    }
  }, [query]);

  return (
    <>
      {query === null ? (
        <div
          style={{
            height: "calc(100vh - 200px)",
            color: "#616161",
            fontWeight: 400,
            fontSize: "14px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>No data to display</div>
          <div>Please start search to display results</div>
        </div>
      ) : (
        <>
          <div style={{ fontWeight: 600, fontSize: "16px" }}>{resultText}</div>
          <br />
          <Table dataSource={data}>
            <Column title="#" dataIndex="key" key="key" width="5%" />
            <Column
              title="Entry"
              dataIndex="primaryAccession"
              key="primaryAccession"
              width="10%"
              render={(text) => (
                <div
                  onClick={() => navigate(`/protein/${text}`)}
                  style={{
                    color: "#175BC0",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {text.toUpperCase()}
                </div>
              )}
            />
            <Column
              title="Entry Names"
              dataIndex="uniProtkbId"
              key="uniProtkbId"
              width="14%"
            />
            <Column
              title="Genes"
              dataIndex="genes"
              key="genes"
              width="14%"
              render={(text) => (
                <div style={{ fontWeight: "600" }}>{text.toUpperCase()}</div>
              )}
            />
            <Column
              title="Organism"
              dataIndex="organism"
              key="organism"
              width="14%"
              render={(text) => (
                <div
                  style={{
                    borderRadius: "12px",
                    padding: "2px 12px",
                    backgroundColor: "#D8E7FF",
                    textAlign: "center",
                    display: "inline-block",
                  }}
                >
                  {text}
                </div>
              )}
            />
            <Column
              title="Subcellular Location"
              dataIndex="locations"
              key="locations"
              width="19%"
              render={(text) => (
                <div
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {text}
                </div>
              )}
            />
            <Column
              title="Length"
              dataIndex="length"
              key="length"
              width="10%"
            />
          </Table>
        </>
      )}
    </>
  );
}
