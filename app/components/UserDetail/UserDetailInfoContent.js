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
import { DATE_TIME_FORMAT, COLUMN_TYPE } from 'utils/constants';
import TableDetail from 'components/Generals/TableDetail';
import { ROLES } from '../../../common/enums';

const defaultColumns = [
  {
    headerPropertise: {
      value: 'Ticket Id',
      size: '100',
    },
    contentPropertise: {
      size: '100',
    },
    dataKey: 'ticketId',
    type: COLUMN_TYPE.TEXT,
  },
  {
    headerPropertise: {
      value: 'Created At',
      size: '200',
    },
    contentPropertise: {
      size: '200',
    },
    dataKey: 'createdAt',
    type: COLUMN_TYPE.DATE,
    format: DATE_TIME_FORMAT.DATE_TIME,
  },
  {
    headerPropertise: {
      value: 'Category',
      size: '200',
    },
    contentPropertise: {
      size: '200',
    },
    dataKey: 'category',
    type: COLUMN_TYPE.TEXT,
  },
  {
    headerPropertise: {
      value: 'Title',
    },
    contentPropertise: {},
    dataKey: 'title',
    type: COLUMN_TYPE.TEXT,
  },
];

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
    const { applicationInfo } = userDetail;
    const {
      firstName = '', lastName = '', address = '', country = '', phone = '',
      skills = [],
    } = applicationInfo || {};

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

  renderTicketsTable = () => {
    const { userDetail = {} } = this.props;
    const { role = ROLES.INDIVIDUAL } = userDetail;
    const tickets = _get(userDetail, 'tickets', []);
    let columns = [];

    if (role === ROLES.INDIVIDUAL || role === ROLES.BUSINESS) {
      columns = [
        ...defaultColumns,
        {
          headerPropertise: {
            value: 'Assignee',
            size: '150',
          },
          contentPropertise: {
            size: '150',
          },
          dataKey: 'assignee.username',
          type: COLUMN_TYPE.TEXT,
        },
        {
          headerPropertise: {
            value: 'Status',
            size: '100',
          },
          contentPropertise: {
            size: '100',
          },
          dataKey: 'status',
          type: COLUMN_TYPE.STATUS,
        },
      ];
    } else if (role === ROLES.AGENT || role === ROLES.FREELANCER) {
      columns = [
        ...defaultColumns,
        {
          headerPropertise: {
            value: 'Owner',
            size: '150',
          },
          contentPropertise: {
            size: '150',
          },
          dataKey: 'owner.username',
          type: COLUMN_TYPE.TEXT,
        },
        {
          headerPropertise: {
            value: 'Status',
            size: '100',
          },
          contentPropertise: {
            size: '100',
          },
          dataKey: 'status',
          type: COLUMN_TYPE.STATUS,
        },
      ];
    }

    return <TableDetail columns={columns} items={tickets} emptyMsg="No tickets available" />;
  }

  render() {
    return (
      <InfoContentBlock>
        {this.renderItemOverview()}
        {this.renderItemProfile()}
        {this.renderTicketsTable()}
      </InfoContentBlock>
    );
  }
}

UserDetailInfoContent.propTypes = {
  userDetail: PropTypes.object.isRequired,
};

export default UserDetailInfoContent;
