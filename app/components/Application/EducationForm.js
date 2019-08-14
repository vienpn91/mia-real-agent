import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import {
  Row, Col, Form, Icon, Modal,
} from 'antd';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { func } from 'prop-types';
import FormInput from '../FormInput/FormInput';
import {
  ApplicationBtnWrap,
  ApplicationBtn, ArrayTagWrapper,
  ArrayInputWrapper, ArrayAddButton, TagAction, DescriptionWrapper, DescriptionNumber, ArrayWrapper,
} from './styles';
import { POSITION_OPTIONS, FIELD_OF_STUDY } from '../../../common/enums';

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
  certificate: Yup.string().trim().required('Required'),
  fieldOfStudies: Yup.array().of(Yup.string()),
  gpa: Yup.number().min(0).max(5),
});

const validationSchema = Yup.object().shape({
  educations: Yup.array().of(educationValidationSchema),
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

  handleAddExperience = (experience) => {
    const { editIndex } = this.state;
    const { formik } = this;
    const context = formik.getFormikContext();
    const { educations } = context.values;
    if (editIndex >= 0) {
      educations[editIndex] = experience;
      context.setValues({
        educations,
      });
    } else {
      context.setValues({
        educations: [...educations, experience],
      });
    }
    this.handleToggleEducationModal(false);
  }

  renderEducationModal = () => {
    const { isEducationFormOpen, editIndex } = this.state;
    return (
      <Modal
        visible={isEducationFormOpen}
        onClick={() => this.handleToggleEducationModal(false)}
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
                <Col sm={24} xs={24}>
                  <FormInput
                    name="school"
                    type="text"
                    label="School"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="degree"
                    type="text"
                    label="Degree"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="fieldOfStudies"
                    type="select"
                    mode="multiple"
                    options={FIELD_OF_STUDY}
                    label="Field of studies"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="gpa"
                    type="text"
                    label="GPA (5 based)"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="certificate"
                    type="text"
                    label="Certificate"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <ApplicationBtnWrap>
                  <ApplicationBtn
                    type="button"
                    onClick={() => this.handleToggleEducationModal(false)}
                  >
                    Cancel
                  </ApplicationBtn>
                  <ApplicationBtn
                    type="submit"
                    submit
                  >
                    {editIndex >= 0 ? 'Save' : 'Add'}
                  </ApplicationBtn>
                </ApplicationBtnWrap>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal>
    );
  }

  renderEducation = (education, arrayHelpers, index) => {
    const {
      school, degree, gpa, certificate, fieldOfStudies
    } = education;
    return (
      <ArrayTagWrapper key={index}>
        <div className="WorkEducation">
          <div className="WorkEducationText">
            <h2>
              {school}
              <span>{degree}</span>
            </h2>
            <div className="GPA">
              {fieldOfStudies.join(', ')}
              <DescriptionNumber>
                <span>GPA :</span>
                {' '}
                {gpa}
              </DescriptionNumber>
            </div>
            <div>
              {!_isEmpty(certificate) && (
                <a href={certificate}>{certificate}</a>
              )}
            </div>
          </div>
          <div>
            <TagAction>
              <Icon
                onClick={() => this.handleToggleEducationModal(true, education, index)}
                type="edit"
              />
              <Icon
                onClick={() => arrayHelpers.remove(index)}
                type="close"
              />
            </TagAction>
          </div>
        </div>
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
                  <FieldArray
                    name="educations"
                    render={arrayHelpers => (
                      <ArrayInputWrapper>
                        <p>Educations:</p>
                        <ArrayAddButton type="button" onClick={() => this.handleToggleEducationModal(true)}>
                          <i className="mia-add" />
                          Add Education
                        </ArrayAddButton>
                        <ArrayWrapper>
                          {
                            values.educations.map((
                              education, index
                            ) => this.renderEducation(education, arrayHelpers, index))
                          }
                        </ArrayWrapper>
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
