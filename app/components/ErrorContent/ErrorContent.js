import React from 'react';
import PropTypes from 'prop-types';
import { ContentWrapper, ErrorTitle, ErrorMsg } from './ErrorContent.styled';

export default function ErrorContent(props) {
  const { error } = props;

  return (
    <ContentWrapper>
      <ErrorTitle>Oops</ErrorTitle>
      <ErrorMsg>{error}</ErrorMsg>
    </ContentWrapper>
  );
}

ErrorContent.propTypes = {
  error: PropTypes.string.isRequired,
};
