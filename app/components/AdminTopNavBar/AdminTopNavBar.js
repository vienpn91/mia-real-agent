import React, { PureComponent } from 'react';
import { PopupOverlayStyled } from 'components/Generals/General.styled';

import {
  HeaderStyled,
  TopbarRight,
  ProfileStyled,
  ProfileImageStyled,
  ActionsStyled,
  SettingIcon,
} from './AdminTopNavBar.styled';
import ProfileUser from '../../containers/ProfileUser';

class AdminTopNavBar extends PureComponent {
  state = {
    isUserInfoOpen: false,
  };

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
