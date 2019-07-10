import React, { Component } from 'react';
import { Steps, Tabs } from 'antd';
import { ApplicationWrapper, ApplicationItem, ApplicationTitle } from './styles';
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
          <BasicInfoForm onSubmit={this.handleNextStep} onCancel={this.handlePreviousStep} />
        </TabPane>
        <TabPane tab="" key="1">
          <ExperienceForm onSubmit={this.handleNextStep} onCancel={this.handlePreviousStep} />
        </TabPane>
        <TabPane tab="" key="2">
          <EducationForm onSubmit={this.handleNextStep} onCancel={this.handlePreviousStep} />
        </TabPane>
        <TabPane tab="" key="3">
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
