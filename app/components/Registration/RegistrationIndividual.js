import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Form,
} from 'antd';

import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  LoginBtn,
  LoginSpinner,
  LoginErrorMessage,
} from '../../stylesheets/Button.style';
import FormInput from '../FormInput/FormInput';
import { POSITION_OPTIONS } from '../../../common/enums';
import {
  RegistrationTitle, RegistrationWrapper, RegistrationItem,
  InputWrapper, RegistrationFooter, RegistrationFooterText, RegistrationFooterLink,
} from './styles';
import { toI18n } from '../../utils/func-utils';



const initialValues = {
  email: '',
  password: '',
  rePassword: '',
  username: '',
  firstName: '',
  lastName: '',
  company: '',
  position: '',
  dateOfBirth: '',
  address: '',
  phone: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email(toI18n('FORM_INVALID_MAIL')).trim().required(toI18n('FORM_REQUIRED')),
  username: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  password: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  rePassword: Yup.string()
    .oneOf([Yup.ref('password'), null], toI18n('FORM_PASSWORD_MUST_MATCH')).trim().required(toI18n('FORM_REQUIRED')),
  firstName: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  lastName: Yup.string().trim().required(toI18n('FORM_REQUIRED')),
  dateOfBirth: Yup.date().required(toI18n('FORM_REQUIRED')),
  company: Yup.string().trim(),
  position: Yup.string().trim(),
  address: Yup.string().trim(),
  phone: Yup.string().trim(),
});

class Registration extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  handleInputChanged = fieldName => ({ target }) => {
    this.setState({
      [fieldName]: target.value,
    });
  }

  register = (values) => {
    const { username, email, password } = values;
    const { register } = this.props;
    register({
      username, email, password, profile: { ...values },
    });
  }

  renderRegisterBtn = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <LoginBtn>
          <LoginSpinner />
          {toI18n('REGISTER_REGISTERING')}
        </LoginBtn>
      );
    }
    return (
      <LoginBtn
        type="submit"
      >
        {toI18n('REGISTER_REGISTER')}
      </LoginBtn>
    );
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <RegistrationWrapper>
        <RegistrationItem>
          <RegistrationTitle>
            <img className="img" src="/assets/images/logo-small-black.png" alt="logo mia" />
          </RegistrationTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.register}
            className="form-mik-vienpn"
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {/* <ShadowScrollbars autoHide style={scrollStyle}> */} 
                <InputWrapper>
                  <Row gutter={32}>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="username"
                        type="text"
                        label={toI18n('REGISTER_USERNAME')}
                        login={1}
                      />
                    </Col>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="email"
                        type="text"
                        label={toI18n('REGISTER_EMAIL')}
                        login={1}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="firstName"
                        type="text"
                        label={toI18n('REGISTER_INDIVIDUAL_FIRST_NAME')}
                        login={1}
                      />
                    </Col>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="lastName"
                        type="text"
                        label={toI18n('REGISTER_INDIVIDUAL_LAST_NAME')}
                        login={1}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="password"
                        type="password"
                        label={toI18n('REGISTER_PASSWORD')}
                        login={1}
                      />
                    </Col>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="rePassword"
                        type="password"
                        label={toI18n('REGISTER_RE_PASSWORD')}
                        login={1}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="dateOfBirth"
                        type="date"
                        label={toI18n('REGISTER_INDIVIDUAL_DOB')}
                        login={1}
                      />
                    </Col>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="phone"
                        type="text"
                        label={toI18n('REGISTER_INDIVIDUAL_PHONE')}
                        login={1}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="company"
                        type="text"
                        label={toI18n('REGISTER_INDIVIDUAL_COMPANY')}
                        login={1}
                      />
                    </Col>
                    <Col sm={12} xs={24}>
                      <FormInput
                        name="position"
                        type="select"
                        options={POSITION_OPTIONS}
                        label={toI18n('REGISTER_INDIVIDUAL_POSITION')}
                        login={1}
                      />
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col sm={24} xs={24}>
                      <FormInput
                        name="address"
                        type="text"
                        label={toI18n('REGISTER_INDIVIDUAL_ADDRESS')}
                        login={1}
                      />
                    </Col>
                  </Row>

                  <Row gutter={32}>
                    <Col sm={24} xs={24}>
                      {this.renderRegisterBtn()}
                    </Col>
                  </Row>
                  {errorMessage && (
                    <LoginErrorMessage>
                      {errorMessage}
                    </LoginErrorMessage>
                  )}
                </InputWrapper>
                {/* </ShadowScrollbars> */}
              </Form>
            )}
          </Formik>
          <RegistrationFooter>
            <RegistrationFooterText>
              {toI18n('REGISTER_ALREADY_HAD_AN_ACCOUNT')}
            </RegistrationFooterText>
            <RegistrationFooterLink href="/login">
              {toI18n('REGISTER_LOGIN_NOW')}
            </RegistrationFooterLink>
          </RegistrationFooter>
        </RegistrationItem>
      </RegistrationWrapper>
    );
  }
}

export default Registration;
