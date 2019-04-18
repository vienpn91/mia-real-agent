import React from 'react';
import {
  LoginWrapper,
  LoginCard,
  LoginInput,
  LoginLabel,
  LoginInputWrapper,
  LoginTitle,
  LoginBtn,
  LoginFBBtn,
} from './styles';

const Login = () => (
  <LoginWrapper>
    <LoginCard>
      <LoginTitle>Mia Consult</LoginTitle>
      <LoginInputWrapper>
        <LoginLabel>Email</LoginLabel>
        <LoginInput type="email" />
      </LoginInputWrapper>
      <LoginInputWrapper>
        <LoginLabel>Password</LoginLabel>
        <LoginInput type="passport" />
      </LoginInputWrapper>
      <LoginBtn>Login</LoginBtn>
      <LoginFBBtn href="api/auth/login/facebook">
        <i className="icon-facebook" />
        Login with Facebook
      </LoginFBBtn>
    </LoginCard>
  </LoginWrapper>
);

export default Login;
