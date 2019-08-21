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
import { toI18n } from '../../utils/func-utils';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  password: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
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
          {toI18n('LOGIN_LOGGING_IN')}
        </LoginBtn>
      );
    }
    return (
      <LoginBtn
        type="submit"
      >
        {toI18n('LOGIN_LOGIN')}
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
                      label={toI18n('LOGIN_USERNAME_OR_EMAIL')}
                      login={1}
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col>
                    <FormInput
                      type="password"
                      name="password"
                      label={toI18n('LOGIN_PASSWORD')}
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
            {toI18n('LOGIN_LOGIN_WITH_FB')}
          </LoginFBBtn>
          <LoginFooter>
            <LoginFooterText>
              {toI18n('LOGIN_DONT_HAVE_AN_ACCOUNT')}
            </LoginFooterText>
            <LoginFooterLink href="/register">
              {toI18n('LOGIN_REGISTER_NOW')}
            </LoginFooterLink>
            <div />
            <LoginFooterText>
              {toI18n('LOGIN_WANT_TO_BE_AN_AGENT')}
            </LoginFooterText>
            <LoginFooterLink href="/application">
              {toI18n('LOGIN_CLICK_HERE')}
            </LoginFooterLink>
          </LoginFooter>
        </LoginItem>
      </LoginWrapper>
    );
  }
}

export default Login;
