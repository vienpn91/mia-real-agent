import React from 'react';
import { SpinnerWrapperStyled, SpinnerItemStyled } from './PageLoading.styled';

export default function SpinnerLoading() {
  return (
    <SpinnerWrapperStyled className="spinner-container">
      <SpinnerItemStyled>
        <div className="main-circle" />
        <div className="sub-circle" />
      </SpinnerItemStyled>
    </SpinnerWrapperStyled>
  );
}
