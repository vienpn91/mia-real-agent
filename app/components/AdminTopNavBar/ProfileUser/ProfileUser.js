/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ProfileUserInfoWrapper,
  ProfileUserAction,
  ProfileUserHead,
} from './ProfileUser.styled';

class ProfileUser extends React.PureComponent {
  render() {
    const {
      onLogout,
    } = this.props;
    return (
      <ProfileUserInfoWrapper>
        <ProfileUserHead>
          <ProfileUserAction>
            <Link to="/profile" className="my-account">My Account</Link>
            <button className="sign-out" onClick={onLogout}>
              Sign Out
            </button>
          </ProfileUserAction>
        </ProfileUserHead>
      </ProfileUserInfoWrapper>
    );
  }
}

ProfileUser.propTypes = {
  onLogout: PropTypes.func,
};

export default ProfileUser;
