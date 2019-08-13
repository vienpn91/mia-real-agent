import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Row, Col, Form, Avatar,
} from 'antd';
import FormInput from '../FormInput/FormInput';
import {
  LoginWrapper,
  LoginItem,
  LoginLogo,
  LoginBtn,
  LoginFBBtn,
  LoginFooter,
  LoginFooterText,
  LoginFooterLink,
  LoginSpinner,
  LoginErrorMessage,
} from './styles';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().trim().required('Required'),
  password: Yup.string().trim().required('Required'),
});

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  static defaultProps = {
    isLoading: false,
    errorMessage: '',
  }

  handleInputChanged = fieldName => ({ target }) => {
    this.setState({
      [fieldName]: target.value,
    });
  }

  login = (values) => {
    const { email, password } = values;
    const { login } = this.props;
    login({ ...values, email, password });
  }

  renderLoginBtn = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <LoginBtn>
          <LoginSpinner />
          Logging in
        </LoginBtn>
      );
    }
    return (
      <LoginBtn
        type="submit"
      >
        Login
      </LoginBtn>
    );
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <LoginWrapper>
        <LoginItem>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.login}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <LoginLogo>
                  <img className="img" src="/assets/images/logo-small-black.png" alt="logo mia" />
                </LoginLogo>
                <Row gutter={32}>
                  <Col>
                    <FormInput
                      type="text"
                      name="usernameOrEmail"
                      label="Username or Email"
                      login={1}
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col>
                    <FormInput
                      type="password"
                      name="password"
                      label="Password"
                      login={1}
                    />
                  </Col>
                </Row>
                {this.renderLoginBtn()}
                {errorMessage && (
                  <LoginErrorMessage>
                    {errorMessage}
                  </LoginErrorMessage>
                )}

              </Form>
            )}
          </Formik>
          <LoginFBBtn href="api/auth/login/facebook">
            <i className="mia-facebook" />
            Login with Facebook
          </LoginFBBtn>
          <LoginFooter>
            <LoginFooterText>Don't have an account?</LoginFooterText>
            <LoginFooterLink href="/register">
              Register now!
            </LoginFooterLink>
          </LoginFooter>
        </LoginItem>
      </LoginWrapper>
    );
  }
}

export default Login;
