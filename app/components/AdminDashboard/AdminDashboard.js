import React, { Component } from 'react'
import { func, shape } from 'prop-types';
import ShadowScrollbars from 'components/Scrollbar';
import TicketStatistic from './TicketStatistic/TicketStatistic';
import {
  DashboardWrapperStyled,
  DashboardStatisticWarpper,
} from './AdminDashboard.styled';
import TicketActivity from './TicketActivity/TicketActivity';
import ApplicationUserSummary from './ApplicationUserSummary/ApplicationUserSummary';

const scrollStyle = {
  height: 'calc(100vh - 60px)',
  width: '100%',
};


export class AdminDashboard extends Component {
  componentDidMount = () => {
    const { getTicketActivity, getApplicationSummary } = this.props;
    getTicketActivity();
    getApplicationSummary();
  }

  render() {
    const { ticketActivity, applicationSummary } = this.props;
    return (
      <DashboardWrapperStyled>
        <ShadowScrollbars autoHide style={scrollStyle}>
          <TicketActivity ticketActivity={ticketActivity} />
          <ApplicationUserSummary applicationSummary={applicationSummary} />
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
};

export default AdminDashboard;
