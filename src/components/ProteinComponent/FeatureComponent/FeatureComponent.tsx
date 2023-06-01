import { protvistaConfig } from "../../../config/index";
import ProtvistaUniprot from "protvista-uniprot/dist/es";
import { useEffect } from "react";

export default function FeatureComponent(): JSX.Element {
  useEffect(() => {
    if (!window.customElements.get("protvista-uniprot")) {
      window.customElements.define("protvista-uniprot", ProtvistaUniprot);
    }
  }, []);

  return <protvista-uniprot accession="P05067" config={protvistaConfig} />;
}
