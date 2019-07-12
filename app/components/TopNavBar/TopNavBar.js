/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import {
  Layout, Avatar,
} from 'antd';
import { Link } from 'react-router-dom';
import {
  TopNavBarWrapper,
  Logo,
  NavBar,
  Nav,
  TopbarRight,
  ActionsStyled,
  ProfileStyled,
  ProfileImageStyled,
} from './TopNavBar.styled';
import ProfileUser from '../../containers/ProfileUser';
import { PopupOverlayStyled } from '../Generals/General.styled';

const { Header } = Layout;

export default class TopNavBar extends Component {
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
        <Avatar src="../../assets/images/logo-small-white.png" />
      </Link>
    </Logo>
  )

  render() {
    const { isUserInfoOpen } = this.state;
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
                src="/assets/images/user.svg"
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
            </ProfileStyled>
          </TopbarRight>
        </Header>
      </TopNavBarWrapper>
    );
  }
}
