import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Props {
  children: React.ReactNode;
}
export default function AuthRoute({ children }: Props) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => AuthCheck());
  // will be called whenever our auth variable is changed
  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false);
    } else {
      console.log("unauthorized");
      navigate("/auth");
    }
  });
  if (loading) {return <p>loading...</p>};
  return <>{children}</>;
}
