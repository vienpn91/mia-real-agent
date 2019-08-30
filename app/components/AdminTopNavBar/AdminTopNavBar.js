import React, { PureComponent } from 'react';
import { PopupOverlayStyled } from 'components/Generals/General.styled';

import {
  HeaderAdminStyled,
  TopbarRightAdmin,
  ProfileStyled,
  ProfileImageStyled,
  UserNameAdmin,
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
      <HeaderAdminStyled>
        <TopbarRightAdmin>
          <ProfileStyled>
            <ProfileImageStyled
              src="/assets/images/user.svg"
              onClick={this.onToggleUserInfo}
            />
            <UserNameAdmin>admin@gmail.com</UserNameAdmin>
            {isUserInfoOpen && (
              <React.Fragment>
                <PopupOverlayStyled onClick={this.onToggleUserInfo} />
                <ProfileUser onToggleUserInfo={this.onToggleUserInfo} />
              </React.Fragment>
            )}
          </ProfileStyled>
        </TopbarRightAdmin>
      </HeaderAdminStyled>
    );
  }
}

AdminTopNavBar.propTypes = {};

export default AdminTopNavBar;
