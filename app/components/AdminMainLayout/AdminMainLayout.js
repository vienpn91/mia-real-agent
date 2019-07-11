import React from 'react';
import PropTypes from 'prop-types';
import AdminTopNavBar from 'components/AdminTopNavBar';
import LeftSideBar from 'containers/LeftSideBar';
import { AdminPageWrapper } from './AdminMainLayout.styled';

const AdminMainLayout = ({ children, toggleLeftSideBar }) => (
  <AdminPageWrapper isToggle={toggleLeftSideBar}>
    <AdminTopNavBar />
    <LeftSideBar />
    {children}
  </AdminPageWrapper>
);

AdminMainLayout.propTypes = {
  children: PropTypes.any,
  toggleLeftSideBar: PropTypes.bool,
};

export default AdminMainLayout;
