import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import {
  Form, Row, Col,
  Button,
} from 'antd';
import { shape, func } from 'prop-types';
import FormInput from '../../../FormInput/FormInput';
import { SIZE_OPTIONS, FIELD_OPTIONS } from '../../../../../common/enums';

export default class ProfileFormBusiness extends PureComponent {
  static propTypes = {
    initialValues: shape().isRequired,
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
  }

  render() {
    const { initialValues, onSubmit, onCancel } = this.props;
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="companySize"
                  type="select"
                  options={SIZE_OPTIONS}
                  label="companySize"
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="companyFields"
                  type="select"
                  mode="multiple"
                  options={FIELD_OPTIONS}
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
                  name="phone"
                  type="text"
                  label="Phone No."
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Button key="back" onClick={onCancel}>
                Return
              </Button>
              <Button key="submit" type="primary" onClick={handleSubmit}>
                Save
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}
