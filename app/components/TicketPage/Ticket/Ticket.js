/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpinnerLoading from 'components/PageLoading';
import TicketItem from './TicketItem/TicketItem';
import { TicketWrapper } from '../Ticket.styles';
import {
  TableContentWrapper,
  TableEmptyContent,
} from '../../TableComponent/TableComponent.styled';

class Ticket extends Component {
  renderTicketItem = (ticket, index) => {
    const { _id } = ticket;
    return <TicketItem key={_id} ticket={ticket} index={index} />;
  };

  renderTicketTableContent = () => {
    const { tickets, fetchingContext } = this.props;
    const { isFetching = false } = fetchingContext;

    if (isFetching) {
      return (
        <TableContentWrapper bgTable>
          <SpinnerLoading />
        </TableContentWrapper>
      );
    }

    const isNoTicket = tickets.length === 0;
    return (
      <TableContentWrapper bgTable>
        {isNoTicket
          ? <TableEmptyContent>No tickets available, click here to create one</TableEmptyContent>
          : tickets.map(this.renderTicketItem)
        }
      </TableContentWrapper>
    );
  }

  render() {
    return (
      <TicketWrapper>
        {this.renderTicketTableContent()}
      </TicketWrapper>
    );
  }
}

Ticket.propTypes = {
  tickets: PropTypes.array,
  fetchingContext: PropTypes.object,
};

export default Ticket;
