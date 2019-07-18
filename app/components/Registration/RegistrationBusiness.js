import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'antd';
import ShadowScrollbars from 'components/Scrollbar';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  RegistrationWrapper,
  RegistrationItem,
  RegistrationTitle,
  RegistrationBtn,
  RegistrationFooter,
  RegistrationFooterText,
  RegistrationFooterLink,
  RegistrationSpinner,
  RegistrationErrorMessage,
  InputWrapper,
} from './styles';
import FormInput from '../FormInput/FormInput';
import { FIELD_OPTIONS, SIZE_OPTIONS, ROLES } from '../../../common/enums';

const scrollStyle = {
  height: 'calc(100vh - 300px)',
  margin: '0 -20px 0 -10px',
};

const initialValues = {
  email: '',
  password: '',
  rePassword: '',
  username: '',
  company: '',
  companySize: '',
  companyFields: [],
  address: '',
  phoneNumber: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').trim().required('Required'),
  username: Yup.string().trim().required('Required'),
  password: Yup.string().trim().required('Required'),
  rePassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match').trim().required('Required'),
  company: Yup.string().trim().required('Required'),
  companySize: Yup.string().trim().required('Required'),
  companyFields: Yup.array().of(Yup.string()).required('Required'),
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

  register = (values) => {
    const { register } = this.props;
    register({ ...values, role: ROLES.BUSINESS });
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
        <RegistrationItem>
          <RegistrationTitle>Mia Consult</RegistrationTitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.register}
          >
            {({ handleSubmit }) => (
              <ShadowScrollbars autoHide style={scrollStyle}>

                <Form onSubmit={handleSubmit}>
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
                          name="password"
                          type="password"
                          label="Password"
                          login={1}
                        />
                      </Col>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="rePassword"
                          type="password"
                          label="Re-password"
                          login={1}
                        />
                      </Col>
                    </Row>
                    <Row gutter={32}>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="company"
                          type="text"
                          label="Company name"
                          login={1}
                        />
                      </Col>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="companySize"
                          type="select"
                          options={SIZE_OPTIONS}
                          label="Company size"
                          login={1}
                        />
                      </Col>
                    </Row>
                    <Row gutter={32}>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="companyFields"
                          type="select"
                          mode="multiple"
                          options={FIELD_OPTIONS}
                          label="Working fields"
                          login={1}
                        />
                      </Col>
                      <Col sm={12} xs={24}>
                        <FormInput
                          name="phoneNumber"
                          type="text"
                          label="Phone No."
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
                      <RegistrationErrorMessage>
                        {errorMessage}
                      </RegistrationErrorMessage>
                    )}
                  </InputWrapper>
                </Form>
              </ShadowScrollbars>
            )}
          </Formik>
          <RegistrationFooter>
            <RegistrationFooterText>Already had an account?</RegistrationFooterText>
            <RegistrationFooterLink href="/login">
              Login now!
            </RegistrationFooterLink>
          </RegistrationFooter>
        </RegistrationItem>
      </RegistrationWrapper>
    );
  }
}

export default Registration;
