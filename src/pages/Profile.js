import { useEffect, useState, useMemo } from "react";
import Modal from "../modals/Modal";
import useHttp from "../hooks/use-http";
import { addQuote, getAllQuotes, deteleQuote } from "../lib/api";
import Spinner from "../lib/Spinner";
import TaskList from "../components/TaskList";
import ConfirmationModal from "../modals/ConfirmationModal";
import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../context/auth-context";

const ButtonNormal = styled.button`
  color: white;
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background: black;

  &:hover {
    opacity: 0.9;
  }
`;

const PageWrapper = styled.div`
  margin: 15px;
`;

function Profile() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token

  const { sendRequest: sendRequestAdd, status: addStatus } = useHttp(addQuote, false, token);
  const {
    sendRequest: sendRequestAll,
    status: allStatus,
    data: loadedQuotes,
  } = useHttp(getAllQuotes, true, token);
  const { sendRequest: sendDeleteRequest, status: deleteStatus } =
    useHttp(deteleQuote, false, token);
  const [modal, setModal] = useState(false);
  const [confirmattionModal, setConfirmattionModal] = useState(false);
  const [selectedData, setSelectedData] = useState("");


  useEffect(() => {
    sendRequestAll();
  }, [sendRequestAll]);

  useEffect(() => {
    if (addStatus === "completed") {
      setModal(false);
      sendRequestAll();
    }
  }, [addStatus, sendRequestAll]);

  useEffect(() => {
    if (deleteStatus === "completed") {
      setConfirmattionModal((prevState) => !prevState);
      sendRequestAll();
    }
  }, [deleteStatus, sendRequestAll]);

  const addNewText = (data) => {
    sendRequestAdd(data);
  };

  const taskListMemo = useMemo(() => {
    const onDeleteHandler = (id) => {
      setConfirmattionModal((prevState) => !prevState);
      setSelectedData(id);
    };
    return (
      <TaskList loadedQuotes={loadedQuotes} onDeleteHandler={onDeleteHandler} />
    );
  }, [loadedQuotes, setConfirmattionModal, setSelectedData]);

  return (
    <PageWrapper>
      {modal && (
        <Modal
          isLoading={addStatus === "pending" ? true : false}
          addNewText={addNewText}
          toggleModal={() => setModal((prevState) => !prevState)}
        />
      )}
      {confirmattionModal === true && selectedData !== "" ? (
        <ConfirmationModal
          sendDeleteRequest={sendDeleteRequest}
          selectedData={selectedData}
          isLoading={deleteStatus === "pending" ? true : false}
          toggleModal={() => setConfirmattionModal((prevState) => !prevState)}
        />
      ) : (
        ""
      )}
      <ButtonNormal onClick={() => setModal((prevState) => !prevState)}>
        Add New +
      </ButtonNormal>
      {allStatus === "pending" ? <Spinner /> : ""}
      <br />
      {loadedQuotes !== null ? taskListMemo : ""}
    </PageWrapper>
  );
}

export default Profile;
