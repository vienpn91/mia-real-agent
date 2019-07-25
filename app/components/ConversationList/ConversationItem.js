import React from 'react';
import moment from 'moment';
import PropTypes, { func } from 'prop-types';
import { DATE_TIME_FORMAT } from 'utils/constants';
import {
  ConversationTime,
} from './ConversationList.styled';

class ConversationItem extends React.PureComponent {
  handleOpenSetting = () => {
    const { openSetting, conversation } = this.props;
    openSetting(conversation);
  }

  render() {
    const {
      conversation,
      number,
    } = this.props;
    const {
      createdAt,
    } = conversation;
    const timeFormat = moment(createdAt).format(DATE_TIME_FORMAT.DATE);
    return (
      <ConversationTime>
        <span>{`Conversation #${number}`}</span>
        <span>{timeFormat}</span>
      </ConversationTime>
    );
  }
}

ConversationItem.propTypes = {
  conversation: PropTypes.object,
  openSetting: func,
  number: PropTypes.number.isRequired,
};

export default ConversationItem;
