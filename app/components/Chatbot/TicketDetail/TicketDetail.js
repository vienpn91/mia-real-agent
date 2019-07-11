import React, { Component } from 'react';
import ShadowScrollbars from 'components/Scrollbar';
import { Descriptions, Timeline, Icon } from 'antd';
import { shape } from 'prop-types';
import {
  TicketDetailWrapper,
  TicketInfoWrapper,
  TicketTimelineWrapper,
  ChatbotTicketDetailWrapper,
} from '../Chatbot.styled';
import { ROLES } from '../../../../common/enums';

const scrollStyle = {
  height: 'calc(100vh - 60px)',
  width: '100%',
};

export default class TicketDetail extends Component {
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
      default: return 'No Role found';
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

  renderTicketInfo = () => {
    const { ticket } = this.props;
    if (!ticket) {
      return (
        <TicketInfoWrapper>
          <Descriptions column={4}>
            No ticketData
          </Descriptions>
        </TicketInfoWrapper>
      );
    }
    const {
      title, description,
    } = ticket;
    return (
      <TicketInfoWrapper>
        <Descriptions column={5}>
          <Descriptions.Item label="Ticket">{title}</Descriptions.Item>
          <Descriptions.Item label="Description">{description}</Descriptions.Item>
          <Descriptions.Item label="Owner">{this.renderOwnerInfo()}</Descriptions.Item>
          <Descriptions.Item label="Assigne">{this.renderAssigneeInfo()}</Descriptions.Item>
          <Descriptions.Item label="Status">Processing</Descriptions.Item>
        </Descriptions>
      </TicketInfoWrapper>
    );
  }

  renderTicketTimeline = () => (
    <TicketTimelineWrapper>
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
    </TicketTimelineWrapper>
  )

  render() {
    return (
      <ChatbotTicketDetailWrapper>
        <ShadowScrollbars autoHide style={scrollStyle}>
          <TicketDetailWrapper>
            {this.renderTicketInfo()}
            {this.renderTicketTimeline()}
          </TicketDetailWrapper>
        </ShadowScrollbars>
      </ChatbotTicketDetailWrapper>
    );
  }
}
