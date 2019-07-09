import React from 'react';
import PropTypes from 'prop-types';
import { PageWrapper } from './MainLayout.styled';
import TopNavBarContainer from '../../containers/TopNavBar';

const MainLayout = ({ children }) => (
  <PageWrapper>
    <TopNavBarContainer />
    {children}
  </PageWrapper>
);

MainLayout.propTypes = {
  children: PropTypes.any,
};

export default MainLayout;
