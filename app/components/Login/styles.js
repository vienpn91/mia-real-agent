import styled, { css, keyframes } from 'styled-components';

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
  position: relative;
  &:before {
    position: absolute;
    content: '';
    top: 0px;
    lefT: 0px;
    width: 100%;
    height: 100%;
    background-color: #0202024a;
    z-index: 0;
  }
`;

export const LoginItem = styled.div`
  width: 420px;
  display: flex;
  flex-direction: column;
  background-color: #ffffffe0;
  box-shadow: 0px 0px 12px -2px #2a3a51;;
  padding: 50px;
  color: #6e6c83fa;
  position: relative;
  z-index: 1;
  ${({ register }) => register && css`
    width: 640px;
  `};
`;

export const LoginTitle = styled.div`
  text-align: center;
  font-size: 32px;
  font-family: Countryside, sans-serif;
  margin-bottom: 55px;
  color: #000;
`;

export const LoginInputWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 55px;
`;

export const LoginInput = styled.input`
  width: 100%;
  height: 27.5px;
  border: 0;
  outline: 0 none;
  transition: border-color .2s linear;
  border-bottom: 1px solid #000;
  -webkit-font-smoothing: antialiased;
  background-color: transparent;
`;

export const LoginLabel = styled.div`
  margin-bottom: 5px;
  color: #000;
`;

export const LoginBtn = styled.button`
  height: 50px;
  width: 100%;
  border-radius: 50px;
  border: 1px solid #000;
  transition: .3s ease;
  background: #000;
  color: #fff;
  cursor: pointer;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #fff;
    color: #000;
  }
`;

export const LoginFBBtn = styled(LoginBtn)`
  border: 1px solid #3b5998;
  background: #3b5998;
  color: #fff;
  i {
    font-size: 16px;
    margin-right: 5px;
  }
  &:hover {
    background: #fff;
    color: #3b5998;
  }
`;

export const LoginFooter = styled.div`
  margin-top: 15px;
  text-align: center;
`;

export const LoginFooterText = styled.span`
`;

export const LoginFooterLink = styled.a`
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
