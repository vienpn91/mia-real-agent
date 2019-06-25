import React, { Component } from 'react';
import {
  Modal, Button,
} from 'antd';
import {
  func, bool,
  shape,
} from 'prop-types';
import { InputLabelStyled } from '../styles';
import { InputStyled } from '../../FormInput/styles';
import LoadingSpin from '../../Loading';
import { ROLES } from '../../../../common/enums';
import { ErrorMessage } from './styles';
import ProfileFormIndividual from './ProfileFormIndividual';
import ProfileFormBusiness from './ProfileFormBusiness';

export default class ProfileForm extends Component {
  static propTypes = {
    handleCancel: func.isRequired,
    checkPassword: func.isRequired,
    updateProfile: func.isRequired,
    isOpen: bool.isRequired,
    isCheckingPassword: bool.isRequired,
    isUpdating: bool.isRequired,
    passwordConfirmed: bool.isRequired,
    user: shape().isRequired,
  }

  state = {
    password: '',
    errorMessage: '',
  }

  componentDidUpdate = (prevProps) => {
    const { passwordConfirmed, isCheckingPassword, isUpdating } = this.props;
    if (prevProps.passwordConfirmed !== passwordConfirmed) {
      this.setState({
        password: '',
      });
    }
    if (prevProps.isCheckingPassword && !isCheckingPassword && !passwordConfirmed) {
      this.setState({
        password: '',
        errorMessage: 'Password not match',
      });
    }
    if (prevProps.isUpdating && !isUpdating) {
      this.handleCancel();
    }
  }

  handleChangePassword = (e) => {
    const { value } = e.target;
    this.setState({
      password: value,
    });
  }

  handleCancel = () => {
    const { handleCancel } = this.props;
    handleCancel();
  }

  handlePasswordSubmit = () => {
    const { checkPassword } = this.props;
    const { password } = this.state;
    checkPassword(password);
  }

  handleProfileUpdate = (values) => {
    const { updateProfile } = this.props;
    updateProfile(values);
  }

  renderProfileEditForm = () => {
    const { user } = this.props;
    const { profile, role } = user;
    if (role === ROLES.INDIVIDUAL) {
      return (
        <ProfileFormIndividual
          initialValues={profile}
          onSubmit={this.handleProfileUpdate}
          onCancel={this.handleCancel}
        />
      );
    }
    return (
      <ProfileFormBusiness
        initialValues={profile}
        onSubmit={this.handleProfileUpdate}
        onCancel={this.handleCancel}
      />
    );
  };

  render() {
    const {
      isOpen, isCheckingPassword, passwordConfirmed,
      isUpdating,
    } = this.props;
    const { password, errorMessage } = this.state;
    const loading = isCheckingPassword || isUpdating;
    return (
      <Modal
        visible={isOpen}
        onCancel={this.handleCancel}
        footer={
          !passwordConfirmed
            ? [
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" onClick={this.handlePasswordSubmit}>
                Submit
              </Button>,
            ]
            : []
        }
      >
        <LoadingSpin loading={loading}>
          {!passwordConfirmed
            ? (
              <div>
                <InputLabelStyled>Confirm Password:</InputLabelStyled>
                <InputStyled
                  type="password"
                  value={password}
                  onChange={this.handleChangePassword}
                />
                <ErrorMessage>{errorMessage}</ErrorMessage>
              </div>
            )
            : this.renderProfileEditForm()
          }
        </LoadingSpin>
      </Modal>
    );
  }
}
