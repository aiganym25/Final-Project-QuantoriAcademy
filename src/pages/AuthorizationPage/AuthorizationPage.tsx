import SignUpComponent from "../../components/SignUpComponent";
import LoginComponent from "../../components/LoginComponent";
import DnaImage from "../../assets/dna.png";
import "./AuthorizationPage.css";
import { useAppSelector } from "../../redux/store";

export default function AuthorizationPage() {
  const isSignUp = useAppSelector((state) => state.signUp.isSignUp);

  return (
    <div className="container">
      <img src={DnaImage} alt="logo" className="container-background-image" />

      {isSignUp ? <LoginComponent /> : <SignUpComponent />}
    </div>
  );
}
