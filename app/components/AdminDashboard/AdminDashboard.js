import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ShadowScrollbars from 'components/Scrollbar';
import TicketActivity from './TicketActivity/TicketActivity';
import TicketStatistic from './TicketStatistic/TicketStatistic';
import {
  DashboardWrapperStyled,
  DashboardStatisticWarpper,
} from './AdminDashboard.styled';

const scrollStyle = {
  height: 'calc(100vh - 60px)',
  width: '100%',
};

export default class AdminDashboard extends PureComponent {
  render() {
    const { toggleLeftSideBar } = this.props;
    return (
      <DashboardWrapperStyled isToggle={toggleLeftSideBar}>
        <ShadowScrollbars autoHide style={scrollStyle}>
          <TicketActivity />
          <DashboardStatisticWarpper>
            <TicketStatistic />
          </DashboardStatisticWarpper>
        </ShadowScrollbars>
      </DashboardWrapperStyled>
    );
  }
}

AdminDashboard.propTypes = {
  toggleLeftSideBar: PropTypes.bool.isRequired,
};
