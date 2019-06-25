import React from 'react';
import PropTypes from 'prop-types';
import TopNavBar from 'components/TopNavBar';
import { PageWrapper } from './MainLayout.styled';

const MainLayout = ({ children }) => (
  <PageWrapper>
    <TopNavBar />
    {children}
  </PageWrapper>
);

MainLayout.propTypes = {
};

export default MainLayout;
