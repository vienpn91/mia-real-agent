/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ProfileUserInfoWrapper,
  ProfileUserHead,
  ProfileUserAvatar,
  ProfileUserName,
  ProfileUserEmail,
  ProfileUserAction,
  CloseAction,
  ProfileUserID,
} from './ProfileUser.styled';
import ProfileOrganization from './ProfileOrganization';

const src = false;

class ProfileUser extends React.PureComponent {
  render() {
    const { onLogout, onToggleUserInfo } = this.props;
    return (
      <ProfileUserInfoWrapper>
        <ProfileUserHead>
          <ProfileUserAvatar>
            {src ? (
              <img src="#" />
            ) : (
              <img src="../../../images/avatars/user.svg" />
            )}
          </ProfileUserAvatar>
          <ProfileUserName>Tri Nguyen</ProfileUserName>
          <ProfileUserID>Grandfather</ProfileUserID>
          <ProfileUserEmail>trinm@zigvy.com</ProfileUserEmail>
          <ProfileUserAction>
            <button className="my-account">My Account</button>
            <span>|</span>
            <button className="sign-out" onClick={onLogout}>
              Sign Out
            </button>
          </ProfileUserAction>
          <CloseAction onClick={onToggleUserInfo}>
            <i className="icon-close" />
          </CloseAction>
        </ProfileUserHead>
        <ProfileOrganization />
      </ProfileUserInfoWrapper>
    );
  }
}

ProfileUser.propTypes = {
  onLogout: PropTypes.func,
  onToggleUserInfo: PropTypes.func,
};

export default ProfileUser;
