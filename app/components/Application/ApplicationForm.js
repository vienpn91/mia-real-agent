import React, { Component } from 'react';
import { Steps, Tabs, Icon } from 'antd';
import {
  ApplicationWrapper, ApplicationItem,
  ApplicationTitle, RoleWrapper,
} from './styles';
import BasicInfoForm from './BasicInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import AdditionalForm from './AdditionalForm';

const { Step } = Steps;
const { TabPane } = Tabs;

export class ApplicationForm extends Component {
  state = {
    step: 0,
  }

  handleNextStep = () => {
    const { step } = this.state;

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

  handleRenderForm = () => {
    const { step } = this.state;
    return (
      <Tabs activeKey={step.toString()}>
        <TabPane tab="" key="0">
          <RoleWrapper>
            <button
              type="button"
              onClick={this.handleNextStep}
            >
              <div>
                <Icon type="user" />
                Freelancer
              </div>
            </button>
            <button
              type="button"
              onClick={this.handleNextStep}
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
          <AdditionalForm onSubmit={this.handleNextStep} onCancel={this.handlePreviousStep} />
        </TabPane>
      </Tabs>
    );
  }

  render() {
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
          {this.handleRenderForm()}
        </ApplicationItem>
      </ApplicationWrapper>
    );
  }
}

export default ApplicationForm;
