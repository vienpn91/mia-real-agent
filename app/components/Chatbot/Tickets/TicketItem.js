import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DATE_TIME_FORMAT } from 'utils/constants';
import {
  Icon,
} from 'antd';
import {
  TicketGroup,
  TicketName,
  TicketTime,
  TicketStatus,
} from '../styles';

class TicketItem extends React.PureComponent {
  render() {
    const { ticket = {} } = this.props;
    const {
      title, status, category, createdAt,
    } = ticket;
    const timeFormat = moment(createdAt).format(DATE_TIME_FORMAT.DATE);
    const categoryDisplay = Array.isArray(category) ? category[0] : category;

    return (
      <React.Fragment>
        <TicketGroup>
          <TicketName>{title}</TicketName>
          <TicketStatus status={status}>
            <span>{categoryDisplay}</span>
            <span>-</span>
            <span>{ticket.status}</span>
          </TicketStatus>
        </TicketGroup>
        <TicketTime>
          <span>{timeFormat}</span>
          <Icon type="setting" />
        </TicketTime>

      </React.Fragment>
    );
  }
}

TicketItem.propTypes = {
  ticket: PropTypes.object,
};

export default TicketItem;
