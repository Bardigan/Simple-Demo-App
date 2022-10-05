import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../lib/ToggleSwitch";
import { BlackButton, NavigationBarInner, NavigationBar } from "../style/Style"

function Navigation() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const toggleMode =() => {
    authCtx.modeSelectHandler();
  }

  return (
    <NavigationBar mode={authCtx.mode}>
      <NavigationBarInner>

      
      
        {!isLoggedIn ? (
          <BlackButton
            mode={authCtx.mode}
            onClick={() => {
              navigate("/", { replace: true });
            }}
          >
            Login
          </BlackButton>
        ) : (
          <BlackButton
            mode={authCtx.mode}
            onClick={() => {
              authCtx.logout();
              navigate("/", { replace: true });
            }}
          >
            Logout
          </BlackButton>
        )}
        {isLoggedIn && (
          <BlackButton
            mode={authCtx.mode}
            onClick={() => {
              navigate("/profile", { replace: true });
            }}
          >
            Profile
          </BlackButton>
        )}
        {isLoggedIn && (
          <BlackButton
            mode={authCtx.mode}
            onClick={() => {
              navigate("/change-password", { replace: true });
            }}
          >
            Change Password
          </BlackButton>
        )}

        <ToggleSwitch mode={authCtx.mode} onToggle={toggleMode} label="Mode" />

      </NavigationBarInner>
    </NavigationBar>
  );
}
export default Navigation;
