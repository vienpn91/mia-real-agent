/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { shape } from 'prop-types';
import {
  TicketActivityWrapper,
  TicketActivityLeftItem,
  TicketActivityRightItem,
  TicketActivityTitle,
} from './ApplicationUserSummary.styled';
import ApplicationSummary from '../ApplicationSummary';
import UserSummary from '../UserSummary';

const ApplicationUserSummary = ({ applicationSummary, userSummary }) => (
  <TicketActivityWrapper>
    <TicketActivityLeftItem>
      <TicketActivityTitle>
        Applications Summary
      </TicketActivityTitle>
      <ApplicationSummary applicationSummary={applicationSummary} />
    </TicketActivityLeftItem>
    <TicketActivityRightItem>
      <TicketActivityTitle>Users Summary</TicketActivityTitle>
      <UserSummary userSummary={userSummary} />
    </TicketActivityRightItem>
  </TicketActivityWrapper>
);

ApplicationUserSummary.propTypes = {
  applicationSummary: shape().isRequired,
};

export default ApplicationUserSummary;
