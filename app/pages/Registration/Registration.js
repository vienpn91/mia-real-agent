import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import {
  RegistrationWrapper,
  RegistrationItem, RegistrationTitle,
  LinkWrapper,
} from './styles';


const Registration = () => (
  <RegistrationWrapper>
    <RegistrationItem>
      <RegistrationTitle>Are you a</RegistrationTitle>
      <LinkWrapper>
        <div>
          <Link to="/register/individual">
            <Icon type="user" />
            Individual
          </Link>
        </div>
        <div>
          <Link to="/register/business">
            <Icon type="usergroup-add" />
            Business
          </Link>
        </div>
      </LinkWrapper>
    </RegistrationItem>
  </RegistrationWrapper>
);

export default Registration;
