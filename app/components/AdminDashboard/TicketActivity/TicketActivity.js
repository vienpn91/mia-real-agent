/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { shape } from 'prop-types';
import {
  TicketActivityWrapper,
  TicketActivityLeftItem,
  TicketActivityRightItem,
  TicketActivityTitle,
  TicketActivityGroupItem,
  TicketActivityItem,
  TicketActivityNumber,
  TicketActivityUnit,
  TicketActivityPurpose,
} from './TicketActivity.styled';
import TicketDetailStatistic from './TicketDetailStatistic';


class TicketActivity extends Component {
  renderActivityItem = (value) => {
    const {
      number, unit, color, title,
    } = value;
    return (
      <TicketActivityItem>
        <TicketActivityNumber color={color}>{number}</TicketActivityNumber>
        <TicketActivityUnit>{unit}</TicketActivityUnit>
        <TicketActivityPurpose>{title}</TicketActivityPurpose>
      </TicketActivityItem>
    );
  };

  renderTicketActivitySummary = () => {
    const { ticketActivity } = this.props;
    const {
      resolved = 0, pending = 0, processing = 0, closed = 0,
    } = ticketActivity;
    return (
      <TicketActivityGroupItem>
        {this.renderActivityItem({
          number: resolved,
          unit: 'Qty',
          color: '#1093de',
          title: 'Tickets Resolved',
        })}
        {this.renderActivityItem({
          number: pending,
          unit: 'Qty',
          color: '#db3f26',
          title: 'Tickets Pending',
        })}
        {this.renderActivityItem({
          number: processing,
          unit: 'Qty',
          color: '#388a10',
          title: 'Tickets Processing',
        })}
        {this.renderActivityItem({
          number: closed,
          unit: 'Qty',
          color: '#f4a204',
          title: 'Tickets Closed',
        })}
      </TicketActivityGroupItem>
    );
  }

  render() {
    const { ticketActivity } = this.props;
    return (
      <TicketActivityWrapper>
        <TicketActivityLeftItem>
          <TicketActivityTitle>
            Tickets Activity
          </TicketActivityTitle>
          {this.renderTicketActivitySummary()}
        </TicketActivityLeftItem>
        <TicketActivityRightItem>
          <TicketActivityTitle>Tickets Detail</TicketActivityTitle>
          <TicketDetailStatistic ticketActivity={ticketActivity} />
        </TicketActivityRightItem>
      </TicketActivityWrapper>
    );
  }
}
TicketActivity.propTypes = {
  ticketActivity: shape().isRequired,
};

export default TicketActivity;
