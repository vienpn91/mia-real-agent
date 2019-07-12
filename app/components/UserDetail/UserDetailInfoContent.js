/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _get from 'lodash/get';
import {
  OverviewLeftSectionWrapper,
  OverviewTitle,
  OverviewProduct,
  InfoContentBlock,
} from 'components/Generals/ItemDetail.styled';
import { DATE_TIME_FORMAT } from 'utils/constants';
import { ROLES } from '../../../common/enums';

class UserDetailInfoContent extends PureComponent {
  renderOverviewInfo = (label, value, isLink = false) => (
    <OverviewProduct link={isLink}>
      <label>{label}</label>
      <span>{value || '-'}</span>
    </OverviewProduct>
  );

  renderItemProfile = () => {
    const {
      userDetail = {},
    } = this.props;
    const { role = ROLES.INDIVIDUAL } = userDetail;

    switch (role) {
      case ROLES.BUSINESS:
        return this.renderBusinessProfile();
      case ROLES.AGENT:
        return this.renderAgentProfile();
      case ROLES.INDIVIDUAL:
      default:
        return this.renderIndividualProfile();
    }
  };

  renderIndividualProfile = () => {
    const { userDetail = {} } = this.props;
    const { profile = {} } = userDetail;
    const {
      firstName, lastName, position, dateOfBirth, company, phone, address,
    } = profile;

    const dateOfBirthFormat = dateOfBirth
      ? moment(dateOfBirth).format(DATE_TIME_FORMAT.DATE)
      : '-';

    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>Profile</OverviewTitle>
        {this.renderOverviewInfo('First Name', firstName)}
        {this.renderOverviewInfo('Last Name', lastName)}
        {this.renderOverviewInfo('Phone', phone)}
        {this.renderOverviewInfo('Birth', dateOfBirthFormat)}
        {this.renderOverviewInfo('Address', address)}
        {this.renderOverviewInfo('Company', company)}
        {this.renderOverviewInfo('Position', position)}
      </OverviewLeftSectionWrapper>
    );
  }

  renderBusinessProfile = () => {
    const { userDetail = {} } = this.props;
    const { profile = {} } = userDetail;
    const {
      company, phone, address, companySize, companyFields,
    } = profile;
    const companyFieldsFormat = companyFields.join(', ');

    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>Profile</OverviewTitle>
        {this.renderOverviewInfo('Company', company)}
        {this.renderOverviewInfo('Phone', phone)}
        {this.renderOverviewInfo('Size', companySize)}
        {this.renderOverviewInfo('Fields', companyFieldsFormat)}
        {this.renderOverviewInfo('Address', address)}
      </OverviewLeftSectionWrapper>
    );
  }

  renderAgentProfile = () => {
    const { userDetail = {} } = this.props;
    const { application } = userDetail;
    const {
      firstName = '', lastName = '', address = '', country = '', phone = '',
      skills = [],
    } = application || {};

    const skillsFormat = skills.join(', ');

    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>Profile</OverviewTitle>
        {this.renderOverviewInfo('First Name', firstName)}
        {this.renderOverviewInfo('Last Name', lastName)}
        {this.renderOverviewInfo('Skills', skillsFormat)}
        {this.renderOverviewInfo('Phone', phone)}
        {this.renderOverviewInfo('Address', address)}
        {this.renderOverviewInfo('Country', country)}
      </OverviewLeftSectionWrapper>
    );
  }

  renderItemOverview = () => {
    const {
      userDetail: { username, email },
    } = this.props;
    return (
      <OverviewLeftSectionWrapper>
        <OverviewTitle>Primary Details</OverviewTitle>
        {this.renderOverviewInfo('Username', username, true)}
        {this.renderOverviewInfo('Email', email)}
      </OverviewLeftSectionWrapper>
    );
  };

  render() {
    return (
      <InfoContentBlock>
        {this.renderItemOverview()}
        {this.renderItemProfile()}
      </InfoContentBlock>
    );
  }
}

UserDetailInfoContent.propTypes = {
  userDetail: PropTypes.object.isRequired,
};

export default UserDetailInfoContent;
