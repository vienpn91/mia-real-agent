import styled from 'styled-components';

export const TicketWrapper = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  border-bottom: 1px dashed #d4d0d0;
  :hover{
    background-color: #727272;
    cursor: pointer;
    color: white;
  }
`;

export const TitleStyled = styled.div`
  ::before{
    content: '- ';
  }

  ::after{
    content: ' -';
  }
`;
