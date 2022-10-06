import styled from "styled-components";

// Buttons

export const BlackButton = styled.button`
  border: none;
  background: ${props => props.mode === 'black' ? 'black' : '#00b17d'};
  color: white;
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const SimpleButton = styled.button`
  background: none;
  color: ${props => props.mode === 'black' ? 'black' : '#00b17d'};
  margin-top: 15px;
  border: none;
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const QuoteButton = styled.button`
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  border: ${props => props.mode === 'black' ? '1px solid #dfcaa6' : '1px solid #00b17d;'};
    background: ${props => props.mode === 'black' ? '#fff6e7' : '#00b17d'};
    color: ${props => props.mode === 'black' ? 'black' : 'white'};
  float: right;
    margin-left: 10px;
    z-index: 10;

  &:hover {
    opacity: 0.9;
  }
`;

// Navigation Bar

export const NavigationBarInner = styled.div`
  margin-right: 15px;
  button {
    float: right;
  }
`;

export const NavigationBar = styled.div`
  color: white;
  background: ${props => props.mode === 'black' ? 'black' : '#00b17d'};
  width: 100%;
  height: 38px;
`;

// Backdrop

export const BackdropWrpr = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
z-index: 10;
background: rgba(0, 0, 0, 0.75);
color: white;
`;

// Labels

export const DateLabel = styled.div`
font-size: 0.8em;
margin-top: 5px;
color: #dfcaa6;
`;

// Form Elements

export const FormInput = styled.input`
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #cdcdcd;
  width: 60%;
  margin: 10px 0px 10px 0px;
`;

export const FormLabel = styled.label`
  padding: 5px;
  display: block;
  font-weight: 300;
  color: ${props => props.mode === 'black' ? 'black' : '#00b17d'};
`;

export const FormHeader = styled.header`
  padding-bottom: 10px;
  font-size: 25px;
  color: ${props => props.mode === 'black' ? 'black' : '#00b17d'};
`;


