/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import {
  Layout, Avatar,
} from 'antd';

import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import {
  TopNavBarWrapper,
  Logo,
  NavBar,
  Nav,
  TopbarRight,
  ProfileStyled,
  ProfileImageStyled,
  UserName,
  MenuStyled,
} from './TopNavBar.styled';
import ProfileUser from '../../containers/ProfileUser';
import { PopupOverlayStyled } from '../Generals/General.styled';
import { isAgent } from '../../utils/func-utils';

const { Header } = Layout;

export default class TopNavBar extends Component {
  static propTypes = {
    email: string.isRequired,
    userRole: string.isRequired,
  };

  state = {
    isUserInfoOpen: false,
  };

  onToggleUserInfo = () => {
    this.setState(prevState => ({
      isUserInfoOpen: !prevState.isUserInfoOpen,
    }));
  };

  renderLogo = () => {
    const { userRole } = this.props;
    return (
      <Logo>
        <Link to="/dashboard">
          <Avatar src={isAgent(userRole) ? '/assets/images/logo-small-white.png' : '/assets/images/user-mia-logo.svg'} />
        </Link>
      </Logo>
    )
  }

  render() {
    const { isUserInfoOpen } = this.state;
    const { email, userRole } = this.props;
    return (

      <TopNavBarWrapper className={!isAgent(userRole) ? 'user' : 'agent'}>
        <Header>
          {this.renderLogo()}
          <NavBar>
            <Nav>
              <Link to="/dashboard/ticket">Dashboard</Link>
            </Nav>
            <Nav key="2">
              <Link to="/conversation">Ticket</Link>
            </Nav>
          </NavBar>
          <TopbarRight>
            <ProfileStyled>
              <ProfileImageStyled
                src={!isAgent(userRole) ? '/assets/images/user-live.jpeg' : '/assets/images/user.svg'}
                onClick={this.onToggleUserInfo}
              />
              {isUserInfoOpen && (
                <React.Fragment>
                  <PopupOverlayStyled onClick={this.onToggleUserInfo} />
                  <ProfileUser
                    onToggleUserInfo={this.onToggleUserInfo}
                  />
                </React.Fragment>
              )}
              <UserName onClick={this.onToggleUserInfo}>
                <span>{email}</span>
                <span>{!isAgent(userRole) ? 'User' : 'Agent'}</span>
              </UserName>
              <MenuStyled
                type="down"
                onClick={this.onToggleUserInfo}
              />
            </ProfileStyled>
          </TopbarRight>
        </Header>
      </TopNavBarWrapper>
    );
  }
}
