import { Table, Spin } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProteins } from "../../state-management/slices/tableDataSlice";
import { useAppDispatch, useAppSelector } from "../../state-management/store";
import "./TableComponent.css";
import SortIcon from "../../assets/sort-icon.svg";
import SortActiveIcon from "../../assets/sortActive.svg";
import { config } from "../../config/index";

interface SortOrders {
  [key: string]: "asc" | "desc" | "default";
}

export default function TableComponent(): JSX.Element {
  const searchQuery = useAppSelector((state) => state.searchParam.searchQuery);
  const data = useAppSelector((state) => state.tableData.data);
  const [sortOrders, setSortOrders] = useState<SortOrders>({
    accession: "default",
    gene: "default",
    organismName: "default",
    id: "default",
    length: "default",
  });
  const resultText = `${data.length} Search Results for "${searchQuery}"`;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const GET_SEARCH_REQUEST_API = `${
    config.searchProteinURL
  }(${encodeURIComponent(searchQuery ?? "")})`;

  useEffect(() => {
    setLoading(true);
    if (searchQuery !== null && searchQuery !== "") {
      dispatch(fetchProteins(GET_SEARCH_REQUEST_API));
    }

    setLoading(false);
  }, [searchQuery, GET_SEARCH_REQUEST_API, dispatch]);

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

    // Reset the sort order of all other columns to "default"
    Object.keys(sortOrders).forEach((column) => {
      if (column === field) {
        newSortOrders[column] = newSortOrder;
      } else {
        newSortOrders[column] = "default";
      }
    });

    setSortOrders(newSortOrders);

    const encodedParam = encodeURIComponent(`${field} ${newSortOrder}`);

    const url: string = `${GET_SEARCH_REQUEST_API}&sort=${encodedParam}`;

    setLoading(true);
    if (newSortOrder === "default") {
      dispatch(fetchProteins(GET_SEARCH_REQUEST_API));
    } else {
      dispatch(fetchProteins(url));
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
          <Table dataSource={data}>
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
