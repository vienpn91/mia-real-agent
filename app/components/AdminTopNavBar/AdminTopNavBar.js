import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProfileUser from './ProfileUser/ProfileUser';
import { PopupOverlayStyled } from '../Generals/general.styles';

import {
  HeaderStyled,
  LogoStyled,
  TopbarLeft,
  TopbarRight,
  ProfileStyled,
  ProfileImageStyled,
  ActionsStyled,
  SettingIcon,
} from './AdminTopNavBar.styled';

class AdminTopNavBar extends PureComponent {
  state = {
    isUserInfoOpen: false,
  };

  onLogout = (e) => {
    e.preventDefault();
    const { logout } = this.props;
    logout();
  };

  onLogoClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  onToggleUserInfo = () => {
    this.setState(prevState => ({
      isUserInfoOpen: !prevState.isUserInfoOpen,
    }));
  };

  renderLogo = () => <LogoStyled onClick={this.onLogoClick} />;

  renderTopbarLeft = () => (
    <TopbarLeft>
      {this.renderLogo()}
    </TopbarLeft>
  );

  renderSettingIcon = () => <SettingIcon className="icon-settings" />;

  renderTopbarRight = () => {
    const { isUserInfoOpen } = this.state;
    return (
      <TopbarRight>
        <ActionsStyled>
          {this.renderSettingIcon()}
        </ActionsStyled>
        <ProfileStyled>
          <ProfileImageStyled
            src="/assets/images/user.svg"
            onClick={this.onToggleUserInfo}
          />
          {isUserInfoOpen && (
            <React.Fragment>
              <PopupOverlayStyled onClick={this.onToggleUserInfo} />
              <ProfileUser
                onLogout={this.onLogout}
                onToggleUserInfo={this.onToggleUserInfo}
              />
            </React.Fragment>
          )}
        </ProfileStyled>
      </TopbarRight>
    );
  };

  render() {
    return (
      <HeaderStyled>
        {this.renderTopbarLeft()}
        {this.renderTopbarRight()}
      </HeaderStyled>
    );
  }
}

AdminTopNavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default AdminTopNavBar;
