import React from 'react';
import moment from 'moment';
import PropTypes, { func } from 'prop-types';
import { DATE_TIME_FORMAT } from 'utils/constants';
import { Popover, Icon, Button } from 'antd';
import {
  ConversationTime,
} from './ConversationList.styled';

class ConversationItem extends React.PureComponent {
  handleOpenSetting = () => {
    const { openSetting, conversation } = this.props;
    openSetting(conversation);
  }

  renderGroupAction = () => (
    <div>
      <Button>Remove</Button>
      <Button>Archive</Button>
      <Button>Mark as</Button>
      <Button>Rate</Button>
    </div>
  )

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
        <Popover
          content={this.renderGroupAction()}
          title="More action"
          trigger="click"
          placement="bottom"
          onVisibleChange={this.handleVisibleChange}
        >
          <Icon type="setting" />
        </Popover>
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
