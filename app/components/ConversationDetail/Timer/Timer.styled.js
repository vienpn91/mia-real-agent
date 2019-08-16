import styled from 'styled-components';
import { Row, Col } from 'antd';

export const TimerContainer = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 0 25px;
  padding-top: 15px;
`;

export const TimerStyled = styled(Col)`
  border-bottom: 1px solid #d9d9d9;
  border-right: 0;
  border-left: 0;
  padding: 5px;
  padding-bottom: 15px;
  :first-of-type{
    border-left: 0;
  }
`;

export const TimerTitle = styled.div`
  color: #939094;
  font-size: .8em;
  /* font-weight: 600; */
`;

export const TimerValue = styled.div`
  font-weight: 600;
  padding: 2px 0;
  font-size: 1.2em;
  display: flex;
  /* justify-content: center;
  align-items: center; */
`;
