import React, { PureComponent } from 'react';
import Popup from 'components/Popup';
import {
  bool, shape, func,
  string,
} from 'prop-types';

export class AgentAcceptRequest extends PureComponent {
  static propTypes = {
    isOpen: bool.isRequired,
    isConfirming: bool.isRequired,
    requestConfirm: func.isRequired,
    userId: string,
    ticket: shape(),
    history: shape(),
    redirectData: shape(),
  }

  static defaultProps = {
    ticket: null,
    userId: null,
  }

  componentDidUpdate = (prevProps) => {
    const { redirectData, history, isConfirming } = this.props;
    if (!isConfirming && prevProps.isConfirming) {
      const { ticketId, owner, isConfirm } = redirectData;
      if (redirectData && isConfirm) {
        history.push(`/ticket/${ticketId}/${owner}`);
      }
    }
  }

  renderTicketContent = () => {
    const { ticket } = this.props;
    if (!ticket) {
      return (<h2>No Data</h2>);
    }
    const {
      category, title,
      description,
    } = ticket;
    return (
      <div>
        <p>{title}</p>
        <p>{description}</p>
        <p>{category.join(', ')}</p>
      </div>
    );
  }

  handleSubmit = (isConfirm) => {
    const {
      requestConfirm, ticket,
      userId,
    } = this.props;
    const { _id, ticketId, owner } = ticket;
    requestConfirm(userId, _id, isConfirm, { ticketId, owner });
  }

  render() {
    const { isOpen, isConfirming } = this.props;
    if (isOpen) {
      return (
        <Popup
          loading={isConfirming}
          type="New Request"
          content={this.renderTicketContent()}
          onSubmit={() => this.handleSubmit(true)}
          onClose={() => this.handleSubmit(false)}
        />
      );
    }
    return (<div />);
  }
}

export default AgentAcceptRequest;
