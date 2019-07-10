import styled, { keyframes } from 'styled-components';
import { Input } from 'antd';

export const ApplicationWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/images/bg-login.jpg');
  background-position: left center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ApplicationItem = styled.div`
  width: 720px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.secondaryColor};
  box-shadow: 0px 0px 12px -2px #2a3a51;
  padding: 50px;
  color: #6e6c83fa;
  position: relative;
  z-index: 1;
  .ant-tabs-nav-wrap{
    display: none;
  }
`;

export const ApplicationTitle = styled.div`
  text-align: center;
  font-size: 32px;
  font-family: Countryside, sans-serif;
  margin-bottom: 55px;
`;

export const ApplicationInputWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 30px;
`;

export const ApplicationInput = styled(Input)`
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

export const ApplicationLabel = styled.div`
  margin-bottom: 7.5px;
  color: ${props => props.theme.textColor};
`;

export const ApplicationBtn = styled.button`
  height: 50px;
  width: 100%;
  border-radius: 50px;
  border: 1px solid ${props => props.theme.textColor};
  transition: .3s ease;
  background: ${props => props.theme.textColor};
  color: ${props => props.theme.secondaryColor};
  cursor: pointer;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.textColor};
  }
`;


export const ApplicationFooter = styled.div`
  margin-top: 15px;
  text-align: center;
`;

export const ApplicationFooterText = styled.span`
`;

export const ApplicationFooterLink = styled.a`
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

export const ApplicationSpinner = styled.div`
  border: 2px solid;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border-color:black black black transparent;
  animation: ${spin} 2s linear infinite;
  margin-right: 5px;
  display: inline-block;
`;

export const ApplicationErrorMessage = styled.div`
  color: crimson;
  text-align: center;
  margin-bottom: 15px;
`;

export const SelectStyled = { width: '100%' };
