import "./MainPage.css";
import DnaImage from "../../assets/dna.png";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <img src={DnaImage} alt="logo" className="container-background-image" />
      <div className="content">
        <h1>Q-1 search</h1>
        <div className="content__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sed vero, magni voluptatibus ullam est quia maxime nesciunt nisi!
          Dolores quos itaque dignissimos deleniti omnis rem officia et.
          Temporibus, odio!
        </div>
        <div className="content__button" onClick={() => navigate("/auth")}>
          Login
        </div>
      </div>
    </div>
  );
}
