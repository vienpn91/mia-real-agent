import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginWrapper = styled.div`
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

export const TemplateLoginPage = styled.div`
  width: ${props => props.theme.widthSite.widthLoginPage};
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  box-shadow: ${props => props.theme.boxShandow.loginPage};
  padding: 2em;
  color: ${props => props.theme.colorStyled.ColorDarkGrey};
  position: relative;
  z-index: 1;
`;

export const LogoSite = styled.div`
  text-align: center;
  font-size: 2em;
  width: 6.125em;
  height: 4.063em;
  margin: 0 auto 1em;
  color: ${props => props.theme.colorStyled.ColorBlack};
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const LoginBtn = styled.button`
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

export const LoginFBBtn = styled(LoginBtn)`
  border: 1px solid #3b5998;
  background: #3b5998;
  color: ${props => props.theme.secondaryColor};
  i {
    font-size: 16px;
    margin-right: 5px;
  }
  &:hover {
    background: ${props => props.theme.secondaryColor};
    color: #3b5998;
  }
`;

export const LoginFooter = styled.div`
  margin-top: 15px;
  text-align: center;
  div{
    margin-top: 10px;
  }
`;

export const LoginFooterText = styled.span`
`;

export const LoginFooterLink = styled(Link)`
  margin-left: 3px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    color: #1872bb;
  }
`;

const spin = keyframes`
  100% {
    transform:rotate(360deg);
  }
`;

export const LoginSpinner = styled.div`
  border: 2px solid;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border-color:black black black transparent;
  animation: ${spin} 2s linear infinite;
  margin-right: 5px;
  display: inline-block;
`;

export const LoginErrorMessage = styled.div`
  color: crimson;
  text-align: center;
  margin-bottom: 15px;
`;
