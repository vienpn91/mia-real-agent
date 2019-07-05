import styled, { css } from 'styled-components';

export const TicketStatisticWarpper = styled.div`
  padding: 40px 35px;
`;

export const TicketStatisticSection = styled.div`
  display: flex;
  margin-bottom: 40px;
  @media (max-width: 960px) {
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
`;

export const TicketDetailWrapper = styled.div`
  flex: 0 0 calc(50% - 15px);
  margin-right: 15px;
  @media (max-width: 960px) {
    flex: 0 0 100%;
    margin-right: 0px;
    margin-bottom: 20px;
  }
`;

export const TicketDetailLeftItem = styled.div`
  border: 1px solid #ececec;
  padding: 15px 12px;
`;

export const TicketTitle = styled.div`
  border-bottom: 1px solid #ededed;
  padding: 0 10px 10px;
  text-transform: uppercase;
  font-size: 15px;
`;

export const TicketDetailBlock = styled.div`
  display: flex;
`;

export const TicketDetailGroupItem = styled.div`
  flex: 1;
  padding: 10px;
  border-right: 1px solid #f1f7f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TicketDetailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px 4px 0;
  font-size: 17px;
`;

export const TicketDetailContent = styled.div`
  a {
    color: unset;
    text-decoration: unset;
  }

  ${({ isAllTicket }) => isAllTicket
    && css`
      color: #db3f26;
    `};
`;

export const TicketDetailNumber = styled.div`
  font-size: 20px;
  ${({ isAllTicket }) => isAllTicket
    && css`
      color: #db3f26;
    `};
`;

export const TicketDetailGroupActiveItem = styled.div`
  flex: 0 0 40%;
  text-align: center;
`;

export const TicketDetailPercent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text {
    font-size: 14px;
  }
`;

export const TicketTopWrapper = styled.div`
  flex: 0 0 calc(50% - 15px);
  margin-left: 15px;
  position: relative;
  @media (max-width: 960px) {
    flex: 0 0 100%;
    margin-left: 0px;
  }
`;

export const TicketTopRightItem = styled.div`
  border: 1px solid #ececec;
  padding: 15px 12px;
  height: 100%;
`;

export const TicketTopTitle = styled.div`
  text-transform: uppercase;
  font-size: 15px;
`;

export const TicketTopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px 10px;
  border-bottom: 1px solid #ededed;
`;

export const TicketTopTimeSelect = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 15px;
  i {
    margin-left: 3px;
    font-size: 18px;
  }
  &:hover {
    color: #41a0d9;
  }
`;

export const TicketTopContent = styled.div`
  height: calc(100% - 15px);
  min-height: 180px;
  display: flex;
  justify-content: center;
`;

export const TicketTopEmpty = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
`;

export const TopTicketItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 100%;
  border-right: 1px solid #f1f7f8;
  flex: 0 0 calc(100% / 3);
  &:last-child {
    border-right: none;
  }
`;

export const TopTicketItemThumbnail = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: center;

  img {
    max-height: 100%;
    max-width: 100%;
  }
`;

export const TopTicketItemArticle = styled.span`
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100px;
  text-align: center;
`;

export const TopTicketQuantityWrapper = styled.div`
  font-size: 12px;
`;

export const TopTicketQuantity = styled.span`
  margin-right: 5px;
  font-size: 24px;
  font-weight: 900;
`;
