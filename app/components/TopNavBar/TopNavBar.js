/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import {
  Layout, Avatar, Icon, Menu,
} from 'antd';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import {
  TopNavBarWrapper,
  Logo,
  NavBar,
  Nav,
  UserName,
  UserProfile,
} from './TopNavBar.styled';

const { Header } = Layout;

export default class TopNavBar extends Component {
  static propTypes = {
    logout: func.isRequired,
  }

  state = {
    isDropdownOpen: false,
  }

  openDropdown = () => {
    this.setState({
      isDropdownOpen: true,
    });
  }

  closeDropdown = () => {
    this.setState({
      isDropdownOpen: false,
    });
  }

  renderLogo = () => (
    <Logo>
      <Link to="/dashboard">
        <Avatar src="../../assets/images/logo-small-white.png" />
      </Link>
    </Logo>
  )

  handleLogout = () => {
    const { logout } = this.props;
    logout();
  }

  renderDropdownProfile = () => (
    <Menu>
      <Menu.Item>
        <Link to="/profile">
          <Icon type="user" />
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/help">
          <Icon type="question" />
          Help
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/#" onClick={this.handleLogout}>
          <Icon type="logout" />
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  renderUserProfile = () => {
    const { isDropdownOpen } = this.state;
    return (
      <UserProfile onClick={this.openDropdown} onMouseLeave={this.closeDropdown}>
        <Avatar src="https://modworkshop.net/mydownloads/previews/preview_698_1433195641_d29bf7dc71da094fc00de7f15b1280f1.jpg" />
        <UserName>Tri Dep Trai</UserName>
        {isDropdownOpen && this.renderDropdownProfile()}
      </UserProfile>
    );
  }

  render() {
    return (
      <TopNavBarWrapper>
        <Header>
          {this.renderLogo()}
          <NavBar>
            <Nav>
              <Link to="/dashboard">Dashboard</Link>
            </Nav>
            <Nav key="2">
              <Link to="/ticket">Ticket</Link>
            </Nav>
          </NavBar>
          {this.renderUserProfile()}
        </Header>
      </TopNavBarWrapper>
    );
  }
}
