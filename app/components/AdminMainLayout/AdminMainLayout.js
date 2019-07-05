import React from 'react';
import PropTypes from 'prop-types';
import AdminTopNavBar from 'components/AdminTopNavBar';
import LeftSideBar from 'components/LeftSideBar';
import { AdminPageWrapper } from './AdminMainLayout.styled';

const AdminMainLayout = ({ children }) => (
  <AdminPageWrapper>
    <AdminTopNavBar />
    <LeftSideBar />
    {children}
  </AdminPageWrapper>
);

AdminMainLayout.propTypes = {
  children: PropTypes.any,
};

export default AdminMainLayout;
