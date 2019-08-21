import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import {
  RegistrationWrapper,
  RegistrationItem, RegistrationTitle,
  LinkWrapper,
} from './styles';
import { toI18n } from '../../utils/func-utils';


const Registration = () => (
  <RegistrationWrapper>
    <RegistrationItem>
      <RegistrationTitle>{toI18n('REGISTER_WHO_ARE_YOU')}</RegistrationTitle>
      <LinkWrapper>
        <div>
          <Link to="/register/individual">
            <Icon type="user" />
            {toI18n('REGISTER_INDIVIDUAL')}
          </Link>
        </div>
        <div>
          <Link to="/register/business">
            <Icon type="usergroup-add" />
            {toI18n('REGISTER_BUSINESS')}
          </Link>
        </div>
      </LinkWrapper>
    </RegistrationItem>
  </RegistrationWrapper>
);

export default Registration;
