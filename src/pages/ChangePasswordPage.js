import { useRef, useEffect, useState } from "react";
import AuthContext from "../context/auth-context";
import { useContext } from "react";
import useHttp from "../hooks/use-http";
import { changePassword } from "../lib/api";
import Spinner from "../lib/Spinner";
import styled from "styled-components";
import { BlackButton } from "../style/Style"

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

const ValidationMsgSuccs = styled.div`
  font-size: 15px;
  color: green;
  margin-top: 20px;
`;

function ChangePasswordPage() {
  const { sendRequest, status, error, data } = useHttp(changePassword);
  const inputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status === "completed" && !error) {
      inputRef.current.value = "";
      const newExpirationTime = new Date(new Date().getTime() + 3600 * 1000);
      authCtx.login(data.idToken, newExpirationTime.toISOString(), true);
      setSuccess(true);
    }
  }, [status, error, data, authCtx]);

  const onChangeHandler = (event) => {
    event.preventDefault();
    setSuccess(false);
    sendRequest({
      idToken: authCtx.token,
      password: inputRef.current.value,
      returnSecureToken: false,
    });
  };

  return (
    <div>
      <Form onSubmit={onChangeHandler}>
        <FormLabel htmlFor="modalText">New Password</FormLabel>
        <div>
          <FormInput type="password" id="password" ref={inputRef} />
        </div>
        <br />
        <BlackButton mode={authCtx.mode}>Change Password</BlackButton>
        <ValidationMsgErr>{error && error}</ValidationMsgErr>
        {success ? (
          <ValidationMsgSuccs>
            The password has been successfully changed
          </ValidationMsgSuccs>
        ) : (
          ""
        )}
      </Form>

      {status === "pending" ? <Spinner /> : ""}
    </div>
  );
}

export default ChangePasswordPage;
