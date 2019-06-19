import React, { PureComponent } from 'react';
import { shape, func } from 'prop-types';
import { TicketWrapper, TitleStyled } from './styles';

export default class TicketItem extends PureComponent {
  static propTypes = {
    ticket: shape().isRequired,
    handleSelectTicket: func.isRequired,
  }

  handleSelect = () => {
    const { handleSelectTicket, ticket } = this.props;
    handleSelectTicket(ticket);
  }

  render() {
    const { ticket } = this.props;
    return (
      <TicketWrapper onClick={this.handleSelect}>
        <TitleStyled>{ticket.title}</TitleStyled>
      </TicketWrapper>
    );
  }
}
