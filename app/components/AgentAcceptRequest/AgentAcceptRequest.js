import React, { PureComponent } from 'react';
import Popup from 'components/Popup';
import {
  bool, shape, func,
} from 'prop-types';

export class AgentAcceptRequest extends PureComponent {
  static propTypes = {
    isOpen: bool.isRequired,
    isConfirming: bool.isRequired,
    agentConfirmAction: func.isRequired,
    requestData: shape(),
  }

  static defaultProps = {
    requestData: null,
  }

  renderTicketContent = () => {
    const { requestData } = this.props;
    if (!requestData) {
      return (<h2>No Data</h2>);
    }
    const {
      category = [], title,
      description,
    } = requestData;
    return (
      <div>
        <p>{`Title: ${title}`}</p>
        <p>{`Description: ${description}`}</p>
        <p>{`Categories: ${category.join(', ')}`}</p>
      </div>
    );
  }

  handleSubmit = (isConfirm) => {
    const {
      agentConfirmAction,
      requestData,
    } = this.props;

    agentConfirmAction(requestData.conversationId, requestData._id, isConfirm);
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
