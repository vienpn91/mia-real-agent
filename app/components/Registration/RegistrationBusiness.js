import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select } from 'antd';
import {
  RegistrationWrapper,
  RegistrationCard,
  RegistrationInput,
  RegistrationLabel,
  RegistrationInputWrapper,
  RegistrationTitle,
  RegistrationBtn,
  RegistrationFooter,
  RegistrationFooterText,
  RegistrationFooterLink,
  RegistrationSpinner,
  RegistrationErrorMessage,
  SelectStyled,
} from './styles';

class Registration extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  state = {
    email: '',
    password: '',
    username: '',
    companyName: '',
    companySize: '',
    address: '',
    phoneNumber: '',
  }

  handleInputChanged = fieldName => ({ target }) => {
    this.setState({
      [fieldName]: target.value,
    });
  }

  register = () => {
    const { email, password } = this.state;
    const { register } = this.props;
    register(email, password);
  }

  renderRegisterBtn = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <RegistrationBtn>
          <RegistrationSpinner />
          Registering business
        </RegistrationBtn>
      );
    }
    return (
      <RegistrationBtn
        onClick={this.register}
      >
        Register
      </RegistrationBtn>
    );
  }

  render() {
    const {
      email, password, username, companySize, companyName,
      company, address, phoneNumber,
    } = this.state;
    const { errorMessage } = this.props;

    return (
      <RegistrationWrapper>
        <RegistrationCard>
          <RegistrationTitle>Mia Consult</RegistrationTitle>
          <Row gutter={32}>
            <Col sm={12} xs={24}>
              <RegistrationInputWrapper>
                <RegistrationLabel>Username</RegistrationLabel>
                <RegistrationInput
                  type="text"
                  value={username}
                  onChange={this.handleInputChanged('username')}
                />
              </RegistrationInputWrapper>
            </Col>
            <Col sm={12} xs={24}>
              <RegistrationInputWrapper>
                <RegistrationLabel>Password</RegistrationLabel>
                <RegistrationInput
                  type="password"
                  value={password}
                  onChange={this.handleInputChanged('password')}
                />
              </RegistrationInputWrapper>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col sm={12} xs={24}>
              <RegistrationInputWrapper>
                <RegistrationLabel>Company name</RegistrationLabel>
                <RegistrationInput
                  type="text"
                  value={companyName}
                  onChange={this.handleInputChanged('companyName')}
                />
              </RegistrationInputWrapper>
            </Col>
            <Col sm={12} xs={24}>
              <RegistrationInputWrapper>
                <RegistrationLabel>Company size</RegistrationLabel>
                <RegistrationInput
                  type="text"
                  value={companySize}
                  onChange={this.handleInputChanged('companySize')}
                />
              </RegistrationInputWrapper>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col sm={12} xs={24}>
              <RegistrationInputWrapper>
                <RegistrationLabel>Company working fields</RegistrationLabel>
                <Select
                  showSearch
                  style={SelectStyled}
                  placeholder="Select fields"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Select.Option value="IT">IT</Select.Option>
                  <Select.Option value="Consultant">Consultant</Select.Option>
                  <Select.Option value="Accounting">Accounting</Select.Option>
                </Select>
              </RegistrationInputWrapper>
            </Col>
            <Col sm={12} xs={24}>
              <RegistrationInputWrapper>
                <RegistrationLabel>Address</RegistrationLabel>
                <RegistrationInput
                  type="text"
                  value={address}
                  onChange={this.handleInputChanged('address')}
                />
              </RegistrationInputWrapper>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col sm={12} xs={24}>
              <RegistrationInputWrapper>
                <RegistrationLabel>Email</RegistrationLabel>
                <RegistrationInput
                  type="email"
                  value={email}
                  onChange={this.handleInputChanged('email')}
                />
              </RegistrationInputWrapper>
            </Col>
            <Col sm={12} xs={24}>
              <RegistrationInputWrapper>
                <RegistrationLabel>Phone No.</RegistrationLabel>
                <RegistrationInput
                  type="text"
                  value={phoneNumber}
                  onChange={this.handleInputChanged('phoneNumber')}
                />
              </RegistrationInputWrapper>
            </Col>
          </Row>
          {errorMessage ? (
            <RegistrationErrorMessage>
              {errorMessage}
            </RegistrationErrorMessage>
          ) : null}
          {this.renderRegisterBtn()}
          <RegistrationFooter>
            <RegistrationFooterText>Already had an account?</RegistrationFooterText>
            <RegistrationFooterLink href="/login">
              Login now!
            </RegistrationFooterLink>
          </RegistrationFooter>
        </RegistrationCard>
      </RegistrationWrapper>
    );
  }
}

export default Registration;
