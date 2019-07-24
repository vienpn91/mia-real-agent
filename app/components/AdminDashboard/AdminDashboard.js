import React from 'react';
import ShadowScrollbars from 'components/Scrollbar';
import TicketStatistic from './TicketStatistic/TicketStatistic';
import {
  DashboardWrapperStyled,
  DashboardStatisticWarpper,
} from './AdminDashboard.styled';
import TicketActivity from '../../containers/AdminDashboard/TicketActivity/TicketActivity';

const scrollStyle = {
  height: 'calc(100vh - 60px)',
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

export default AdminDashboard;
