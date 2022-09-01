import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavButtonBlack = styled.button`
  border: none;
  background: black;
  color: white;
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  float: right;

  &:hover {
    opacity: 0.9;
  }
`;

const NavigationBarInner = styled.div`
  margin-right: 15px;
`;

const NavigationBar = styled.div`
  color: white;
  background: black;
  width: 100%;
  height: 35px;
`;

function Navigation() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <NavigationBar>
      <NavigationBarInner>
        {!isLoggedIn ? (
          <NavButtonBlack
            onClick={() => {
              navigate("/", { replace: true });
            }}
          >
            Login
          </NavButtonBlack>
        ) : (
          <NavButtonBlack
            onClick={() => {
              authCtx.logout();
              navigate("/", { replace: true });
            }}
          >
            Logout
          </NavButtonBlack>
        )}
        {isLoggedIn && (
          <NavButtonBlack
            onClick={() => {
              navigate("/profile", { replace: true });
            }}
          >
            Profile
          </NavButtonBlack>
        )}
        {isLoggedIn && (
          <NavButtonBlack
            onClick={() => {
              navigate("/change-password", { replace: true });
            }}
          >
            Change Password
          </NavButtonBlack>
        )}
      </NavigationBarInner>
    </NavigationBar>
  );
}
export default Navigation;
