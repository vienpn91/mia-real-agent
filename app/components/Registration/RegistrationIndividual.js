import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Form,
} from 'antd';
import ShadowScrollbars from 'components/Scrollbar';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  LoginBtn,
  LoginFooter,
  LoginFooterText,
  LoginFooterLink,
  LoginSpinner,
  LoginErrorMessage,
} from '../Login/styles';
import FormInput from '../FormInput/FormInput';
import { POSITION_OPTIONS } from '../../../common/enums';
import {
  RegistrationTitle, RegistrationWrapper, RegistrationItem,
  InputWrapper,
} from './styles';

const scrollStyle = {
  height: 'calc(100vh - 300px)',
  margin: '0 -20px 0 -10px',
};

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
  email: Yup.string().email('Invalid Email').trim().required('Required'),
  username: Yup.string().trim().required('Required'),
  password: Yup.string().trim().required('Required'),
  rePassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match').trim().required('Required'),
  firstName: Yup.string().trim().required('Required'),
  lastName: Yup.string().trim().required('Required'),
  dateOfBirth: Yup.date().required('Required'),
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
          Registering
        </LoginBtn>
      );
    }
    return (
      <LoginBtn
        type="submit"
      >
        Register
      </LoginBtn>
    );
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <RegistrationWrapper>
        <RegistrationItem>
          <RegistrationTitle>Mia Consult</RegistrationTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.register}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <ShadowScrollbars autoHide style={scrollStyle}>
                  <InputWrapper>
                    <Row gutter={32}>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="username"
                          type="text"
                          label="Username"
                          login={1}
                        />
                      </Col>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="email"
                          type="text"
                          label="Email"
                          login={1}
                        />
                      </Col>
                    </Row>
                    <Row gutter={32}>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="firstName"
                          type="text"
                          label="First name"
                          login={1}
                        />
                      </Col>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="lastName"
                          type="text"
                          label="Last name"
                          login={1}
                        />
                      </Col>
                    </Row>
                    <Row gutter={32}>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="password"
                          type="password"
                          label="Password"
                          login={1}
                        />
                      </Col>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="rePassword"
                          type="text"
                          label="Re-password"
                          login={1}
                        />
                      </Col>
                    </Row>
                    <Row gutter={32}>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="dateOfBirth"
                          type="date"
                          label="Date of birth"
                          login={1}
                        />
                      </Col>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="phone"
                          type="text"
                          label="Phone No."
                          login={1}
                        />
                      </Col>
                    </Row>
                    <Row gutter={32}>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="company"
                          type="text"
                          label="Company"
                          login={1}
                        />
                      </Col>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="position"
                          type="select"
                          options={POSITION_OPTIONS}
                          label="Position"
                          login={1}
                        />
                      </Col>
                    </Row>
                    <Row gutter={32}>
                      <Col sm={24} xs={24}>
                        <FormInput
                          name="address"
                          type="text"
                          label="Address"
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
                </ShadowScrollbars>
              </Form>
            )}
          </Formik>
          <LoginFooter>
            <LoginFooterText>Already had an account?</LoginFooterText>
            <LoginFooterLink href="/login">
              Login now!
            </LoginFooterLink>
          </LoginFooter>
        </RegistrationItem>
      </RegistrationWrapper>
    );
  }
}

export default Registration;
