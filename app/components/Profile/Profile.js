import React, { Component } from 'react';
import { func, bool, shape } from 'prop-types';
import {
  Row, Col, Divider, Button,
} from 'antd';
import {
  ProfileWrapper, ProfileCard, ProfileTitle,
  InputStyled,
  InputLabelStyled,
} from './styles';
import LoadingSpin from '../Loading';
import ProfileDetail from './ProfileDetail/ProfileDetail';
import ProfileFormContainer from '../../containers/Profile/ProfileForm';

export default class Profile extends Component {
  state = {
    isOpenConfirmPasswordModal: false,
  }

  static propTypes = {
    fetchProfile: func.isRequired,
    isFetching: bool.isRequired,
    user: shape().isRequired,
  }

  componentDidMount = () => {
    this.handleFetchDetail();
  }

  handleFetchDetail = () => {
    const { fetchProfile } = this.props;
    fetchProfile();
  }

  handleOpenConfirmPasswordModal = () => {
    this.setState({
      isOpenConfirmPasswordModal: true,
    });
  }

  handleCloseConfirmPasswordModal = () => {
    this.setState({
      isOpenConfirmPasswordModal: false,
    });
  }

  renderProfile = () => {
    const {
      user: {
        role, username, email, profile,
      },
    } = this.props;
    return (
      <div>
        <Row gutter={32}>
          <Col span={12}>
            <InputLabelStyled>Username:</InputLabelStyled>
            <InputStyled>{username}</InputStyled>
          </Col>
          <Col span={12}>
            <InputLabelStyled>Email:</InputLabelStyled>
            <InputStyled>{email}</InputStyled>
          </Col>
        </Row>
        <Divider />
        <ProfileDetail role={role} profile={profile} />
      </div>
    );
  }

  render() {
    const { isOpenConfirmPasswordModal } = this.state;
    const { isFetching } = this.props;
    return (
      <ProfileWrapper>
        <ProfileCard>
          <LoadingSpin loading={isFetching}>
            <ProfileTitle>Profile</ProfileTitle>
            {this.renderProfile()}
            <Button type="primary" onClick={this.handleOpenConfirmPasswordModal}>
              Edit
            </Button>
          </LoadingSpin>
        </ProfileCard>
        <ProfileFormContainer
          isOpen={isOpenConfirmPasswordModal}
          handleCancel={this.handleCloseConfirmPasswordModal}
        />
      </ProfileWrapper>
    );
  }
}
