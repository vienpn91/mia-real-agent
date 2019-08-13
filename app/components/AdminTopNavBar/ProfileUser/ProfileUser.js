/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ProfileUserInfoWrapper,
  ProfileUserHead,
  ProfileUserAvatar,
  ProfileUserName,
  ProfileUserEmail,
  ProfileUserAction,
  CloseAction,
} from './ProfileUser.styled';

const src = false;

class ProfileUser extends React.PureComponent {
  render() {
    const {
      onLogout, onToggleUserInfo, username, email,
    } = this.props;
    return (
      <ProfileUserInfoWrapper>
        <ProfileUserHead>
          {/* <ProfileUserAvatar>
            {src ? (
              <img src="/assets/images/user-live.jpeg" />
            ) : (
              <img
                src="https://cdn1.thr.com/sites/default/files/imagecache/landscape_928x523/2017/09/gettyimages-801080928_-_h_2017.jpg"
              />
            )
            }
          </ProfileUserAvatar> */}
          <ProfileUserName>{username}</ProfileUserName>
          <ProfileUserEmail>{email}</ProfileUserEmail>
          <ProfileUserAction>
            <Link to="/profile">My Account</Link>
            <span>|</span>
            <button className="sign-out" onClick={onLogout}>
              Sign Out
            </button>
          </ProfileUserAction>
          <CloseAction onClick={onToggleUserInfo}>
            <i className="icon-close" />
          </CloseAction>
        </ProfileUserHead>
      </ProfileUserInfoWrapper>
    );
  }
}

ProfileUser.propTypes = {
  onLogout: PropTypes.func,
  onToggleUserInfo: PropTypes.func,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileUser;
