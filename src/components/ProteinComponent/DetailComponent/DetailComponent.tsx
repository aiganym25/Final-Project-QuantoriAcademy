import { Col, message, Row } from "antd";
import { useAppSelector } from "../../../state-management/store";
import CopyIcon from "../../../assets/copy-icon.svg";
import useCopyToClipboard from "../../../hooks/copyToClipboard";
import "./DetailComponent.css";

export default function DetailComponent(): JSX.Element {
  const proteinDetails = useAppSelector((state) => state.proteinDetails);
  const [value, copy] = useCopyToClipboard();

  return (
    <div>
      <div className="protein-details__title">Sequence</div>
      <div style={{ margin: "0.5em" }}>
        <Row style={{ marginBottom: "0.5em" }}>
          <Col span={4}>
            <div className="protein-section__subtitle">Length</div>
            <div className="protein-section__content">
              {proteinDetails.length}
            </div>
          </Col>
          <Col span={4}>
            <div className="protein-section__subtitle">Last updated</div>
            <div className="protein-section__content">
              {proteinDetails.lastUpdate}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <div className="protein-section__subtitle">Mass (Da)</div>
            <div className="protein-section__content">
              {" "}
              {proteinDetails.mass}
            </div>
          </Col>
          <Col span={4}>
            <div className="protein-section__subtitle">Checksum</div>
            <div className="protein-section__content">
              {proteinDetails.checksum}
            </div>
          </Col>
        </Row>
        <div
          className="protein-details__copy"
          onClick={() => {
            copy(proteinDetails.value).then(() => {
              message.success("The key is copied");
            });
          }}
        >
          <img src={CopyIcon} alt="" />
          <div style={{ marginLeft: "0.5em" }}>Copy</div>
        </div>

        <div className="protein-details__key">{proteinDetails.value}</div>
      </div>
    </div>
  );
}
