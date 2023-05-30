import { useEffect } from "react";
import Content from "../../components/Content/Content";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

export default function HomePage(): JSX.Element {
  useEffect(() => {
    localStorage.setItem("lastPage", "/search");
  }, []);
  return (
    <>
      <HeaderComponent />
      <Content />
    </>
  );
}
