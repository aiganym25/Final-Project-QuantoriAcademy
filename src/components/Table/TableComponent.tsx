import { message, Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProteins } from "../../redux/slices/tableDataslice";
import { config } from "../../config/index";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./TableComponent.css";

export default function TableComponent(): JSX.Element {
  const searchQuery = useAppSelector((state) => state.searchParam.searchQuery);
  const data = useAppSelector((state) => state.tableData.data);

  const resultText = `${data.length} Search Results for "${searchQuery}"`;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const GET_SEARCH_REQUEST_API = `${
    config.searchProteinURL
  }${encodeURIComponent(searchQuery ?? "")}`;

  useEffect(() => {
    dispatch(fetchProteins(GET_SEARCH_REQUEST_API));
    // if (searchQuery) {
    //   navigate("/search");
    // }
  }, [searchQuery, GET_SEARCH_REQUEST_API, dispatch]);

  return (
    <>
      {searchQuery === "" ? (
        <div className="no-data-text">
          <div>No data to display</div>
          <div>Please start search to display results</div>
        </div>
      ) : (
        <>
          <div className="search-result-text">{resultText}</div>
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
                  className="entry-column"
                  onClick={() => navigate(`/protein/${text}`)}
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
                <div className="gene-column">{text.toUpperCase()}</div>
              )}
            />
            <Column
              title="Organism"
              dataIndex="organism"
              key="organism"
              width="14%"
              render={(text) => <div className="organism-column">{text}</div>}
            />
            <Column
              title="Subcellular Location"
              dataIndex="locations"
              key="locations"
              width="19%"
              render={(text) => (
                <div className="subcellular-location-column">{text}</div>
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
