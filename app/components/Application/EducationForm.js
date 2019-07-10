import React, { Component } from 'react';
import {
  Row, Col, Form,
} from 'antd';
import { Formik } from 'formik';
import { func } from 'prop-types';
import FormInput from '../FormInput/FormInput';
import { ApplicationBtn, ApplicationSpinner } from './styles';

export class EducationForm extends Component {
  state = {
    eductions: [],
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
            type="button"
            onClick={this.handleCancel}
          >
            Back
          </ApplicationBtn>
        </Col>
        <Col sm={12} xs={24}>
          <ApplicationBtn
            type="submit"
          >
            Next
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
                  name="education"
                  type="text"
                  label="Username"
                  login={1}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="password"
                  type="password"
                  label="Password"
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

export default EducationForm;
