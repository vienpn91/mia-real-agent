/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  OverviewLeftSectionWrapper,
  OverviewTitle,
  OverviewProduct,
  InfoContentBlock,
} from 'components/Generals/ItemDetail.styled';
import { DATE_TIME_FORMAT } from '../../utils/constants';

class TicketDetailInfoContent extends PureComponent {
  renderOverviewInfo = (label, value, isLink = false) => (
    <OverviewProduct link={isLink}>
      <label>{label}</label>
      <span>{value instanceof Array ? value.join(', ') || '-' : (value || '-')}</span>
    </OverviewProduct>
  );

  renderItemOverview = () => {
    const {
      ticketDetail: {
        title, status, category,
        description, createdAt,
        owner, assignee,
      },
    } = this.props;
    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>Primary Details</OverviewTitle>
        {this.renderOverviewInfo('Title', title, true)}
        {this.renderOverviewInfo('Status', status)}
        {this.renderOverviewInfo('Category', category)}
        {this.renderOverviewInfo('Description', description)}
        {this.renderOverviewInfo('Created at', moment(createdAt).format(DATE_TIME_FORMAT.DATE))}
        {this.renderOverviewInfo('Owner', owner.username)}
        {assignee && this.renderOverviewInfo('Assignee', assignee.username)}
      </OverviewLeftSectionWrapper>
    );
  };

  render() {
    return (
      <InfoContentBlock>
        {this.renderItemOverview()}
      </InfoContentBlock>
    );
  }
}

TicketDetailInfoContent.propTypes = {
  ticketDetail: PropTypes.object.isRequired,
};

export default TicketDetailInfoContent;
