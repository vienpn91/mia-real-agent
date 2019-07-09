import styled, { css } from 'styled-components';

export const TicketActivityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f7f7f8;
  border-bottom: 1px solid #d9d9d9;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`;

export const TicketActivityLeftItem = styled.div`
  flex: 1;
  padding: 30px 35px;
  position: relative;
  @media (max-width: 1024px) {
    padding: 15px 20px;
  }
`;

export const TicketActivityRightItem = styled.div`
  flex: 0 0 32%;
  padding: 30px 35px 30px 40px;
  border-left: 1px solid #d9d9d9;
  @media (max-width: 1024px) {
    flex: 0 0 100%;
    padding: 15px 20px;
  }
`;

export const TicketActivityTitle = styled.div`
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

export const TicketActivityItem = styled.div`
  flex: 1;
  text-align: center;
  width: 22%;
  margin-right: 20px;
  padding: 7px;
  height: 120px;
  border: 1px solid #dae1e4;
  border-radius: 7px;
  background-color: ${props => props.theme.secondaryColor}
  cursor: pointer;
  &:hover {
    border: 1px solid #ff5402;
  }
  &:last-child {
    margin-right: 0px;
  }
`;

export const TicketActivityGroupItem = styled.div`
  display: flex;
  justify-content: space-between;

  & ${TicketActivityItem}:last-child {
    margin-right: 0px;
  }
`;

export const TicketActivityNumber = styled.div`
  font-size: 36px;
  ${({ color }) => color
    && css`
      color: ${color};
    `};
`;

export const TicketActivityUnit = styled.div`
  font-size: 11px;
  color: #8d99ae;
  text-transform: capitalize;
`;

export const TicketActivityPurpose = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin-top: 10px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    border: 1px solid #747474;
    border-radius: 100%;
    margin-right: 5px;
    padding: 2px;
    font-size: 7px;
  }
`;

export const TicketActivityQuantityGroup = styled.div`
  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const TicketActivityQuantityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dae1e4;
  border-radius: 7px;
  background-color: ${props => props.theme.secondaryColor}
  margin-bottom: 15px;
  padding: 15px 18px;
  height: 50px;
  &:hover {
    border: 1px solid #ff5402;
  }
  @media (max-width: 1024px) {
    flex: 1;
    &:first-child {
      margin-right: 20px;
    }
  }
`;

export const TicketActivityQuantityContent = styled.div`
  font-size: 13px;
  color: #666;
  text-transform: uppercase;
`;

export const TicketActivityQuantityNumber = styled.div`
  font-size: 25px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: -10px;
    top: 0;
    width: 1px;
    height: 30px;
    background-color: #dae1e4;
  }
`;
