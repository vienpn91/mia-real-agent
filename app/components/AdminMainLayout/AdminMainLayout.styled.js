import styled, { css } from 'styled-components';

export const AdminPageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin-left: 260px;
  transition: all 300ms ease;

  ${({ isToggle }) => isToggle && css`
    margin-left: 50px;
  `}
`;
