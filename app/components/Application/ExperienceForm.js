import React, { Component } from 'react';
import {
  Row, Col, Form, Icon, Modal,
} from 'antd';
import { Formik, FieldArray } from 'formik';
import { func } from 'prop-types';
import * as Yup from 'yup';
import FormInput from '../FormInput/FormInput';
import {
  ApplicationBtn, ArrayTagWrapper,
  ArrayAddButton, ArrayInputWrapper,
} from './styles';
import { POSITION_OPTIONS } from '../../../common/enums';

const experienceInititalValues = {
  title: '',
  company: '',
  location: '',
  from: '',
  to: '',
  isWorking: false,
  roleDescription: '',
};

const initialValues = {
  categories: [],
  workExperiences: [],
};


const experienceValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Required'),
  company: Yup.string().trim().required('Required'),
  location: Yup.string().trim(),
  from: Yup.date().required('Required').max(Yup.ref('to'), 'From cannot exceed To'),
  to: Yup.date().required('Required').min(Yup.ref('from'), 'To cannot lower Form'),
  isWorking: Yup.boolean(),
  roleDescription: Yup.string().trim(),
});

const validationSchema = Yup.object().shape({
  categories: Yup.array().of(Yup.string()).required('Required'),
  workExperiences: Yup.array().of(Yup.object().shape({
    title: Yup.string().trim().required('Required'),
    company: Yup.string().trim().required('Required'),
    location: Yup.string().trim(),
    from: Yup.date().required('Required').max(Yup.ref('to'), 'From cannot exceed To'),
    to: Yup.date().required('Required').min(Yup.ref('from'), 'To cannot lower Form'),
    isWorking: Yup.boolean(),
    roleDescription: Yup.string().trim(),
  })),
});

export class ExperienceForm extends Component {
  state = {
    isExperienceFormOpen: false,
    editIndex: -1,
  }

  static propTypes = {
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
  }

  handleToggleExperienceModal = (isOpen, editExperience = experienceInititalValues, editIndex = -1) => {
    this.setState({
      isExperienceFormOpen: isOpen,
      editIndex,
    });
    const { experienceformik } = this;
    if (isOpen && experienceformik) {
      experienceformik.getFormikContext().setValues(editExperience);
    }
    if (!isOpen) {
      experienceformik.getFormikContext().resetForm();
    }
  };

  handleAddExperience = (experience) => {
    const { editIndex } = this.state;
    const { formik } = this;
    const context = formik.getFormikContext();
    const { values } = context;
    const { workExperiences } = values;
    if (editIndex >= 0) {
      workExperiences[editIndex] = values;
      context.setValues({
        ...values,
        workExperiences,
      });
    } else {
      context.setValues({
        ...values,
        workExperiences: [...workExperiences, experience],
      });
    }
    this.handleToggleExperienceModal(false);
  }

  renderWorkExperienceModal = () => {
    const { isExperienceFormOpen, editIndex } = this.state;
    return (
      <Modal
        visible={isExperienceFormOpen}
        footer={[]}
      >
        <Formik
          ref={(formik) => { this.experienceformik = formik; }}
          initialValues={experienceInititalValues}
          validationSchema={experienceValidationSchema}
          onSubmit={this.handleAddExperience}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={32}>
                <Col sm={8} xs={24}>
                  <FormInput
                    name="title"
                    type="text"
                    label="Title"
                    login={1}
                  />
                </Col>
                <Col sm={8} xs={24}>
                  <FormInput
                    name="company"
                    type="text"
                    label="Company"
                    login={1}
                  />
                </Col>
                <Col sm={8} xs={24}>
                  <FormInput
                    name="location"
                    type="text"
                    label="Location"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="from"
                    type="date"
                    label="From"
                    login={1}
                  />
                </Col>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="to"
                    type="date"
                    label="To"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="isWorking"
                    type="checkbox"
                    label="Is working"
                    login={1}
                  />
                </Col>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="roleDescription"
                    type="text"
                    label="Role description"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={12} xs={24}>
                  <ApplicationBtn
                    type="button"
                    onClick={() => this.handleToggleExperienceModal(false)}
                  >
                    Cancel
                  </ApplicationBtn>
                </Col>
                <Col sm={12} xs={24}>
                  <ApplicationBtn
                    type="submit"
                  >
                    {editIndex >= 0 ? 'Save' : 'Add'}
                  </ApplicationBtn>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal>
    );
  }

  renderWorkExperience = (experience, arrayHelpers, index) => {
    const { title, company } = experience;
    return (
      <ArrayTagWrapper key={index}>
        {`${title} - ${company}`}
        <Icon
          onClick={() => arrayHelpers.remove(index)}
          type="close"
        />
        <Icon
          onClick={() => this.handleToggleExperienceModal(true, experience, index)}
          type="edit"
        />
      </ArrayTagWrapper>
    );
  };


  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  }

  renderRegisterBtn = () => (
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
  )

  handleSubmit = (values) => {
    const { onSubmit } = this.props;
    onSubmit(values);
  }

  render() {
    return (
      <div>
        <Formik
          ref={(formik) => { this.formik = formik; }}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="categories"
                    type="select"
                    mode="multiple"
                    options={POSITION_OPTIONS}
                    label="Category"
                    login={1}
                  />
                </Col>
              </Row>
              <FieldArray
                name="workExperiences"
                render={arrayHelpers => (
                  <ArrayInputWrapper>
                    <p>Experiences:</p>
                    {
                      values.workExperiences.map((
                        experience, index
                      ) => this.renderWorkExperience(experience, arrayHelpers, index))
                    }
                    <ArrayAddButton type="button" onClick={() => this.handleToggleExperienceModal(true)}>
                      Add Experience
                    </ArrayAddButton>
                  </ArrayInputWrapper>
                )}
              />
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  {this.renderRegisterBtn()}
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        {this.renderWorkExperienceModal()}
      </div>
    );
  }
}

export default ExperienceForm;
