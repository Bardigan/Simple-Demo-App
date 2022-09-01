import React from "react";
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

const FormLabel = styled.label`
  padding: 5px;
  display: block;
  font-weight: 300;
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

const Backdrop = (props) => {
  return (
    <BackdropWrpr onClick={props.toggleModal}>
      {props.isLoading && <Spinner />}
    </BackdropWrpr>
  );
};

const ModalOverlay = (props) => {
  const onConfirm = (event) => {
    event.preventDefault();
    props.sendDeleteRequest(props.selectedData);
  };

  return (
    <ModalWrapper>
      <Form onSubmit={onConfirm}>
        <FormLabel htmlFor="modalText">Are you sure?</FormLabel>
        <FormButtonBlack>
          Yes
        </FormButtonBlack>
        <FormButtonSimple
          type="button"
          onClick={() => {
            props.toggleModal();
          }}
        >
          No
        </FormButtonSimple>
      </Form>
    </ModalWrapper>
  );
};

const ConfirmationModal = (props) => {
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
          sendDeleteRequest={props.sendDeleteRequest}
          selectedData={props.selectedData}
          addNewText={props.addNewText}
          toggleModal={props.toggleModal}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ConfirmationModal;
