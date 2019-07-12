import React from 'react';
import moment from 'moment';
import PropTypes, { func, string } from 'prop-types';
import { DATE_TIME_FORMAT } from 'utils/constants';
import {
  Icon, Menu,
} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import {
  ConversationGroup,
  ConversationName,
  ConversationTime,
  ConversationStatus,
} from '../Chatbot.styled';
import { MenuStyled } from './ConversationList.styled';
import { ROLES } from '../../../../common/enums';

class ConversationItem extends React.PureComponent {
  handleOpenSetting = () => {
    const { openSetting, ticket } = this.props;
    openSetting(ticket);
  }

  render() {
    const {
      ticket = {}, userRole,
      onArchive,
    } = this.props;
    const {
      title, status, category, createdAt,
    } = ticket;
    const timeFormat = moment(createdAt).format(DATE_TIME_FORMAT.DATE);
    const categoryDisplay = Array.isArray(category) ? category[0] : category;
    return (
      <React.Fragment>
        <ConversationGroup>
          <ConversationName>{title}</ConversationName>
          <ConversationStatus status={status}>
            <span>{categoryDisplay}</span>
            <span>-</span>
            <span>{ticket.status}</span>
          </ConversationStatus>
        </ConversationGroup>
        <ConversationTime>
          <span>{timeFormat}</span>
          {!(userRole === ROLES.AGENT) && (
            <MenuStyled>
              <SubMenu
                title={
                  <Icon type="setting" />
                }
              >
                <Menu.Item key="Archive" onClick={onArchive}>Archive</Menu.Item>
                <Menu.Item key="Edit" onClick={this.handleOpenSetting}>Edit</Menu.Item>
              </SubMenu>
            </MenuStyled>
          )}
        </ConversationTime>

      </React.Fragment>
    );
  }
}

ConversationItem.propTypes = {
  ticket: PropTypes.object,
  openSetting: func,
  onArchive: func.isRequired,
  userRole: string.isRequired,
};

export default ConversationItem;
