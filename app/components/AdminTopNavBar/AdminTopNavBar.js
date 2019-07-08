import React, { PureComponent } from 'react';
import { PopupOverlayStyled } from 'components/Generals/General.styled';
import ProfileUser from './ProfileUser/ProfileUser';
import {
  HeaderStyled,
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

  // onLogout = (e) => {
  //   e.preventDefault();
  //   const { logout } = this.props;
  //   logout();
  // };

  onToggleUserInfo = () => {
    this.setState(prevState => ({
      isUserInfoOpen: !prevState.isUserInfoOpen,
    }));
  };

  renderSettingIcon = () => <SettingIcon className="icon-settings" />;

  render() {
    const { isUserInfoOpen } = this.state;
    return (
      <HeaderStyled>
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
      </HeaderStyled>
    );
  }
}

AdminTopNavBar.propTypes = {};

export default AdminTopNavBar;
