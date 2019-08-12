import React, { PureComponent } from 'react';
import { shape, number } from 'prop-types';
import { Button } from 'antd';
import moment from 'moment';
import {
  DashboardTitle,
  DashboardRightBlock,
  DashboardLeftBlock,
  DashboardSubTitle,
  DashboardLinkTitle,
  DashboardSubActivity,
} from 'components/ActivityTab/ActivityTab.styled';

import {
  TableContentItem,
} from 'components/TableComponent/TableComponent.styled';
import { TableContent } from 'components/TableComponent/TableComponent';
import { columnSizeContent } from './ColumnSize';

class RequestItem extends PureComponent {
  static propTypes = {
    request: shape().isRequired,
    index: number,
  }

  handleAccept = () => {


  }

  handleCancel = () => {

  }


  renderSubtitle = () => {
    const { request } = this.props;
    const {
      ticketId,
      createdAt,
    } = request;
    const timeFromNow = moment(createdAt).fromNow();

    return (
      <DashboardSubActivity>
        {`#${ticketId} opened ${timeFromNow}`}
      </DashboardSubActivity>
    );
  }

  renderRequestContent = () => {
    const { request } = this.props;
    const { title } = request;
    return (
      <DashboardTitle>
        <DashboardRightBlock>
          <DashboardSubTitle>
            <DashboardLinkTitle>
              {title}
            </DashboardLinkTitle>
          </DashboardSubTitle>
          {this.renderSubtitle()}
        </DashboardRightBlock>
      </DashboardTitle>
    );
  }

  renderRequestAction = () => (
    <DashboardTitle>
      <DashboardLeftBlock>
        <Button type="primary" onClick={this.handleAccept}>Accept</Button>
        <Button onClick={this.handleCancel}>Cancel</Button>
      </DashboardLeftBlock>
    </DashboardTitle>
  )


  render() {
    const { index } = this.props;
    return (
      <TableContentItem key={index} ticket>
        <TableContent {...columnSizeContent[0]}>
          {this.renderRequestContent()}
        </TableContent>
        <TableContent {...columnSizeContent[1]}>
          {this.renderRequestAction()}
        </TableContent>
      </TableContentItem>
    );
  }

  static propTypes = {
  }
}

export default RequestItem;
