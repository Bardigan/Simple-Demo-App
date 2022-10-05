import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleQuote } from "../lib/api";
import Spinner from "../lib/Spinner";
import useHttp from "../hooks/use-http";
import styled from "styled-components";
import AuthContext from "../context/auth-context";
import { BlackButton, DateLabel } from "../style/Style"

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
  color: ${props => props.mode === 'black' ? 'black' : '#00b17d'};
`;

const Header = styled.header`
  margin-bottom: 10px;
  color: ${props => props.mode === 'black' ? 'black' : '#00b17d'};
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
        <BlackButton mode={authCtx.mode} onClick={() => navigate(`/profile`, { replace: true })}>
          Go Back
        </BlackButton>
        <TaskDetailWrapper>
          <Header mode={authCtx.mode}>{data.text}</Header>

          <TaskStoryWrpr mode={authCtx.mode}>{data.story && data.story}</TaskStoryWrpr>

          <DateLabel mode={authCtx.mode}>{dateStringifiend}</DateLabel>
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
