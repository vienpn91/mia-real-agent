/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  OverviewLeftSectionWrapper,
  OverviewTitle,
  OverviewProduct,
  InfoContentBlock,
} from 'components/Generals/ItemDetail.styled';

class ApplicationDetailInfoContent extends PureComponent {
  renderOverviewInfo = (label, value, isLink = false) => (
    <OverviewProduct link={isLink}>
      <label>{label}</label>
      <span>{value || '-'}</span>
    </OverviewProduct>
  );

  renderItemOverview = () => {
    const {
      applicationDetail: {
        firstName, lastName, email, cv,
      },
    } = this.props;
    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>Primary Details</OverviewTitle>
        {this.renderOverviewInfo('First name', firstName)}
        {this.renderOverviewInfo('Last name', lastName)}
        {this.renderOverviewInfo('Email', email)}
        {this.renderOverviewInfo('CV', cv, true)}
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

ApplicationDetailInfoContent.propTypes = {
  applicationDetail: PropTypes.object.isRequired,
};

export default ApplicationDetailInfoContent;
