import React, { PureComponent } from 'react';
import {
  Modal, Form, Row,
  Col,
  Popconfirm,
  notification,
} from 'antd';
import {
  bool, func,
  string, shape,
} from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import FormInput from '../../FormInput/FormInput';
import { ActionBar } from './styles';
import { CATEGORY_OPTIONS } from '../../../../common/enums';
import LoadingSpin from '../../Loading';
import { DefaultButton } from '../../Generals/general.styles';

const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Required'),
  description: Yup.string().trim().required('Required'),
  category: Yup.array().of(Yup.string()).required('Required'),
});

export default class EditTicketForm extends PureComponent {
  state = {
    formHasValue: false,
    popconfirmVisible: false,
  }

  static propTypes = {
    isOpen: bool.isRequired,
    isUpdating: bool.isRequired,
    updateError: string.isRequired,
    handleCancel: func.isRequired,
    updateTicket: func.isRequired,
    ticket: shape(),
  }

  componentDidUpdate = (prevProps) => {
    const { isUpdating, updateError } = this.props;
    if (prevProps.isUpdating && !isUpdating) {
      if (!updateError) {
        notification.success({ message: 'Ticket Updated' });
        this.handleCancelConfirm();
      } else {
        notification.error({ message: updateError });
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
    const { updateTicket } = this.props;
    updateTicket(values);
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
    const { isOpen, isUpdating, ticket } = this.props;
    if (!ticket) {
      return (
        <Modal
          visible={isOpen}
          onCancel={this.handleCancel}
          footer={[]}
        >
          No Data for ticket
        </Modal>
      );
    }
    return (
      <Modal
        visible={isOpen}
        onCancel={this.handleCancel}
        footer={[]}
      >
        <LoadingSpin loading={isUpdating}>
          <Formik
            ref={(formik) => { this.formik = formik; }}
            validationSchema={validationSchema}
            initialValues={ticket}
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
                      type="text"
                      label="Description"
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
                    <DefaultButton cancel onClick={this.handleCancel}>
                      Cancel
                    </DefaultButton>
                    <DefaultButton submit onClick={handleSubmit}>
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
