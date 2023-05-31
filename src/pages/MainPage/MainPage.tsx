import "./MainPage.css";
import DnaImage from "assets/dna.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/routes/routesConfig";

export default function MainPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="container">
      <img src={DnaImage} alt="logo" className="container-background-image" />
      <div className="main-page-content">
        <h1>Q-1 search</h1>
        <div className="main-page-content__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sed vero, magni voluptatibus ullam est quia maxime nesciunt nisi!
          Dolores quos itaque dignissimos deleniti omnis rem officia et.
          Temporibus, odio!
        </div>
        <div
          className="main-page-content__button"
          onClick={() => navigate(ROUTES.AUTH)}
        >
          Login
        </div>
      </div>
    </div>
  );
}
