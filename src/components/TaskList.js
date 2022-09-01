import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const QuoteButton = styled.button`
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #dfcaa6;
    background: #fff6e7;
    color:black;
  float: right;
    margin-left: 10px;s

  &:hover {
    opacity: 0.9;
  }
`;

const DateLabel = styled.div`
  font-size: 0.8em;
  margin-top: 5px;
  color: #dfcaa6;
`;

const QuoteWrapper = styled.div`
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

const QuoteTextWrpr = styled.div`
 display: inline-block;
`;


function TaskList(props) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
     {props.loadedQuotes.map((data, index) => {
      var date = new Date(data.date);
      let dateStringifiend = date.toLocaleString();
      return (
        <QuoteWrapper key={index}>

          <QuoteTextWrpr>
            {data.text}
            <DateLabel>{dateStringifiend}</DateLabel>
          </QuoteTextWrpr>

          <QuoteButton
            onClick={() => props.onDeleteHandler(data.id)}
          >
            Delete
          </QuoteButton>

          <QuoteButton
            onClick={() => navigate(`/profile/${data.id}`, { replace: true })}
          >
            Details
          </QuoteButton>

        </QuoteWrapper>
      );
    })}
    </React.Fragment>
  );
}

export default TaskList;