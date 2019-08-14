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

const { Header } = Layout;

export default class TopNavBar extends Component {
  static propTypes = {
    email: string.isRequired,
  };

  state = {
    isUserInfoOpen: false,
  };

  onToggleUserInfo = () => {
    this.setState(prevState => ({
      isUserInfoOpen: !prevState.isUserInfoOpen,
    }));
  };

  renderLogo = () => (
    <Logo>
      <Link to="/dashboard">
        <Avatar src="/assets/images/logo-small-white.png" />
      </Link>
    </Logo>
  )

  render() {
    const { isUserInfoOpen } = this.state;
    const { email } = this.props;
    return (
      <TopNavBarWrapper>
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
                src="/assets/images/user-live.jpeg"
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
                {email}
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
