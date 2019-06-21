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
import { ROLES } from '../../../common/enums';

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

  renderIndividual = () => {
    const { profile: { profile = {} } } = this.props;
    const {
      firstName, lastName, phone, address,
      dateOfBirth, position, company,
    } = profile;
    return (
      <div>
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
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>Date of birth:</InputLabelStyled>
            <InputStyled>{dateOfBirth}</InputStyled>
          </Col>
          <Col span={12}>
            <InputLabelStyled>Position:</InputLabelStyled>
            <InputStyled>{position}</InputStyled>
          </Col>
        </RowStyled>
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>Company:</InputLabelStyled>
            <InputStyled>{company}</InputStyled>
          </Col>
        </RowStyled>
      </div>
    );
  }

  renderBusiness = () => {
    const { profile: { profile = {} } } = this.props;
    const {
      companyFields, phone, address,
      companySize, company,
    } = profile;
    return (
      <div>
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>Company:</InputLabelStyled>
            <InputStyled>{company}</InputStyled>
          </Col>
        </RowStyled>
        <RowStyled gutter={32}>
          <Col span={12}>
            <InputLabelStyled>Company fields:</InputLabelStyled>
            <InputStyled>{companyFields}</InputStyled>
          </Col>
          <Col span={12}>
            <InputLabelStyled>Company fields:</InputLabelStyled>
            <InputStyled>{companySize}</InputStyled>
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

  renderProfile = () => {
    const { profile: { role, username, email } } = this.props;
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
        {role === ROLES.INDIVIDUAL
          ? this.renderIndividual() : this.renderBusiness()}
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
