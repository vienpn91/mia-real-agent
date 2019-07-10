import React, { Component } from 'react';
import {
  Row, Col, Form,
} from 'antd';
import { Formik } from 'formik';
import { func } from 'prop-types';
import FormInput from '../FormInput/FormInput';
import { ApplicationBtn, ApplicationSpinner } from './styles';

export class AdditionalForm extends Component {
  state = {
    skills: [],
    languages: [],
  }

  static propTypes = {
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  }

  renderRegisterBtn = () => {
    // const { isLoading } = this.props;
    // if (isLoading) {
    //   return (
    //     <ApplicationBtn>
    //       <ApplicationSpinner />
    //       Registering business
    //     </ApplicationBtn>
    //   );
    // }
    return (
      <Row gutter={32}>
        <Col sm={12} xs={24}>
          <ApplicationBtn
            onClick={this.handleCancel}
            type="button"
          >
            Back
          </ApplicationBtn>
        </Col>
        <Col sm={12} xs={24}>
          <ApplicationBtn
            type="submit"
          >
            Submit
          </ApplicationBtn>
        </Col>
      </Row>
    );
  }

  handleSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit();
  }

  render() {
    return (
      <Formik
        // initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="cv"
                  type="text"
                  label="Cv"
                  login={1}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="skills"
                  type="password"
                  label="Password"
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
                  name="company"
                  type="text"
                  label="Company name"
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

export default AdditionalForm;
