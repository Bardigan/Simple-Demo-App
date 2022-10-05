import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import styled from "styled-components";
import { BlackButton, SimpleButton, FormInput, FormLabel, FormHeader } from "../style/Style"

const Form = styled.form`
  margin-top: 200px;
  background: #f7f7f7;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 30%;
  max-height: 350px;
  border-radius: 10px;
  border: 1px solid #cdcdcd;
  padding: 25px; 
`;

const ValidationMsgErr = styled.div`
  font-size: 15px;
  color: red;
  margin-top: 10px;
`;

function Login() {
  const [registration, setRegistration] = useState(false);
  const [authError, setError] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const confirmHandler = (event) => {
    event.preventDefault();
    setError(false);

    let url;
    if (registration) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSQUjZSlSh5mAa0Cwjl7BpyHhwxOchnDI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSQUjZSlSh5mAa0Cwjl7BpyHhwxOchnDI";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (registration) {
          // switch to Login after the succesful account creation
          setRegistration((prevState) => !prevState);
        } else {
          // string into a number
          const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
          authCtx.login(data.idToken, expirationTime.toISOString(), false, data.localId);
          navigate("/profile", { replace: true });
        }
      })
      .catch((err) => {
        setError(true);
        // alert('Nope :)');
      });
  };

  return (
    <div>
        {!registration ? (
          <Form onSubmit={confirmHandler}>
            <FormHeader mode={authCtx.mode}>Login</FormHeader>
            <FormLabel mode={authCtx.mode} htmlFor="email">Your Email</FormLabel>
            <div>
              <FormInput
                type="email"
                required
                ref={emailInputRef}
                />
            </div>
            <FormLabel mode={authCtx.mode} htmlFor="password">Your Password</FormLabel>
            <div>
              <FormInput
                type="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <br />
            <BlackButton mode={authCtx.mode}>Login</BlackButton>
            <br />
            <SimpleButton
              mode={authCtx.mode}
              type="button"
              onClick={() => {
                setRegistration((prevState) => !prevState);
              }}
            >
              Create new account
            </SimpleButton>
            {authError === true? <ValidationMsgErr>Something went wrong check the credentials and try again!</ValidationMsgErr> : ''}
          </Form>
        ) : (
          <Form onSubmit={confirmHandler}>
            <FormHeader mode={authCtx.mode}>Sign Up</FormHeader>
            <FormLabel mode={authCtx.mode} htmlFor="email">Your Email</FormLabel>
            <div>
              <FormInput
                type="email"
                required
                ref={emailInputRef}
              />
            </div>
            <FormLabel mode={authCtx.mode} htmlFor="password">Your Password</FormLabel>
            <div>
              <FormInput
                type="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <br />
            <BlackButton mode={authCtx.mode}>Create Account</BlackButton>
            <br />
            <SimpleButton
              mode={authCtx.mode}
              type="button"
              onClick={() => {
                setRegistration((prevState) => !prevState);
              }}
            >
              Login with existing account
            </SimpleButton>
            {authError === true? <ValidationMsgErr>Something went wrong check the credentials and try again!</ValidationMsgErr> : ''}
          </Form>
        )}
    </div>
  );
}

export default Login;
