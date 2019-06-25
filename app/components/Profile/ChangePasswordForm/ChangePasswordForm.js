import React, { PureComponent } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Modal, Row, Col,
  Form, Button,
} from 'antd';
import { func, bool } from 'prop-types';
import FormInput from '../../FormInput/FormInput';
import { ActionBar } from '../styles';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().trim().required('Required'),
  newPassword: Yup.string().trim().required('Required'),
  confirmNewPassword: Yup.string().trim().required('Required')
    .oneOf([Yup.ref('newPassword'), null], 'Confirm password not match'),
});

export default class ChangePasswordForm extends PureComponent {
  static propTypes = {
    handleCancel: func.isRequired,
    handleSubmit: func.isRequired,
    isOpen: bool.isRequired,
  }

  handleSubmit = (values) => {
    const { handleSubmit } = this.props;
    const { currentPassword, newPassword } = values;
    handleSubmit(currentPassword, newPassword);
  }

  handleCancel = () => {
    const { handleCancel } = this.props;
    handleCancel();
  }

  render() {
    const { isOpen } = this.props;
    return (
      <Modal
        visible={isOpen}
        onCancel={this.handleCancel}
        footer={[]}
      >
        <Formik
          validationSchema={validationSchema}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="currentPassword"
                    type="text"
                    label="Current Password"
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="newPassword"
                    type="text"
                    label="New Password"
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="confirmNewPassword"
                    type="text"
                    label="Confirm new Password"
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <ActionBar>
                  <Button type="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button key="back" onClick={this.handleCancel}>
                    Return
                  </Button>
                </ActionBar>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal>
    );
  }
}
