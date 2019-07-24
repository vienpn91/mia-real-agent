import React, { Component } from 'react';
import { func, shape } from 'prop-types';
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
  TicketActivityQuantityGroup,
  TicketActivityQuantityItem,
  TicketActivityQuantityContent,
  TicketActivityQuantityNumber,
} from './TicketActivity.styled';

class TicketActivity extends Component {
  componentDidMount = () => {
    const { getTicketActivity, getApplicationSummary } = this.props;
    getTicketActivity();
    getApplicationSummary();
  }

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

  renderInventorySummary = () => {
    const { applicationSummary } = this.props;
    const { pending = 0, reviewing = 0 } = applicationSummary;
    return (
      <TicketActivityQuantityGroup>
        <TicketActivityQuantityItem>
          <TicketActivityQuantityContent>
            Waiting for review
          </TicketActivityQuantityContent>
          <TicketActivityQuantityNumber>
            {pending}
          </TicketActivityQuantityNumber>
        </TicketActivityQuantityItem>

        <TicketActivityQuantityItem>
          <TicketActivityQuantityContent>
            Reviewing
          </TicketActivityQuantityContent>
          <TicketActivityQuantityNumber>
            {reviewing}
          </TicketActivityQuantityNumber>
        </TicketActivityQuantityItem>
      </TicketActivityQuantityGroup>
    );
  }

  render() {
    return (
      <TicketActivityWrapper>
        <TicketActivityLeftItem>
          <TicketActivityTitle>
            Tickets Activity
            {/* <TimeSelect
              items={TIME_FILTER}
              timeSelected={timeSelected}
              selectTime={this.selectTime}
              datePickerPlacement={PLACEMENT.LEFT}
            /> */}
          </TicketActivityTitle>
          {this.renderTicketActivitySummary()}
        </TicketActivityLeftItem>
        <TicketActivityRightItem>
          <TicketActivityTitle>Applications Summary</TicketActivityTitle>
          {this.renderInventorySummary()}
        </TicketActivityRightItem>
      </TicketActivityWrapper>
    );
  }
}
TicketActivity.propTypes = {
  getTicketActivity: func.isRequired,
  ticketActivity: shape().isRequired,
  getApplicationSummary: func.isRequired,
  applicationSummary: shape().isRequired,
};

export default TicketActivity;
