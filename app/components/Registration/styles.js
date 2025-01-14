import styled, { keyframes } from 'styled-components';
import { Input } from 'antd';

export const RegistrationWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-height: 736px) {
    height: 100%;
  }
`;

export const RegistrationCard = styled.div`
  width: 720px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 3px 10px 3px #e7e7e7;
  padding: 50px;
  color: #000;
`;

export const RegistrationTitle = styled.div`
  text-align: center;
  font-size: 32px;
  font-family: Countryside, sans-serif;
  margin-bottom: 55px;
`;

export const RegistrationInputWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 30px;
`;

export const RegistrationInput = styled(Input)`
  width: 100% !important;
  height: 27.5px !important;
  border: 0 !important;
  padding: 0 !important;
  outline: 0 none !important;
  -webkit-transition: border-color .2s linear !important;
  transition: border-color .2s linear !important;
  border-bottom: 1px solid #000 !important;
  -webkit-font-smoothing: antialiased !important;
  border-radius: 0 !important;  
  :focus {
    box-shadow: none !important;
  }
`;

export const RegistrationLabel = styled.div`
  margin-bottom: 7.5px;
  color: #000;
`;

export const RegistrationBtn = styled.button`
  height: 40px;
  width: 100%;
  border: 1px solid black;
  border-radius: 5;
  transition: .3s ease;
  background: #fff;
  cursor: pointer;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #000;
    color: #fff;
  }
  &:hover div {
    border-color: white white white transparent !important;
  }
`;


export const RegistrationFooter = styled.div`
  margin-top: 15px;
  text-align: center;
`;

export const RegistrationFooterText = styled.span`
`;

export const RegistrationFooterLink = styled.a`
  margin-left: 3px;
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const spin = keyframes`
  100% {
    transform:rotate(360deg);
  }
`;

export const RegistrationSpinner = styled.div`
  border: 2px solid;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border-color:black black black transparent;
  animation: ${spin} 2s linear infinite;
  margin-right: 5px;
  display: inline-block;
`;

export const RegistrationErrorMessage = styled.div`
  color: crimson;
  text-align: center;
  margin-bottom: 15px;
`;

export const SelectStyled = { width: '100%' };
