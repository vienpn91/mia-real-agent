import React, { Component } from 'react';
import { func, bool, shape } from 'prop-types';
import { Row, Col, Divider } from 'antd';
import {
  ProfileWrapper, ProfileCard, ProfileTitle,
  InputStyled,
  InputLabelStyled,
  RowStyled,
} from './styles';
import LoadingSpin from '../Loading';

export default class Profile extends Component {
  static propTypes = {
    fetchProfile: func.isRequired,
    isFetching: bool.isRequired,
    profile: shape().isRequired,
  }

  componentDidMount = () => {
    this.handleFetchDetail();
  }

  handleFetchDetail = () => {
    const { fetchProfile } = this.props;
    fetchProfile();
  }

  renderProfile = () => {
    const { profile: { username, email, profile = {} } } = this.props;
    const {
      firstName, lastName, phone, address,
    } = profile;
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
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>First name:</InputLabelStyled>
            <InputStyled>{firstName}</InputStyled>
          </Col>
          <Col span={12}>
            <InputLabelStyled>Last name:</InputLabelStyled>
            <InputStyled>{lastName}</InputStyled>
          </Col>
        </RowStyled>
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>Phone No.:</InputLabelStyled>
            <InputStyled>{phone}</InputStyled>
          </Col>
          <Col span={12}>
            <InputLabelStyled>Address:</InputLabelStyled>
            <InputStyled>{address}</InputStyled>
          </Col>
        </RowStyled>
      </div>
    );
  }

  render() {
    const { isFetching } = this.props;
    return (
      <ProfileWrapper>
        <ProfileCard>
          <LoadingSpin loading={isFetching}>
            <ProfileTitle>Profile</ProfileTitle>
            {this.renderProfile()}
          </LoadingSpin>
        </ProfileCard>
      </ProfileWrapper>
    );
  }
}
