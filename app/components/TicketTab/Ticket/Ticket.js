/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import SpinnerLoading from 'components/PageLoading';
import ShadowScrollbars from 'components/Scrollbar';
import TicketItem from './TicketItem/TicketItem';
import { TicketWrapper } from '../TicketTab.styles';
import {
  TableContentWrapper,
  TableEmptyContent,
} from '../../TableComponent/TableComponent.styled';
import { ROLES } from '../../../../common/enums';

const scrollStyle = {
  height: '100%',
  width: '100%',
};

class Ticket extends Component {
  static propTypes = {
    userRole: string.isRequired,
  }

  renderTicketItem = (ticket, index) => {
    const { userRole } = this.props;
    const { _id } = ticket;
    return <TicketItem isRealAgent={userRole === ROLES.AGENT} key={_id} ticket={ticket} index={index} />;
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
      <ShadowScrollbars
        autoHide
        style={scrollStyle}
      >
        <TableContentWrapper bgTable>

          {isNoTicket
            ? <TableEmptyContent>No tickets available, click here to create one</TableEmptyContent>
            : tickets.map(this.renderTicketItem)
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
  tickets: PropTypes.array,
  fetchingContext: PropTypes.object,
};

export default Ticket;
