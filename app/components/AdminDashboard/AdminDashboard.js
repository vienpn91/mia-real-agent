import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import ShadowScrollbars from 'components/Scrollbar';
import {
  DashboardWrapperStyled,
} from './AdminDashboard.styled';
import TicketActivity from './TicketActivity/TicketActivity';
import ApplicationUserSummary from './ApplicationUserSummary/ApplicationUserSummary';

const scrollStyle = {
  height: 'calc(100vh - 60px)',
  width: '100%',
};


export class AdminDashboard extends Component {
  componentDidMount = () => {
    const { getTicketActivity, getApplicationSummary, getUserSummary } = this.props;
    getTicketActivity();
    getApplicationSummary();
    getUserSummary();
  }

  render() {
    const { ticketActivity, applicationSummary, userSummary } = this.props;
    return (
      <DashboardWrapperStyled>
        <ShadowScrollbars autoHide style={scrollStyle}>
          <TicketActivity ticketActivity={ticketActivity} />
          <ApplicationUserSummary
            applicationSummary={applicationSummary}
            userSummary={userSummary}
          />
        </ShadowScrollbars>
      </DashboardWrapperStyled>
    );
  }
}

AdminDashboard.propTypes = {
  getTicketActivity: func.isRequired,
  ticketActivity: shape().isRequired,
  getApplicationSummary: func.isRequired,
  applicationSummary: shape().isRequired,
  getUserSummary: func.isRequired,
  userSummary: shape().isRequired,
};

export default AdminDashboard;
