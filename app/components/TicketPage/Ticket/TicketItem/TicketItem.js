/* eslint-disable default-case */
import React, { Component } from 'react';
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

export default class TicketItem extends Component {
  static propTypes = {
    value: object.isRequired,
    index: number,
  }

  renderSubtitle = () => {
    const { value } = this.props;
    const {
      ticketId, activityStatus, modifiedTime, userName,
    } = value;
    switch (activityStatus.toString()) {
      case 'Created':
        return (
          <DashboardSubActivity>
            {`${ticketId} ${activityStatus} ${modifiedTime} ago`}
          </DashboardSubActivity>
        );
      case 'Assigned':
        return (
          <DashboardSubActivity>
            {`${activityStatus} to ${userName} ${modifiedTime} ago`}
          </DashboardSubActivity>
        );
      case 'Closed':
        return (
          <DashboardSubActivity>
            {`${ticketId} ${activityStatus} ${modifiedTime} ago`}
          </DashboardSubActivity>
        );
      default:
    }
  }

  renderTicketContent = () => {
    const { value } = this.props;
    return (
      <DashboardTitle>
        <DashboardRightBlock>
          <DashboardSubTitle>
            <DashboardLinkTitle>{value.title}</DashboardLinkTitle>
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
