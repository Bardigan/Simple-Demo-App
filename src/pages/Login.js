import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import styled from "styled-components";

const FormButtonBlack = styled.button`
  margin-top: 15px;
  border: none;
  background: black;
  color: white;
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const FormButtonSimple = styled.button`
  background: none;
  color: black;
  margin-top: 15px;
  border: none;
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const FormInput = styled.input`
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #cdcdcd;
  width: 60%;
  margin: 10px 0px 10px 0px;
`;

const FormLabel = styled.label`
  padding: 5px;
  display: block;
  font-weight: 300;
`;

const FormHeader = styled.header`
  padding-bottom: 10px;
  font-size: 25px;
`;

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
            <FormHeader>Login</FormHeader>
            <FormLabel htmlFor="email">Your Email</FormLabel>
            <div>
              <FormInput
                type="email"
                required
                ref={emailInputRef}
                />
            </div>
            <FormLabel htmlFor="password">Your Password</FormLabel>
            <div>
              <FormInput
                type="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <FormButtonBlack>Login</FormButtonBlack>
            <br />
            <FormButtonSimple
              type="button"
              onClick={() => {
                setRegistration((prevState) => !prevState);
              }}
            >
              Create new account
            </FormButtonSimple>
            {authError === true? <ValidationMsgErr>Something went wrong check the credentials and try again!</ValidationMsgErr> : ''}
          </Form>
        ) : (
          <Form onSubmit={confirmHandler}>
            <FormHeader>Sign Up</FormHeader>
            <FormLabel htmlFor="email">Your Email</FormLabel>
            <div>
              <FormInput
                type="email"
                required
                ref={emailInputRef}
              />
            </div>
            <FormLabel htmlFor="password">Your Password</FormLabel>
            <div>
              <FormInput
                type="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <FormButtonBlack>Create Account</FormButtonBlack>
            <br />
            <FormButtonSimple
              type="button"
              onClick={() => {
                setRegistration((prevState) => !prevState);
              }}
            >
              Login with existing account
            </FormButtonSimple>
            {authError === true? <ValidationMsgErr>Something went wrong check the credentials and try again!</ValidationMsgErr> : ''}
          </Form>
        )}
    </div>
  );
}

export default Login;
