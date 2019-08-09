import React from 'react';
import moment from 'moment';
import PropTypes, { func } from 'prop-types';
import { DATE_TIME_FORMAT } from 'utils/constants';
import { Popover, Icon, Button } from 'antd';
import {
  TicketItemStyled, ActionList, TicketStatus, TicketName,
} from './TicketList.styled';

class TicketItem extends React.PureComponent {
  handleOpenSetting = () => {
    const { openSetting, ticket } = this.props;
    openSetting(ticket);
  }

  handleOnClose = () => {
    const { onClose, ticket } = this.props;
    const { _id } = ticket;
    onClose(_id);
  }

  renderGroupAction = () => (
    <ActionList>
      <Button>Archive</Button>
      <Button onClick={this.handleOnClose}>Close</Button>
      <Button>Report</Button>
    </ActionList>
  )

  render() {
    const {
      ticket,
      number,
    } = this.props;
    const {
      createdAt, title, status,
    } = ticket;
    const timeFormat = moment(createdAt).format(DATE_TIME_FORMAT.DATE);
    return (
      <TicketItemStyled>
        <TicketName>
          <TicketStatus status={status} />
          {title}
          <Popover
            content={this.renderGroupAction()}
            trigger="click"
            placement="bottom"
            onVisibleChange={this.handleVisibleChange}
          >
            <Icon type="setting" />
          </Popover>
          <span>
            {`#${number}`}
          </span>
        </TicketName>
        <p>{timeFormat}</p>
      </TicketItemStyled>
    );
  }
}

TicketItem.propTypes = {
  ticket: PropTypes.object,
  openSetting: func,
  onClose: func,
  number: PropTypes.number.isRequired,
};

export default TicketItem;
