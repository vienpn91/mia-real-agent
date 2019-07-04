/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import _startsWith from 'lodash/startsWith';
import { Link } from 'react-router-dom';
import { SidebarItemStyled } from './LeftSidebar.styled';

const SidebarItem = ({
  icon, text, link, currentUrl, isOpen,
}) => {
  const actived = _startsWith(currentUrl, link);
  return (
    <Link to={link}>
      <SidebarItemStyled isActive={actived} isOpen={isOpen}>
        <i className={icon} />
        <span>{text}</span>
      </SidebarItemStyled>
    </Link>
  );
};

SidebarItem.propTypes = {
  isOpen: PropTypes.bool,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  currentUrl: PropTypes.string.isRequired,
};

export default SidebarItem;
