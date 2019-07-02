/* eslint-disable default-case */
import React, { Component } from 'react';
import _get from 'lodash/get';
import moment from 'moment';
import { object, number } from 'prop-types';
import { Icon } from 'antd';
import {
  DashboardTitle,
  DashboardLeftBlock,
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
    return (
      <DashboardTitle>
        <DashboardRightBlock>
          <DashboardSubTitle>
            <DashboardLinkTitle>{ticket.title}</DashboardLinkTitle>
          </DashboardSubTitle>
          {this.renderSubtitle()}
        </DashboardRightBlock>
      </DashboardTitle>
    );
  }

  renderTicketStatus = () => (
    <DashboardLeftBlock>
      <Icon twoToneColor="#28a745" type="exclamation-circle" theme="twoTone" />
    </DashboardLeftBlock>
  )


  render() {
    const { index } = this.props;
    return (
      <TableContentItem key={index}>
        <TableContent {...columnSizeContent[0]}>
          <input type="checkbox" />
        </TableContent>
        <TableContent {...columnSizeContent[1]}>
          {this.renderTicketStatus()}
        </TableContent>
        <TableContent {...columnSizeContent[2]}>
          {this.renderTicketContent()}
        </TableContent>
      </TableContentItem>
    );
  }
}

export default TicketItem;
