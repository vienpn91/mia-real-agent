import React, { Component } from 'react';
import {
  Steps, Tabs, Icon,
  notification,
} from 'antd';
import { func, bool, string } from 'prop-types';
import {
  ApplicationWrapper, ApplicationItem,
  ApplicationTitle, RoleWrapper,
} from './styles';
import BasicInfoForm from './BasicInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import AdditionalForm from './AdditionalForm';
import LoadingSpin from '../Loading';

const { Step } = Steps;
const { TabPane } = Tabs;

export class ApplicationForm extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    isSubmitting: bool.isRequired,
    submitError: string.isRequired,
  }

  state = {
    step: 0,
    role: '',
    basicData: null,
    experienceData: null,
    educationData: null,
  }

  componentDidUpdate = (prevProps) => {
    const { isSubmitting, submitError } = this.props;
    if (prevProps.isSubmitting && !isSubmitting) {
      if (submitError) {
        notification.error({ message: submitError });
      } else {
        this.setState({
          step: 5,
        });
      }
    }
  }

  handleNextStep = (data) => {
    const { step } = this.state;
    switch (step) {
      case 0:
        this.setState({
          role: data,
        });
        break;
      case 1:
        this.setState({
          basicData: data,
        });
        break;
      case 2:
        this.setState({
          experienceData: data,
        });
        break;
      case 3:
        this.setState({
          educationData: data,
        });
        break;
      default: break;
    }
    this.setState({
      step: step + 1,
    });
  }

  handlePreviousStep = () => {
    const { step } = this.state;

    this.setState({
      step: step - 1,
    });
  }

  handleSubmit = (values) => {
    const {
      role, basicData,
      experienceData, educationData,
    } = this.state;
    const { onSubmit } = this.props;
    const data = {
      role,
      ...basicData,
      ...experienceData,
      ...educationData,
      ...values,
    };
    onSubmit(data);
  }

  handleRenderForm = () => {
    const { step } = this.state;
    return (
      <Tabs activeKey={step.toString()}>
        <TabPane tab="" key="0">
          <RoleWrapper>
            <button
              type="button"
              onClick={() => this.handleNextStep('freelancer')}
            >
              <div>
                <Icon type="user" />
                Freelancer
              </div>
            </button>
            <button
              type="button"
              onClick={() => this.handleNextStep('fullTime')}
            >
              <div>
                <Icon type="usergroup-add" />
                Full-time
              </div>
            </button>
          </RoleWrapper>
        </TabPane>
        <TabPane tab="" key="1">
          <BasicInfoForm onSubmit={this.handleNextStep} onCancel={this.handlePreviousStep} />
        </TabPane>
        <TabPane tab="" key="2">
          <ExperienceForm onSubmit={this.handleNextStep} onCancel={this.handlePreviousStep} />
        </TabPane>
        <TabPane tab="" key="3">
          <EducationForm onSubmit={this.handleNextStep} onCancel={this.handlePreviousStep} />
        </TabPane>
        <TabPane tab="" key="4">
          <AdditionalForm onSubmit={this.handleSubmit} onCancel={this.handlePreviousStep} />
        </TabPane>
        <TabPane tab="" key="5">
          <h2>
            Submit Application Success
          </h2>
        </TabPane>
      </Tabs>
    );
  }

  render() {
    const { isSubmitting } = this.props;
    const { step } = this.state;
    return (
      <ApplicationWrapper>
        <ApplicationItem>
          <ApplicationTitle>Mia Consult</ApplicationTitle>
          <Steps current={step}>
            <Step title="Role" />
            <Step title="Basic Info" />
            <Step title="Experience" />
            <Step title="Education" />
            <Step title="Additional" />
          </Steps>
          <br />
          <LoadingSpin loading={isSubmitting}>
            {this.handleRenderForm()}
          </LoadingSpin>
        </ApplicationItem>
      </ApplicationWrapper>
    );
  }
}

export default ApplicationForm;
