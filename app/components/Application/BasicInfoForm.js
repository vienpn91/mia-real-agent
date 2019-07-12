import React, { Component } from 'react';
import {
  Row, Col, Form,
} from 'antd';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { func } from 'prop-types';
import FormInput from '../FormInput/FormInput';
import { ApplicationBtn } from './styles';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  address: '',
  phoneNumber: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('Required'),
  lastName: Yup.string().trim().required('Required'),
  email: Yup.string().email('Invalid Email').trim().required('Required'),
  country: Yup.string().trim().required('Required'),
  address: Yup.string().trim().required('Required'),
  phoneNumber: Yup.string().trim().required('Required'),
});

export class BasicInfoForm extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
  }

  renderRegisterBtn = () => (
    <Row gutter={32}>
      <Col sm={12} xs={24}>
        <ApplicationBtn
          type="button"
          onClick={this.handleCancel}
        >
          <i className="mia-chevron-left" />
          Back
        </ApplicationBtn>
      </Col>
      <Col sm={12} xs={24}>
        <ApplicationBtn
          type="submit"
          submit
        >
          Next
          <i className="mia-chevron-right" />
        </ApplicationBtn>
      </Col>
    </Row>
  )

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  }

  handleSubmit = (values) => {
    const { onSubmit } = this.props;
    onSubmit(values);
  }

  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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
                  name="email"
                  type="text"
                  label="Email"
                  login={1}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="country"
                  type="text"
                  label="Country"
                  login={1}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="address"
                  type="text"
                  label="Address"
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
                {this.renderRegisterBtn()}
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

export default BasicInfoForm;
