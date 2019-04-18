import React from 'react';
import {
  RegistrationWrapper,
  RegistrationCard,
  RegistrationInput,
  RegistrationLabel,
  RegistrationInputWrapper,
  RegistrationTitle,
  RegistrationBtn,
} from './styles';

const Registration = () => (
  <RegistrationWrapper>
    <RegistrationCard>
      <RegistrationTitle>Mia Consult</RegistrationTitle>
      <RegistrationInputWrapper>
        <RegistrationLabel>Email</RegistrationLabel>
        <RegistrationInput type="email" />
      </RegistrationInputWrapper>
      <RegistrationInputWrapper>
        <RegistrationLabel>Password</RegistrationLabel>
        <RegistrationInput type="passport" />
      </RegistrationInputWrapper>
      <RegistrationBtn>Registration</RegistrationBtn>
    </RegistrationCard>
  </RegistrationWrapper>
);

export default Registration;
