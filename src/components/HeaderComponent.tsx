import { Col, Divider, message, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HeaderComponent(): JSX.Element {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async (): Promise<void> => {
    try {
      await logout();
      message.success("You have succefully logged out");
      navigate("/");
    } catch (er) {
      message.error("Woops! Something went wrong. Please, try again!");
    }
  };
  return (
    <>
      <Row justify="end" align="middle" style={{ height: "3em" }}>
        <Col
          style={{
            color: "#2B2B2B",
            fontSize: "1em",
            fontWeight: "600",
            textAlign: "center",
          }}
          span={2}
        >
          {user && user.email}
        </Col>
        <Col
          style={{
            color: "#7EA0D2",
            fontSize: "1em",
            fontWeight: "600",
            textAlign: "center",
            cursor: "pointer",
          }}
          span={4}
          onClick={handleLogOut}
        >
          Log out
        </Col>
      </Row>
      <Divider
        style={{ border: "1px solid rgba(216, 231, 255, 1)", margin: 0 }}
      />
    </>
  );
}
