import { Table, Spin } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setTotalDataCount } from "../../state-management/slices/tableDataSlice";
import { useAppDispatch, useAppSelector } from "../../state-management/store";
import "./TableComponent.css";
import SortIcon from "../../assets/sort-icon.svg";
import SortActiveIcon from "../../assets/sortActive.svg";
import { config } from "../../config/index";
import { Protein, fetchDataByChunks } from "../../service/fetchDataByChunks";
import { setRequestUrl } from "../../state-management/slices/urlSlice";

interface SortOrders {
  [key: string]: "asc" | "desc" | "default";
}
interface Props {
  data: Protein[];
  setData: React.Dispatch<React.SetStateAction<Protein[]>>;
}
export default function TableComponent({ data, setData }: Props): JSX.Element {
  const searchQuery = useAppSelector((state) => state.searchParam.searchQuery);
  const dataLength = useAppSelector((state) => state.tableData.totalDataCount);
  const [sortOrders, setSortOrders] = useState<SortOrders>({
    accession: "default",
    gene: "default",
    organismName: "default",
    id: "default",
    length: "default",
  });

  const resultText = `${dataLength} Search Results for "${searchQuery}"`;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [hasMoreData, setMoreData] = useState(false);
  const requestURL = useAppSelector((state) => state.requestURL.requestUrl);
  const ref = useRef(null);

  const fetchData = async (
    url: string,
    isIntersecting = false
  ): Promise<void> => {
    const { nextPageUrl, newEntities, totalDataCount } =
      await fetchDataByChunks(url);

    dispatch(setTotalDataCount(totalDataCount));

    if (newEntities.length !== 0 && !isIntersecting) {
      setData(newEntities);
    } else if (newEntities.length === 0) {
      setData([]);
    } else if (newEntities.length !== 0 && isIntersecting && nextPageUrl) {
      setData((prev) => [...prev, ...newEntities]);
    }
    if (nextPageUrl) {
      dispatch(setRequestUrl(nextPageUrl));
    }
    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const lastRow = entries[0];
      if (lastRow.isIntersecting) {
        fetchData(requestURL, true);
      }
    });
    const observerElement = ref.current;
    if (observerElement) {
      observer.observe(observerElement);
    }
    return () => {
      if (observerElement) {
        observer.unobserve(observerElement);
      }
    };
  }, [data]);

  useEffect(() => {
    fetchData(requestURL);
  }, [searchQuery]);

  const handleSort = (field: string): void => {
    setLoading(true);
    const currentSortOrder = sortOrders[field];

    let newSortOrder: "asc" | "desc" | "default" = "default";
    if (currentSortOrder === "asc") {
      newSortOrder = "desc";
    } else if (currentSortOrder === "desc") {
      newSortOrder = "default";
    } else {
      newSortOrder = "asc";
    }

    const newSortOrders: SortOrders = {};

    Object.keys(sortOrders).forEach((column) => {
      if (column === field) {
        newSortOrders[column] = newSortOrder;
      } else {
        newSortOrders[column] = "default";
      }
    });

    setSortOrders(newSortOrders);

    const encodedParam = encodeURIComponent(`${field} ${newSortOrder}`);

    let url: string = "";
    if (searchQuery.trim() === "") {
      url += `${config.searchProteinURL}*&sort=${encodedParam}`;
    } else {
      url = `${config.searchProteinURL}${encodeURIComponent(
        searchQuery
      )}&sort=${encodedParam}`;
    }
    dispatch(setRequestUrl(url));

    if (newSortOrder === "default") {
      setData([]);
      fetchData(`${config.searchProteinURL}${encodeURIComponent(searchQuery)}`);
    } else {
      setData([]);
      fetchData(url);
    }
    setLoading(false);
  };

  return (
    <>
      {searchQuery === null || searchQuery === "" ? (
        <div className="no-data-text">
          <div>No data to display</div>
          <div>Please start search to display results</div>
        </div>
      ) : (
        <>
          <div className="search-result-text">{resultText}</div>
          <br />

          <Table
            loading={loading}
            onRow={(_, index) => {
              if (index === data.length - 1) {
                return {
                  ref: ref,
                  onClick: () => {
                    setMoreData(true);
                    console.log(ref.current);
                  },
                };
              }
              return {
                onClick: () => {
                  console.log("");
                },
              };
            }}
            dataSource={data}
            pagination={false}
            scroll={{ x: "calc(600px + 50%)", y: "calc(100vh - 300px)" }}
          >
            <Column
              title="#"
              dataIndex="key"
              key="key"
              width="5%"
              render={(_, __, index) => index + 1}
            />
            <Column
              title={
                <div className="title">
                  <p>Entry</p>
                  <img
                    src={
                      sortOrders.accession !== "default"
                        ? SortActiveIcon
                        : SortIcon
                    }
                    alt=""
                    onClick={() => handleSort("accession")}
                  />
                </div>
              }
              dataIndex="primaryAccession"
              key="accession"
              width="10%"
              render={(text) => (
                <div
                  className="entry-column"
                  onClick={() => navigate(`/protein/${text}`)}
                >
                  {text.toUpperCase()}
                </div>
              )}
            />
            <Column
              title={
                <div className="title">
                  <p>Entry Names</p>
                  <img
                    src={
                      sortOrders.id !== "default" ? SortActiveIcon : SortIcon
                    }
                    alt=""
                    onClick={() => handleSort("id")}
                  />
                </div>
              }
              dataIndex="uniProtkbId"
              key="id"
              width="14%"
            />
            <Column
              title={
                <div className="title">
                  <p>Genes</p>
                  <img
                    src={
                      sortOrders.gene !== "default" ? SortActiveIcon : SortIcon
                    }
                    alt=""
                    onClick={() => handleSort("gene")}
                  />
                </div>
              }
              dataIndex="genes"
              key="gene"
              width="14%"
              render={(text) => (
                <div className="gene-column">{text.toUpperCase()}</div>
              )}
            />
            <Column
              title={
                <div className="title">
                  <p>Organism</p>
                  <img
                    src={
                      sortOrders.organismName !== "default"
                        ? SortActiveIcon
                        : SortIcon
                    }
                    alt=""
                    onClick={() => handleSort("organism_name")}
                  />
                </div>
              }
              dataIndex="organism"
              key="organism_name"
              width="14%"
              render={(text) => <div className="organism-column">{text}</div>}
            />
            <Column
              title={
                <div className="title">
                  <p>Subcellular Location</p>
                </div>
              }
              dataIndex="locations"
              key="cc_subcellular_location"
              width="19%"
              render={(text) => (
                <div className="subcellular-location-column">{text}</div>
              )}
            />
            <Column
              title={
                <div className="title">
                  <p>Length</p>
                  <img
                    src={
                      sortOrders.length !== "default"
                        ? SortActiveIcon
                        : SortIcon
                    }
                    alt=""
                    onClick={() => handleSort("length")}
                  />
                </div>
              }
              dataIndex="length"
              key="length"
              width="10%"
            />
          </Table>
        </>
      )}
      {loading && <Spin size="large" className="loading-spin" />}
    </>
  );
}
