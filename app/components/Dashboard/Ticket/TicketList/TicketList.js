import React, { PureComponent } from 'react';
import { arrayOf, shape, number, func } from 'prop-types';
import TicketItem from '../TicketItem/TicketItem';

export default class TicketList extends PureComponent {
  static propTypes = {
    list: arrayOf(shape()).isRequired,
    current: number.isRequired,
    handleSelectTicket: func.isRequired,
  }

  render() {
    const { list, current, handleSelectTicket } = this.props;
    return (
      <div>
        {list.slice((current - 1) * 5, current * 5).map(
          ticket => <TicketItem handleSelectTicket={handleSelectTicket} key={ticket.title} ticket={ticket} />
        )}
      </div>
    );
  }
}
