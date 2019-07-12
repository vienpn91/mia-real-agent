/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import Scrollbar from 'components/Scrollbar';
import SpinnerLoading from 'components/PageLoading/SpinnerLoading';
import { ItemDetailInfoWrapper } from 'components/Generals/ItemDetail.styled';
import ErrorContent from 'components/ErrorContent';
import UserDetailInfoContent from './UserDetailInfoContent';
import UserDetailInfoHeader from './UserDetailInfoHeader';

const scrollStyle = {
  height: 'calc(100vh - 90px)',
  width: '100%',
};

class UserDetailInfo extends PureComponent {
  componentDidMount() {
    const { userId, fetchUserSingle } = this.props;

    fetchUserSingle(userId);
  }

  componentDidUpdate(prevProps) {
    const { userId, fetchUserSingle } = this.props;
    const { userId: prevUserId } = prevProps;

    if (prevUserId !== userId) {
      fetchUserSingle(userId);
    }
  }

  render() {
    const { userDetail } = this.props;

    if (_isEmpty(userDetail) || userDetail.isLoading) {
      return (
        <ItemDetailInfoWrapper>
          <SpinnerLoading />
        </ItemDetailInfoWrapper>
      );
    }

    if (userDetail.error) {
      return (
        <ItemDetailInfoWrapper>
          <ErrorContent error={userDetail.error} />
        </ItemDetailInfoWrapper>
      );
    }

    const { _id, username } = userDetail;

    return (
      <ItemDetailInfoWrapper>
        <UserDetailInfoHeader userId={_id} username={username} />
        <Scrollbar autoHide style={scrollStyle}>
          <UserDetailInfoContent userDetail={userDetail} />
        </Scrollbar>
      </ItemDetailInfoWrapper>
    );
  }
}

UserDetailInfo.propTypes = {
  userId: PropTypes.string.isRequired,
  fetchUserSingle: PropTypes.func.isRequired,
  userDetail: PropTypes.object.isRequired,
};

export default UserDetailInfo;
