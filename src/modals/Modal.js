import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Spinner from "../lib/Spinner";
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

const BackdropWrpr = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
  color: white;
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
        <FormLabel htmlFor="modalText">Add title</FormLabel>
        <div>
          <FormInput type="text" ref={modalTextref}></FormInput>
        </div>
        <FormLabel htmlFor="storyText">Add story</FormLabel>
        <div>
          <FormTextArea ref={modalTextArearef}></FormTextArea>
        </div>
        {!validation ? (
          <ValidationMsgErr>Enter at least 4 characters</ValidationMsgErr>
        ) : (
          ""
        )}

        <FormButtonBlack>Add</FormButtonBlack>

        <FormButtonSimple
          type="button"
          onClick={() => {
            props.toggleModal();
          }}
        >
          Cancel
        </FormButtonSimple>
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
