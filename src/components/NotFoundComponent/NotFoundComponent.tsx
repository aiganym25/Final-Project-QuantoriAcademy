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
        className="not-found-container__button"
        onClick={handleBackToSearch}
      >
        Back to Search
      </Button>
    </div>
  );
}
