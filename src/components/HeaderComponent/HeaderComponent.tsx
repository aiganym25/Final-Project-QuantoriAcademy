import { Col, Divider, message, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../state-management/context/AuthContext";
import "./HeaderComponent.css";
import { ROUTES } from "src/routes/routesConfig";

export default function HeaderComponent(): JSX.Element {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async (): Promise<void> => {
    try {
      await logout();
      message.success("You have succefully logged out");
      navigate(ROUTES.MAIN);
    } catch (er) {
      message.error("Woops! Something went wrong. Please, try again!");
    }
  };
  return (
    <>
      <Row justify="end" align="middle" style={{ height: "3em" }} gutter={16}>
        <Col className="header__email" span={6}>
          {user && user.email}
        </Col>
        <Col className="header__logout" onClick={handleLogOut} span={4}>
          Log out
        </Col>
      </Row>
      <Divider className="header__divider" />
    </>
  );
}
