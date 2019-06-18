import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'antd';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  RegistrationWrapper,
  RegistrationCard,
  RegistrationTitle,
  RegistrationBtn,
  RegistrationFooter,
  RegistrationFooterText,
  RegistrationFooterLink,
  RegistrationSpinner,
  RegistrationErrorMessage,
} from './styles';
import FormInput from '../FormInput/FormInput';

const initialValues = {
  email: '',
  password: '',
  username: '',
  companyName: '',
  companySize: '',
  workingFields: [],
  address: '',
  phoneNumber: '',
};

const sizeOptions = [
  {
    label: 'Self-employed',
    value: 'A',
  },
  {
    label: '1-10 employees',
    value: 'B',
  },
  {
    label: '11-50 employees',
    value: 'C',
  },
  {
    label: '51-200 employees',
    value: 'D',
  },
  {
    label: '201-500 employees',
    value: 'E',
  },
  {
    label: '501-1000 employees',
    value: 'F',
  },
  {
    label: '1001-5000 employees',
    value: 'G',
  },
  {
    label: '5001-10,000 employees',
    value: 'H',
  },
  {
    label: '10,001+ employees',
    value: 'I',
  },
];

const fieldOptions = [
  {
    label: 'IT',
    value: 'IT',
  },
  {
    label: 'Consultant',
    value: 'Consultant',
  },
  {
    label: 'Accounting',
    value: 'Accounting',
  },
];

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').trim().required('Required'),
  username: Yup.string().trim().required('Required'),
  password: Yup.string().trim().required('Required'),
  companyName: Yup.string().trim().required('Required'),
  companySize: Yup.string().trim().required('Required'),
  workingFields: Yup.array().of(Yup.string()).required('Required'),
  address: Yup.string().trim(),
  phoneNumber: Yup.string().trim(),
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

  register = () => {
    const { email, password } = this.state;
    const { register } = this.props;
    register(email, password);
  }

  renderRegisterBtn = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <RegistrationBtn>
          <RegistrationSpinner />
          Registering business
        </RegistrationBtn>
      );
    }
    return (
      <RegistrationBtn
        onClick={this.register}
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
                      name="email"
                      type="text"
                      label="Email"
                    />
                  </Col>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="companyName"
                      type="text"
                      label="Company name"
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="companySize"
                      type="select"
                      options={sizeOptions}
                      label="companySize"
                    />
                  </Col>
                  <Col sm={12} xs={24}>
                    <FormInput
                      name="workingFields"
                      type="select"
                      mode="multiple"
                      options={fieldOptions}
                      label="Working fields"
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
                      name="phoneNumber"
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
