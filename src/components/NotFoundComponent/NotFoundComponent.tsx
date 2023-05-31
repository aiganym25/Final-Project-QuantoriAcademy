import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../state-management/context/AuthContext";
import "./NotFoundComponent.css";
import { ROUTES } from "src/routes/routesConfig";

export default function NotFoundComponent(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBackToSearch = (): void => {
    if (user) {
      navigate(ROUTES.HOME);
    } else {
      navigate(ROUTES.MAIN);
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
