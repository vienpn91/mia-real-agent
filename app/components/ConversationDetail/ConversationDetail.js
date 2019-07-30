import React, { Component } from 'react';
import ShadowScrollbars from 'components/Scrollbar';
import { Descriptions, Timeline, Icon } from 'antd';
import { shape } from 'prop-types';
import {
  ConversationDetailWrapper,
  ConversationInfoWrapper,
  ConversationTimelineWrapper,
  ChatbotConversationDetailWrapper,
} from './styles';
import { ROLES } from '../../../common/enums';

const scrollStyle = {
  height: 'calc(100vh - 60px)',
  width: '100%',
};

export default class ConversationDetail extends Component {
  static propTypes = {
    ticket: shape().isRequired,
  }

  renderOwnerInfo = () => {
    const { ticket } = this.props;
    const { owner, ownerProfile } = ticket;
    if (!owner) {
      return 'No Owner';
    }
    if (!ownerProfile) {
      return 'No Profile';
    }
    const { role, profile = {} } = ownerProfile;
    const { firstName, lastName, company = 'N/A' } = profile;
    switch (role) {
      case ROLES.INDIVIDUAL:
        return `${firstName} ${lastName} - ${company}`;
      case ROLES.BUSINESS:
        return company;
      default: return `Owner "${owner}" role not valid`;
    }
  }

  renderAssigneeInfo = () => {
    const { ticket } = this.props;
    const { assignee, assigneeProfile } = ticket;
    if (!assignee) {
      return 'No Assignee';
    }
    if (!assigneeProfile) {
      return 'No Profile';
    }
    const { firstName, lastName, company } = assigneeProfile;
    return `${firstName} ${lastName} - ${company}`;
  }

  renderConversationInfo = () => {
    const { ticket } = this.props;
    if (!ticket) {
      return (
        <ConversationInfoWrapper>
          <Descriptions column={4}>
            No ticket data
          </Descriptions>
        </ConversationInfoWrapper>
      );
    }
    const {
      title, description, status,
    } = ticket;
    return (
      <ConversationInfoWrapper>
        <Descriptions column={5}>
          <Descriptions.Item label="Ticket">{title}</Descriptions.Item>
          <Descriptions.Item label="Description">{description}</Descriptions.Item>
          <Descriptions.Item label="Owner">{this.renderOwnerInfo()}</Descriptions.Item>
          <Descriptions.Item label="Assigne">{this.renderAssigneeInfo()}</Descriptions.Item>
          <Descriptions.Item label="Status">{status}</Descriptions.Item>
        </Descriptions>
      </ConversationInfoWrapper>
    );
  }

  renderConversationTimeline = () => (
    <ConversationTimelineWrapper>
      <Timeline>
        <Timeline.Item dot={<Icon type="check-circle" style={{ fontSize: '16px' }} />} color="green">
          Con Luong opened 3 minutes ago
        </Timeline.Item>
        <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />} color="red">
          The status changed to Processing
        </Timeline.Item>
        <Timeline.Item dot={<Icon type="exclamation-circle" style={{ fontSize: '16px' }} />} color="blue">
          Con Luong assigned Tri Nguyen
        </Timeline.Item>
      </Timeline>
    </ConversationTimelineWrapper>
  )

  render() {
    return (
      <ChatbotConversationDetailWrapper>
        <ShadowScrollbars autoHide style={scrollStyle}>
          <ConversationDetailWrapper>
            {this.renderConversationInfo()}
            {this.renderConversationTimeline()}
          </ConversationDetailWrapper>
        </ShadowScrollbars>
      </ChatbotConversationDetailWrapper>
    );
  }
}
