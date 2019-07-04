import styled from 'styled-components';

export const DashboardWrapperStyled = styled.div`
  position: relative;
  height: 100%;
  width: calc(100% - 250px);
  margin-left: 250px;
  left: 0;
  color: #222222;
  background-color: #fff;
  transition: all 300ms ease;
  overflow: auto;
  @media (max-width: 1280px) {
    width: calc(100% - 50px);
    margin-left: 50px;
  }
`;

export const DashboardStatisticWarpper = styled.div`
  padding: 40px 35px;
`;
