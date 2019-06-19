import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-height: 736px) {
    height: 100%;
  }
`;

export const Card = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 3px 10px 3px #e7e7e7;
  color: #000;
`;

export const Header = styled.div``;

export const LeftContainer = styled.div`
  box-shadow: 5px 0 5px #d0d0d0;    
  box-sizing: border-box;
  height: 600px;
`;

export const RightContainer = styled.div``;

export const AssignWrapper = styled.div`
  padding: 20px;
  box-shadow: 0 2px 10px 1px #e7e7e7;
  box-sizing: border-box;
  font-size: 1.3em;
`;

export const AssignTitle = styled.div`
  margin-bottom: 10px;
`;

export const AssigneeStyled = styled.span`
  font-size: 1.2em;
  font-weight: 500;
  margin-right: 10px;
`;

export const TicketTitle = styled.span`
  font-size: 1.2em;
  font-weight: 500;
  margin-right: 10px;
`;

export const AssignActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DashboardLogo = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  font-size: 1.5em;
  font-weight: 500;
  color: white;
  background: #171717;
  font-style: italic;
`;
