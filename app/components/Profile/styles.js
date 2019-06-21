import styled from 'styled-components';
import { Row } from 'antd';

export const ProfileWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-height: 736px) {
    height: 100%;
  }
`;

export const ProfileCard = styled.div`
  width: 720px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 3px 10px 3px #e7e7e7;
  padding: 50px;
  color: #000;
`;

export const ProfileTitle = styled.div`
  text-align: center;
  font-size: 32px;
  font-family: Countryside, sans-serif;
  margin-bottom: 55px;
`;

export const InputStyled = styled.div`
  width: 100% !important;
  height: 27.5px !important;
  border: 0 !important;
  padding: 0 !important;
  outline: 0 none !important;
  -webkit-transition: border-color .2s linear !important;
  transition: border-color .2s linear !important;
  border-bottom: 1px solid #000 !important;
  -webkit-font-smoothing: antialiased !important;
  border-radius: 0 !important;  
  :focus {
    box-shadow: none !important;
  }
`;

export const InputLabelStyled = styled.div`
  color: #000;
  label{
    float: left;
    ::after{
      content: '' !important;
    }
  }
`;

export const RowStyled = styled(Row)`
  margin-bottom: 25px;
`;
