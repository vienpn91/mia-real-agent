/* eslint-disable default-case */
import React, { Component } from 'react';
import moment from 'moment';
import { object, number } from 'prop-types';
import { Icon } from 'antd';
import {
  DashboardTitle,
  DashboardStatus,
  DashboardRightBlock,
  DashboardSubTitle,
  DashboardLinkTitle,
  DashboardSubActivity,
} from 'components/Activity/Activity.styled';
import {
  TableContentItem,
} from '../../../TableComponent/TableComponent.styled';
import { TableContent } from '../../../TableComponent/TableComponent';
import { columnSizeContent } from '../ColumnSize';

class TicketItem extends Component {
  static propTypes = {
    ticket: object.isRequired,
    index: number,
  }

  renderSubtitle = () => {
    const { ticket } = this.props;
    const {
      ticketId,
      createdAt,
    } = ticket;
    const timeFromNow = moment(createdAt).fromNow();

    return (
      <DashboardSubActivity>
        {`#${ticketId} opened ${timeFromNow}`}
      </DashboardSubActivity>
    );
  }

  renderTicketContent = () => {
    const { ticket } = this.props;
    const { ticketId } = ticket;

    return (
      <DashboardTitle>
        <DashboardRightBlock>
          <DashboardSubTitle>
            <DashboardLinkTitle to={`/ticket/${ticketId}`}>
              {ticket.title}
            </DashboardLinkTitle>
          </DashboardSubTitle>
          {this.renderSubtitle()}
        </DashboardRightBlock>
      </DashboardTitle>
    );
  }

  renderTicketStatus = () => (
    <DashboardStatus>
      <Icon twoToneColor="#28a745" type="exclamation-circle" theme="twoTone" />
    </DashboardStatus>
  )


  render() {
    const { index } = this.props;
    return (
      <TableContentItem key={index}>
        <TableContent {...columnSizeContent[0]}>
          {this.renderTicketStatus()}
        </TableContent>
        <TableContent {...columnSizeContent[1]}>
          {this.renderTicketContent()}
        </TableContent>
      </TableContentItem>
    );
  }
}

export default TicketItem;
