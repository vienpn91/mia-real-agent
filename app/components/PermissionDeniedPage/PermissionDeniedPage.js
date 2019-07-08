import React from 'react';
import ErrorContent from 'components/ErrorContent';
import { PageWrapper } from './PermissionDeniedPage.styled';

const PermissionDeniedPage = () => (
  <PageWrapper>
    <ErrorContent error="You don't have permission to perform this operation. Please contact your Administrator." />
  </PageWrapper>
);

export default PermissionDeniedPage;
