import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  margin: 10px 0;
  .ant-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CreateButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  button{
    width: 100%;
  }
`;

export const TicketListWrapper = styled.div`
  height: 300px;
`;

export const ActionBar = styled.div`
  padding: 20px;
  box-shadow: 0px -9px 10px 2px #f7f7f7;
`;

export const TicketListTitle = styled.div`
  padding: 10px 20px;
  font-size: 1.3em;
  border-bottom: 1px solid #d4d0d0;
`;
