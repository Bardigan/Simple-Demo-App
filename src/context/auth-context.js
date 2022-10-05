import React, { useState, useEffect, useMemo, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: (token) => {},
  mode: 'black',
  modeSelectHandler: () => {}
});

const calculateRemainingTime = (expirationTime) => {
  const formatedCurrentTime = new Date().getTime();
  const formatedExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = formatedExpirationTime - formatedCurrentTime;
  return remainingDuration;
};

const retriveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpiration = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpiration);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  // if we pass all the checks it means the token is still good enough

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const retriveStoredMode = () => {
  const storedMode = localStorage.getItem("mode");
  return {
    mode: storedMode
  }
}



export const AuthContextProvider = (props) => {
  const tokenData = useMemo(() => retriveStoredToken(), []);
  const modeData = useMemo(() => retriveStoredMode(), []);
  let initialToken;
  let initialMode = 'black';

  if (modeData) {
    initialMode = modeData.mode;
  }

  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const [mode, setMode] = useState(initialMode);

  const userIsLoggedIn = !!token;

  const modeSelectHandler = () => {
    if (mode === 'black') {
      localStorage.setItem("mode", 'green');
      setMode('green');      
    } else {
      localStorage.setItem("mode", 'black');
      setMode('black');
    }    
  }

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, changePassword) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    // formated

    if (changePassword === true) {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    }

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler])

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    mode: mode,
    modeSelectHandler: modeSelectHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
