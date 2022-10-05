import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Spinner from "../lib/Spinner";
import styled from "styled-components";
import { BlackButton, SimpleButton, BackdropWrpr, FormLabel } from "../style/Style"
import { useContext } from "react";
import AuthContext from "../context/auth-context";

const FormInput = styled.input`
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #cdcdcd;
  width: 60%;
  margin: 10px 0px 10px 0px;
`;

const FormTextArea = styled.textarea`
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #cdcdcd;
  width: 60%;
  margin: 10px 0px 10px 0px;
  height: 80px;
`;

const Form = styled.form`
  background: #f7f7f7;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 30%;
  max-height: 350px;
  border-radius: 10px;
  border: 1px solid #cdcdcd;
  padding: 25px;
  box-shadow: 0px 3px #7e7e7e;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 25vh;
  left: 10%;
  width: 80%;
  z-index: 100;
`;

const ValidationMsgErr = styled.div`
  font-size: 15px;
  color: red;
  margin-top: 10px;
`;

const Backdrop = (props) => {
  return (
    <BackdropWrpr onClick={props.toggleModal}>
      {props.isLoading && <Spinner />}
    </BackdropWrpr>
  );
};

const ModalOverlay = (props) => {
  const authCtx = useContext(AuthContext);
  const [validation, setValidation] = useState(true);
  const modalTextref = useRef();
  const modalTextArearef = useRef();

  const onAddHandler = (event) => {
    event.preventDefault();

    let textLength = modalTextref.current.value.length;

    if (textLength < 4) {
      setValidation(false);
      return;
    }

    props.addNewText({
      text: modalTextref.current.value,
      date: new Date().getTime(),
      story: modalTextArearef.current.value,
    });
    setValidation(true);
  };

  return (
    <ModalWrapper>
      <Form onSubmit={onAddHandler}>
        <FormLabel mode={authCtx.mode} htmlFor="modalText">Add title</FormLabel>
        <div>
          <FormInput type="text" ref={modalTextref}></FormInput>
        </div>
        <FormLabel mode={authCtx.mode} htmlFor="storyText">Add story</FormLabel>
        <div>
          <FormTextArea ref={modalTextArearef}></FormTextArea>
        </div>
        {!validation ? (
          <ValidationMsgErr>Enter at least 4 characters</ValidationMsgErr>
        ) : (
          ""
        )}

        <BlackButton mode={authCtx.mode}>Add</BlackButton>

        <SimpleButton
          mode={authCtx.mode}
          type="button"
          onClick={() => {
            props.toggleModal();
          }}
        >
          Cancel
        </SimpleButton>
      </Form>
    </ModalWrapper>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          isLoading={props.isLoading}
          toggleModal={props.toggleModal}
        />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          addNewText={props.addNewText}
          toggleModal={props.toggleModal}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
