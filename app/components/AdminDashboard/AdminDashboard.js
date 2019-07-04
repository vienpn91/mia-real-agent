import React from 'react';
import ShadowScrollbars from 'components/Scrollbar';
import TicketActivity from './TicketActivity/TicketActivity';
import TicketStatistic from './TicketStatistic/TicketStatistic';
import {
  DashboardWrapperStyled,
  DashboardStatisticWarpper,
} from './AdminDashboard.styled';

const scrollStyle = {
  height: 'calc(100vh - 50px)',
  width: '100%',
};

const AdminDashboard = () => (
  <DashboardWrapperStyled>
    <ShadowScrollbars autoHide style={scrollStyle}>
      <TicketActivity />
      <DashboardStatisticWarpper>
        <TicketStatistic />
      </DashboardStatisticWarpper>
    </ShadowScrollbars>
  </DashboardWrapperStyled>
);

AdminDashboard.propTypes = {};

export default AdminDashboard;
