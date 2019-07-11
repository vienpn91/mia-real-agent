import styled, { css } from 'styled-components';

export const DashboardWrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 260px;
  transition: all 300ms ease;
  ${({ isToggle }) => isToggle && css`
    margin-left: 50px;
  `}
`;

export const DashboardStatisticWarpper = styled.div`
  padding: 30px 35px;
`;
