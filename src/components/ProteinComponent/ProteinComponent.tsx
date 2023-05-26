import { message } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProteinComponent(): JSX.Element {
  const { entry } = useParams();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetch(`https://rest.uniprot.org/uniprotkb/${entry}`);
        const resData = await res.json();
        console.log(resData);
      } catch (er) {
        message.error("An error occurred while fetching the data.");
      }
    };
    fetchData();
  }, [entry]);
  return <div></div>;
}
