import { Table, Spin } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchProteins,
  setTableData,
} from "../../state-management/slices/tableDataSlice";
import { useAppDispatch, useAppSelector } from "../../state-management/store";
import "./TableComponent.css";
import SortIcon from "../../assets/sort-icon.svg";
import SortActiveIcon from "../../assets/sortActive.svg";
import { config } from "../../config/index";
import { fetchDataByChunks } from "../../service/fetchDataByChunks";
import {
  setNextDataUrl,
  setRequestUrl,
} from "../../state-management/slices/urlSlice";
import { fetchFilteredData } from "../../service/fetchFilteredData";

interface SortOrders {
  [key: string]: "asc" | "desc" | "default";
}

export default function TableComponent(): JSX.Element {
  const searchQuery = useAppSelector((state) => state.searchParam.searchQuery);
  const data = useAppSelector((state) => state.tableData.data);

  const [dataLength, setDataLength] = useState<number>(0);
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
  const [loading, setLoading] = useState(false);
  const requestURL = useAppSelector((state) => state.requestURL.requestUrl);

  useEffect(() => {
    console.log(data);
    // const fetchData = async (url: string): Promise<void> => {
    //   const { totalCount, nextPageUrl } = await fetchDataByChunks(url);
    //   setDataLength(totalCount);
    //   if (nextPageUrl) {
    //     dispatch(fetchProteins(nextPageUrl));
    //   }
    //   if (nextPageUrl) {
    //     dispatch(setRequestUrl(nextPageUrl));
    //   }
    // };

    // // Function to handle scrolling
    // const handleScroll = (): void => {
    //   const { scrollTop, scrollHeight, clientHeight } =
    //     document.documentElement;
    //   const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;

    //   console.log(scrollTop + clientHeight);

    //   if (isScrolledToBottom) {
    //     fetchData(requestURL);
    //   }
    // };

    // window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, [dispatch, searchQuery]);

  const handleSort = (field: string): void => {
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

    const url: string = `${config.searchProteinURL}${encodeURIComponent(
      searchQuery ?? ""
    )}&sort=${encodedParam}`;
    dispatch(setRequestUrl(url));

    setLoading(true);
    const getFilteredData = async (api: string): Promise<void> => {
      const sortedData = await fetchFilteredData(api);
      dispatch(setTableData(sortedData));
    };
    if (newSortOrder === "default") {
      getFilteredData(
        `${config.searchProteinURL}${encodeURIComponent(searchQuery ?? "")}`
      );
    } else {
      getFilteredData(url);
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
      ) : loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="search-result-text">{resultText}</div>
          <br />
          <Table
            dataSource={data}
            pagination={false}
            scroll={{ y: "calc(100vh - 100px)" }}
          >
            <Column title="#" dataIndex="key" key="key" width="5%" />
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
    </>
  );
}
