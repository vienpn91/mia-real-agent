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
    const { getTicketActivity } = this.props;
    getTicketActivity();
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
    const { data } = this.props;
    const {
      resolved, pending, processing, closed,
    } = data;
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

  renderInventorySummary = () => (
    <TicketActivityQuantityGroup>
      <TicketActivityQuantityItem>
        <TicketActivityQuantityContent>
          Quantity In Hand
        </TicketActivityQuantityContent>
        <TicketActivityQuantityNumber>
          1000
        </TicketActivityQuantityNumber>
      </TicketActivityQuantityItem>

      <TicketActivityQuantityItem>
        <TicketActivityQuantityContent>
          Quantity To Be Received
        </TicketActivityQuantityContent>
        <TicketActivityQuantityNumber>
          20
        </TicketActivityQuantityNumber>
      </TicketActivityQuantityItem>
    </TicketActivityQuantityGroup>
  );

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
          <TicketActivityTitle>Inventory Summary</TicketActivityTitle>
          {this.renderInventorySummary()}
        </TicketActivityRightItem>
      </TicketActivityWrapper>
    );
  }
}
TicketActivity.propTypes = {
  getTicketActivity: func.isRequired,
  data: shape().isRequired,
};

export default TicketActivity;
