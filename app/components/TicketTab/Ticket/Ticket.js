/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpinnerLoading from 'components/PageLoading';
import ShadowScrollbars from 'components/Scrollbar';
import TicketItem from './TicketItem/TicketItem';
import { TicketWrapper } from '../TicketTab.styles';
import {
  TableContentWrapper,
  TableEmptyContent,
} from '../../TableComponent/TableComponent.styled';

const scrollStyle = {
  height: '100%',
  width: '100%',
};

class Ticket extends Component {
  renderTicketItem = (ticket, index) => {
    const { conversationList } = this.props;
    const { _id } = ticket;

    return (
      <TicketItem
        key={_id}
        ticket={ticket}
        index={index}
        // eslint-disable-next-line no-underscore-dangle
        conversation={conversationList[_id]}
      />
    );
  };

  renderTicketTableContent = () => {
    const { ticketList, fetchingContext } = this.props;
    const { isFetching = false } = fetchingContext;

    if (isFetching) {
      return (
        <TableContentWrapper bgTable>
          <SpinnerLoading />
        </TableContentWrapper>
      );
    }

    const isNoTicket = ticketList.length === 0;
    return (
      <ShadowScrollbars
        autoHide
        style={scrollStyle}
      >
        <TableContentWrapper bgTable>

          {isNoTicket
            ? (
              <TableEmptyContent>
                No ticketList available, click here to create one
              </TableEmptyContent>
            )
            : ticketList.map(this.renderTicketItem)
          }
        </TableContentWrapper>
      </ShadowScrollbars>
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
  ticketList: PropTypes.array,
  fetchingContext: PropTypes.object,
  conversationList: PropTypes.objectOf(PropTypes.any),
};

export default Ticket;
