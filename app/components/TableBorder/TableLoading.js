import React from 'react';
import SpinnerLoading from 'components/PageLoading/SpinnerLoading';
import { TableLoadingStyled } from './TableBorder.styled';

const TableLoading = () => (
  <TableLoadingStyled>
    <SpinnerLoading />
  </TableLoadingStyled>
);

export default TableLoading;
