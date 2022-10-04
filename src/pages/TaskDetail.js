import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleQuote } from "../lib/api";
import Spinner from "../lib/Spinner";
import useHttp from "../hooks/use-http";
import styled from "styled-components";
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

const DateLabel = styled.div`
  font-size: 0.8em;
  margin-top: 5px;
  color: #dfcaa6;
`;

const PageWrapper = styled.div`
  margin: 15px;
`;

const TaskDetailWrapper = styled.div`
  padding: 30px;
  font-weight: 400;
  border-radius: 10px;
  color: black;
  margin: 15px 0px 15px 0px;
  background: white;
  border: 1px solid #dfcaa6;

  &:hover {
    opacity: 0.9;
  }
`;

const TaskStoryWrpr = styled.div`
  display: inline-block;
  font-size: 0.9em;
`;

const Header = styled.header`
  margin-bottom: 10px;
`;

function TaskDetail() {
  let { taskId } = useParams();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token

  const {
    sendRequest: sendRequestOne,
    status: oneStatus,
    data,
  } = useHttp(getSingleQuote, true, token);

  useEffect(() => {
    sendRequestOne(taskId);
  }, [sendRequestOne, taskId]);

  const printTheData = () => {
    var date = new Date(data.date);
    let dateStringifiend = date.toLocaleString();
    return (
      <PageWrapper>
        <ButtonNormal onClick={() => navigate(`/profile`, { replace: true })}>
          Go Back
        </ButtonNormal>
        <TaskDetailWrapper>
          <Header>{data.text}</Header>

          <TaskStoryWrpr>{data.story && data.story}</TaskStoryWrpr>

          <DateLabel>{dateStringifiend}</DateLabel>
        </TaskDetailWrapper>
      </PageWrapper>
    );
  };

  return (
    <div>
      {data && printTheData()}
      {oneStatus === "pending" ? <Spinner /> : ""}
    </div>
  );
}

export default TaskDetail;
