import React, { Component } from 'react';
import ShadowScrollbars from 'components/Scrollbar';
import { Descriptions, Timeline, Icon } from 'antd';
import {
  TicketDetailWrapper,
  TicketInfoWrapper,
  TicketTimelineWrapper,
} from '../styles';

const scrollStyle = {
  height: 'calc(100vh - 165px)',
  width: '100%',
};

export default class TicketDetail extends Component {
  renderTicketInfo = () => (
    <TicketInfoWrapper>
      <Descriptions column={4}>
        <Descriptions.Item label="Ticket">This is big issue</Descriptions.Item>
        <Descriptions.Item label="User">Con Luong</Descriptions.Item>
        <Descriptions.Item label="Assigne">Tri Nguyen</Descriptions.Item>
        <Descriptions.Item label="Status">Processing</Descriptions.Item>
      </Descriptions>
    </TicketInfoWrapper>
  );

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
      <ShadowScrollbars autoHide style={scrollStyle}>
        <TicketDetailWrapper>
          {this.renderTicketInfo()}
          {this.renderTicketTimeline()}
        </TicketDetailWrapper>
      </ShadowScrollbars>
    );
  }
}
