import React, { PureComponent } from 'react';
import {
  Modal, Form, Row,
  Col,
  Popconfirm,
  notification,
} from 'antd';
import { bool, func, string } from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { DefaultButton } from 'components/Generals/General.styled';
import FormInput from '../FormInput/FormInput';
import { ActionBar, DescriptionTextAreaStyled } from './styles';
import { CATEGORY_OPTIONS } from '../../../common/enums';
import LoadingSpin from '../Loading';

const initialValues = {
  title: '',
  description: '',
  category: [],
};

const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Required'),
  description: Yup.string().trim().required('Required'),
  category: Yup.array().of(Yup.string()).required('Required'),
});

export default class CreateTicketForm extends PureComponent {
  state = {
    formHasValue: false,
    popconfirmVisible: false,
  }

  static propTypes = {
    isOpen: bool.isRequired,
    isCreating: bool.isRequired,
    createError: string.isRequired,
    handleCancel: func.isRequired,
    createTicket: func.isRequired,
  }

  componentDidUpdate = (prevProps) => {
    const { isCreating, createError } = this.props;
    if (prevProps.isCreating && !isCreating) {
      if (!createError) {
        notification.success({ message: 'Ticket Created' });
        this.handleCancelConfirm();
      } else {
        notification.error({ message: createError });
      }
    }
  }

  handleCancelConfirm = () => {
    const { handleCancel } = this.props;
    handleCancel();
    this.setState({
      popconfirmVisible: false,
      formHasValue: false,
    });
    this.formik.getFormikContext().resetForm();
  }

  handleCancel = () => {
    const { formHasValue } = this.state;
    if (formHasValue) {
      this.setState({
        popconfirmVisible: true,
      });
    } else {
      this.handleCancelConfirm();
    }
  }

  handlePopconfirmCancel = () => {
    this.setState({
      popconfirmVisible: false,
    });
  }

  handleSubmit = (values) => {
    const { createTicket } = this.props;
    createTicket(values);
  }

  handleChangeValues = () => {
    const { formHasValue } = this.state;
    if (!formHasValue) {
      this.setState({
        formHasValue: true,
      });
    }
  }

  render() {
    const { isOpen, isCreating } = this.props;
    return (
      <Modal
        visible={isOpen}
        onCancel={this.handleCancel}
        footer={[]}
      >
        <LoadingSpin loading={isCreating}>
          <Formik
            ref={(formik) => { this.formik = formik; }}
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                onChange={this.handleChangeValues}
              >
                <Row gutter={32}>
                  <Col sm={24} xs={24}>
                    <FormInput
                      name="title"
                      type="text"
                      label="Title"
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={24} xs={24}>
                    <FormInput
                      name="description"
                      type="textarea"
                      label="Description"
                      style={DescriptionTextAreaStyled}
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <Col sm={24} xs={24}>
                    <FormInput
                      name="category"
                      type="select"
                      mode="multiple"
                      options={CATEGORY_OPTIONS}
                      label="Category"
                    />
                  </Col>
                </Row>
                <Row gutter={32}>
                  <ActionBar>
                    <DefaultButton type="button" cancel onClick={this.handleCancel}>
                      Cancel
                    </DefaultButton>
                    <DefaultButton onClick={handleSubmit}>
                      Submit
                    </DefaultButton>
                  </ActionBar>
                </Row>
              </Form>
            )}
          </Formik>
          <Popconfirm
            title="Are you sure want to cancel your current ticket?"
            visible={this.state.popconfirmVisible}
            onConfirm={this.handleCancelConfirm}
            onCancel={this.handlePopconfirmCancel}
            okText="Yes"
            cancelText="No"
          />
        </LoadingSpin>
      </Modal>
    );
  }
}
