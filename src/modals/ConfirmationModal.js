import React from "react";
import ReactDOM from "react-dom";
import Spinner from "../lib/Spinner";
import styled from "styled-components";
import { BlackButton, SimpleButton, BackdropWrpr } from "../style/Style"
import { useContext } from "react";
import AuthContext from "../context/auth-context";

const FormLabel = styled.label`
  padding: 5px;
  display: block;
  font-weight: 300;
  margin-bottom: 15px;
  color: ${props => props.mode === 'black' ? 'black' : '#00b17d'};
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

const Backdrop = (props) => {
  return (
    <BackdropWrpr onClick={props.toggleModal}>
      {props.isLoading && <Spinner />}
    </BackdropWrpr>
  );
};

const ModalOverlay = (props) => {

  const authCtx = useContext(AuthContext);
  const onConfirm = (event) => {
    event.preventDefault();
    props.sendDeleteRequest(props.selectedData);
  };

  return (
    <ModalWrapper>
      <Form onSubmit={onConfirm}>
        <FormLabel mode={authCtx.mode} htmlFor="modalText">Are you sure?</FormLabel>
        <BlackButton mode={authCtx.mode}>
          Yes
        </BlackButton>
        <SimpleButton
          mode={authCtx.mode}
          type="button"
          onClick={() => {
            props.toggleModal();
          }}
        >
          No
        </SimpleButton>
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
