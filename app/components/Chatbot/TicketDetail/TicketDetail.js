import React, { Component } from 'react';
import ShadowScrollbars from 'components/Scrollbar';
import { Avatar, List } from 'antd';
import {
  TicketDetailWrapper,
  TicketDetailAvatar,
  TicketInfoWrapper,
} from '../styles';

const scrollStyle = {
  height: 'calc(100vh - 165px)',
  width: '100%',
};

const data = [
  'Minh Tri',
  'Project Manager',
  'trinm@zigvy.com',
  '0907176585',
  '38/6k Nguyen Van Troi',
];

export default class TicketDetail extends Component {
  renderTicketInfo = () => (
    <TicketInfoWrapper>
      <List
        size="large"
        dataSource={data}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </TicketInfoWrapper>
  );

  render() {
    return (
      <ShadowScrollbars autoHide style={scrollStyle}>
        <TicketDetailWrapper>
          <TicketDetailAvatar>
            <Avatar
              src="http://www.tripwiremagazine.co.uk/wp-content/uploads/2017/02/John-wick-poster-featured-image.jpg"
              size={120}
            />
          </TicketDetailAvatar>
          {this.renderTicketInfo()}
        </TicketDetailWrapper>
      </ShadowScrollbars>
    );
  }
}
