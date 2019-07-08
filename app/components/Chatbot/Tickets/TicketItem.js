import React from 'react';
import moment from 'moment';
import PropTypes, { func, string } from 'prop-types';
import { DATE_TIME_FORMAT } from 'utils/constants';
import {
  Icon, Menu,
} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import {
  TicketGroup,
  TicketName,
  TicketTime,
  TicketStatus,
} from '../styles';
import { MenuStyled } from './styles';
import { ROLES } from '../../../../common/enums';

class TicketItem extends React.PureComponent {
  handleOpenSetting = () => {
    const { openSetting, ticket } = this.props;
    openSetting(ticket);
  }

  render() {
    const { ticket = {}, userRole, onRemove } = this.props;
    const {
      title, status, category, createdAt,
    } = ticket;
    const timeFormat = moment(createdAt).format(DATE_TIME_FORMAT.DATE);
    const categoryDisplay = Array.isArray(category) ? category[0] : category;
    return (
      <React.Fragment>
        <TicketGroup>
          <TicketName>{title}</TicketName>
          <TicketStatus status={status}>
            <span>{categoryDisplay}</span>
            <span>-</span>
            <span>{ticket.status}</span>
          </TicketStatus>
        </TicketGroup>
        <TicketTime>
          <span>{timeFormat}</span>
          <MenuStyled>
            <SubMenu
              title={
                <Icon type="setting" />
              }
            >
              {userRole === ROLES.AGENT
                ? (<Menu.Item key="Archive">Archive</Menu.Item>)
                : [
                  (<Menu.Item key="Edit" onClick={this.handleOpenSetting}>Edit</Menu.Item>),
                  (<Menu.Item key="Remove" onClick={onRemove}>Remove</Menu.Item>),
                ]
              }
            </SubMenu>
          </MenuStyled>
        </TicketTime>

      </React.Fragment>
    );
  }
}

TicketItem.propTypes = {
  ticket: PropTypes.object,
  openSetting: func.isRequired,
  onRemove: func.isRequired,
  userRole: string.isRequired,
};

export default TicketItem;
