import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { QuoteButton, DateLabel } from "../style/Style"
import { AiFillDelete, AiOutlineInfoCircle } from 'react-icons/ai';

const QuoteWrapper = styled.div`
  padding: 30px;
  font-weight: 400;
  border-radius: 10px;
  color: black;
  margin: 15px 0px 15px 0px;
  background: white;
  border: 1px solid #dfcaa6;
`;

const QuoteTextWrpr = styled.div`
 display: inline-block;
 color: ${props => props.mode === 'black' ? 'black' : '#00b17d'};
`;


function TaskList(props) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
     {props.loadedQuotes.map((data, index) => {
      var date = new Date(data.date);
      let dateStringifiend = date.toLocaleString();
      return (
        <QuoteWrapper key={index}>
          
          <QuoteTextWrpr mode={authCtx.mode}>
            {data.text}
            <DateLabel mode={authCtx.mode}>{dateStringifiend}</DateLabel>
          </QuoteTextWrpr>

          <QuoteButton
            mode={authCtx.mode}
            onClick={() => props.onDeleteHandler(data.id)}
          >

            <AiFillDelete />
          </QuoteButton>

          <QuoteButton
            mode={authCtx.mode}
            onClick={() => navigate(`/profile/${data.id}`, { replace: true })}
          >
           <AiOutlineInfoCircle />
          </QuoteButton>

        </QuoteWrapper>
      );
    })}
    </React.Fragment>
  );
}

export default TaskList;