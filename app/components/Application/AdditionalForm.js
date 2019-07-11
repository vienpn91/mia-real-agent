import React, { Component } from 'react';
import {
  Row, Col, Form, Modal, Icon,
} from 'antd';
import { Formik, FieldArray } from 'formik';
import { func } from 'prop-types';
import FormInput from '../FormInput/FormInput';
import { ApplicationBtn, ApplicationSpinner, ArrayTagWrapper, ArrayInputWrapper, ArrayAddButton } from './styles';

const languageInititalValues = {
  name: '',
  writing: 1,
  reading: 1,
  speaking: 1,
  overall: 1,
};

const initialValues = {
  cv: '',
  skills: [],
  languages: [],
  social: {},
};

const marks = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
};


export class AdditionalForm extends Component {
  state = {
    isLanguageFormOpen: false,
    editIndex: -1,
  }

  static propTypes = {
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
  }


  handleToggleEducationModal = (isOpen, editEducation = languageInititalValues, editIndex = -1) => {
    this.setState({
      isLanguageFormOpen: isOpen,
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
    const { languages } = context.values;
    if (editIndex >= 0) {
      languages[editIndex] = values;
      context.setValues({
        languages,
      });
    } else {
      context.setValues({
        languages: [...languages, values],
      });
    }
    this.handleToggleEducationModal(false);
  }

  renderLanguageModal = () => {
    const { isLanguageFormOpen, editIndex } = this.state;
    return (
      <Modal
        visible={isLanguageFormOpen}
        footer={[]}
      >
        <Formik
          ref={(formik) => { this.educationformik = formik; }}
          initialValues={languageInititalValues}
          // validationSchema={validationSchema}
          onSubmit={this.handleAddExperience}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={32}>
                <Col sm={24} xs={24}>
                  <FormInput
                    name="name"
                    type="text"
                    label="Name"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="writing"
                    type="slider"
                    marks={marks}
                    min={1}
                    max={5}
                    label="Writing"
                    login={1}
                  />
                </Col>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="reading"
                    type="slider"
                    marks={marks}
                    min={1}
                    max={5}
                    label="Reading"
                    login={1}
                  />
                </Col>
              </Row>
              <Row gutter={32}>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="speaking"
                    type="slider"
                    marks={marks}
                    min={1}
                    max={5}
                    label="Speaking"
                    login={1}
                  />
                </Col>
                <Col sm={12} xs={24}>
                  <FormInput
                    name="overall"
                    type="slider"
                    marks={marks}
                    min={1}
                    max={5}
                    label="Overall"
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

  renderLanguage = (education, arrayHelpers, index) => {
    const {
      name, writing,
      reading, speaking, overall,
    } = education;
    return (
      <ArrayTagWrapper>
        {`${name} - W(${writing}) R(${reading}) S(${speaking}) O(${overall})`}
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
      <div>
        <Formik
          ref={(formik) => { this.formik = formik; }}
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, values }) => (
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
                <Col sm={24} xs={24}>
                  <FieldArray
                    name="languages"
                    render={arrayHelpers => (
                      <ArrayInputWrapper>
                        <p>Languages:</p>
                        {
                          values.languages.map((
                            language, index
                          ) => this.renderLanguage(language, arrayHelpers, index))
                        }
                        <ArrayAddButton type="button" onClick={() => this.handleToggleEducationModal(true)}>
                          Add language
                        </ArrayAddButton>
                      </ArrayInputWrapper>
                    )}
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
                    name="social"
                    type="text"
                    label="Social"
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
        {this.renderLanguageModal()}
      </div>
    );
  }
}

export default AdditionalForm;
