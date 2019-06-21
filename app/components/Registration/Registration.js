import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Form,
} from 'antd';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  RegistrationWrapper,
  RegistrationCard,
  RegistrationBtn,
  RegistrationFooter,
  RegistrationFooterText,
  RegistrationFooterLink,
  RegistrationSpinner,
  RegistrationErrorMessage,
  RegistrationTitle,
} from './styles';
import FormInput from '../FormInput/FormInput';

const initialValues = {
  email: '',
  password: '',
  username: '',
  firstName: '',
  lastName: '',
  company: '',
  position: '',
  dateOfBirth: '',
  address: '',
  phone: '',
};

const positionOptions = [
  {
    label: 'IT',
    value: 'IT',
  },
  {
    label: 'CEO',
    value: 'CEO',
  },
  {
    label: 'John Wick',
    value: 'John Wick',
  },
];

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').trim().required('Required'),
  username: Yup.string().trim().required('Required'),
  password: Yup.string().trim().required('Required'),
  firstName: Yup.string().trim().required('Required'),
  lastName: Yup.string().trim().required('Required'),
  dateOfBirth: Yup.date().required('Required'),
  company: Yup.string().trim().required('Required'),
  position: Yup.string().trim().required('Required'),
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
        <RegistrationBtn>
          <RegistrationSpinner />
          Registering
        </RegistrationBtn>
      );
    }
    return (
      <RegistrationBtn
        type="submit"
      >
        Register
      </RegistrationBtn>
    );
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <RegistrationWrapper>
        <RegistrationCard>
          <RegistrationTitle>Mia Consult</RegistrationTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.register}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Row gutter={32}>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="username"
                      type="text"
                      label="Username"
                    />
                  </Col>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="password"
                      type="password"
                      label="Password"
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="firstName"
                      type="text"
                      label="First name"
                    />
                  </Col>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="lastName"
                      type="text"
                      label="Last name"
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="email"
                      type="text"
                      label="Email"
                    />
                  </Col>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="dateOfBirth"
                      type="text"
                      label="Date of birth"
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="company"
                      type="text"
                      label="Company"
                    />
                  </Col>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="position"
                      type="select"
                      options={positionOptions}
                      label="Position"
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="address"
                      type="text"
                      label="Address"
                    />
                  </Col>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="phone"
                      type="text"
                      label="Phone No."
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={24} xs={24}>
                    {this.renderRegisterBtn()}
                  </Col>
                </Row>
                {errorMessage && (
                  <RegistrationErrorMessage>
                    {errorMessage}
                  </RegistrationErrorMessage>
                )}
              </Form>
            )}
          </Formik>
          <RegistrationFooter>
            <RegistrationFooterText>Already had an account?</RegistrationFooterText>
            <RegistrationFooterLink href="/login">
              Login now!
            </RegistrationFooterLink>
          </RegistrationFooter>
        </RegistrationCard>
      </RegistrationWrapper>
    );
  }
}

export default Registration;
