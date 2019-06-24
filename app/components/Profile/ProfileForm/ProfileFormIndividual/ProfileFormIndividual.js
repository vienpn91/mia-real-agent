import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import {
  Form, Row, Col,
  Button,
} from 'antd';
import { shape, func } from 'prop-types';
import FormInput from '../../../FormInput/FormInput';
import { POSITION_OPTIONS } from '../../../../../common/enums';

export class ProfileFormIndividual extends PureComponent {
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
                  name="dateOfBirth"
                  type="date"
                  label="Date of birth"
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="position"
                  type="select"
                  options={POSITION_OPTIONS}
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

export default ProfileFormIndividual;
