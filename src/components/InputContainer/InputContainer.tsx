import { Button, Image, Input } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterIcon from "../../assets/filter-icon.png";
import "./InputContainer.css";

export default function InputContainer(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };
  const handleSearch = (): void => {
    setSearchParams({ query: query || "" });
    window.location.reload(); // Reload the page
  };
  return (
    <div className="input-container">
      <Input
        value={query || ""}
        placeholder="Enter search value"
        allowClear
        style={{
          flexGrow: 1,
          marginRight: "1em",
          height: "40px",
        }}
        onChange={handleInputChange}
      />
      <Button
        style={{
          backgroundColor: "rgba(60, 134, 244, 0.2)",
          color: "#3C86F4",
          fontWeight: 700,
          fontSize: "12px",
          width: "180px",
          marginRight: "1em",
          height: "40px",
        }}
        onClick={handleSearch}
      >
        Search
      </Button>

      <Button
        style={{
          backgroundColor: "rgba(60, 134, 244, 0.2)",
          color: "#3C86F4",
          fontWeight: 700,
          fontSize: "12px",
          height: "40px",
        }}
      >
        <Image src={FilterIcon} />
      </Button>
    </div>
  );
}
