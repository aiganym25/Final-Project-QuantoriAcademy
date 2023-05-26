import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./NotFoundComponent.css";

export default function NotFoundComponent(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBackToSearch = (): void => {
    if (user) {
      navigate("/search");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Page not found</p>
      <Button
        style={{
          backgroundColor: "#D8E7FF",
          color: "#000000",
          borderRadius: "24px",
          height: "48px",
          width: "160px",
          fontWeight: 700,
          fontSize: "12px",
        }}
        onClick={handleBackToSearch}
      >
        Back to Search
      </Button>
    </div>
  );
}
