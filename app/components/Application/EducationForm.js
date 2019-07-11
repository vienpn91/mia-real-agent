import React, { Component } from 'react';
import {
  Row, Col, Form, Icon, Modal,
} from 'antd';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { func } from 'prop-types';
import FormInput from '../FormInput/FormInput';
import {
  ApplicationBtn, ArrayTagWrapper,
  ArrayInputWrapper, ArrayAddButton,
} from './styles';
import { POSITION_OPTIONS } from '../../../common/enums';

const educationInititalValues = {
  school: '',
  degree: '',
  fieldOfStudies: [],
  gpa: 0,
};

const initialValues = {
  educations: [],
};

const educationValidationSchema = Yup.object().shape({
  school: Yup.string().trim().required('Required'),
  degree: Yup.string().trim().required('Required'),
  fieldOfStudies: Yup.array().of(Yup.string()),
  gpa: Yup.number(),
});

const validationSchema = Yup.object().shape({
  educations: Yup.array().of(Yup.object().shape({
    school: Yup.string().trim().required('Required'),
    degree: Yup.string().trim().required('Required'),
    fieldOfStudies: Yup.array().of(Yup.string()),
    gpa: Yup.number(),
  })),
});
export class EducationForm extends Component {
  state = {
    isEducationFormOpen: false,
    editIndex: -1,
  }

  static propTypes = {
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
  }


  handleToggleEducationModal = (isOpen, editEducation = educationInititalValues, editIndex = -1) => {
    this.setState({
      isEducationFormOpen: isOpen,
      editIndex,
    });
    const { educationformik } = this;
    if (isOpen && educationformik) {
      educationformik.getFormikContext().setValues(editEducation);
    }
    if (!isOpen) {
      educationformik.getFormikContext().resetForm();
    }
  };

  handleAddExperience = (values) => {
    const { editIndex } = this.state;
    const { formik } = this;
    const context = formik.getFormikContext();
    const { educations } = context.values;
    if (editIndex >= 0) {
      educations[editIndex] = values;
      context.setValues({
        educations,
      });
    } else {
      context.setValues({
        educations: [...educations, values],
      });
    }
    this.handleToggleEducationModal(false);
  }

  renderEducationModal = () => {
    const { isEducationFormOpen, editIndex } = this.state;
    return (
      <Modal
        visible={isEducationFormOpen}
        footer={[]}
      >
        <Formik
          ref={(formik) => { this.educationformik = formik; }}
          initialValues={educationInititalValues}
          validationSchema={educationValidationSchema}
          onSubmit={this.handleAddExperience}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={32}>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="school"
                    type="text"
                    label="School"
                    login={1}
                  />
                </Col>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="degree"
                    type="text"
                    label="Degree"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="fieldOfStudies"
                    type="select"
                    mode="multiple"
                    options={POSITION_OPTIONS}
                    label="Field of studies"
                    login={1}
                  />
                </Col>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="gpa"
                    type="number"
                    label="Gpa"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={12} xs={24}>
                  <ApplicationBtn
                    type="button"
                    onClick={() => this.handleToggleEducationModal(false)}
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

  renderEducation = (education, arrayHelpers, index) => {
    const { school, degree } = education;
    return (
      <ArrayTagWrapper>
        {`${school} - ${degree}`}
        <Icon
          onClick={() => arrayHelpers.remove(index)}
          type="close"
        />
        <Icon
          onClick={() => this.handleToggleEducationModal(true, education, index)}
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

  handleSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit();
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
                  <FieldArray
                    name="educations"
                    render={arrayHelpers => (
                      <ArrayInputWrapper>
                        <p>Educations:</p>
                        {
                          values.educations.map((
                            education, index
                          ) => this.renderEducation(education, arrayHelpers, index))
                        }
                        <ArrayAddButton type="button" onClick={() => this.handleToggleEducationModal(true)}>
                          Add Education
                        </ArrayAddButton>
                      </ArrayInputWrapper>
                    )}
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
        {this.renderEducationModal()}
      </div>
    );
  }
}

export default EducationForm;
