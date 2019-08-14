import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Steps, Tabs, Icon,
  notification,
} from 'antd';
import ShadowScrollbars from 'components/Scrollbar';
import { func, bool, string } from 'prop-types';
import {
  ApplicationWrapper, ApplicationItem,
  ApplicationTitle, RoleWrapper,
  SubmitSuccess,
} from './styles';
import BasicInfoForm from './BasicInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import AdditionalForm from './AdditionalForm';
import LoadingSpin from '../Loading';
import { APPLICATION_TYPE } from '../../../common/enums';

const { Step } = Steps;
const { TabPane } = Tabs;

const scrollStyle = {
  height: 'calc(100vh - 275px)',
  margin: '0 -20px 0 -10px',
};

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
              onClick={() => this.handleNextStep(APPLICATION_TYPE.FREELANCER)}
            >
              <div>
                <Icon type="user" />
                Freelancer
              </div>
            </button>
            <button
              type="button"
              onClick={() => this.handleNextStep(APPLICATION_TYPE.DEDICATED)}
            >
              <div>
                <Icon type="usergroup-add" />
                Dedicated
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
          <SubmitSuccess>
            <i className="mia-check" />
            Submit Application Success. Please wait for approval.
            <br />
            <Link to="/login">To Login</Link>
          </SubmitSuccess>
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
          {step !== 5
            && (
              <Steps current={step}>
                <Step title="Role" />
                <Step title="Basic Info" />
                <Step title="Experience" />
                <Step title="Education" />
                <Step title="Additional" />
              </Steps>
            )}
          <LoadingSpin loading={isSubmitting}>
            <ShadowScrollbars autoHide style={scrollStyle}>
              {this.handleRenderForm()}
            </ShadowScrollbars>
          </LoadingSpin>
        </ApplicationItem>
      </ApplicationWrapper>
    );
  }
}

export default ApplicationForm;
