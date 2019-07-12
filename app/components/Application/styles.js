import styled, { css, keyframes } from 'styled-components';
import { Input } from 'antd';

export const ApplicationWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/images/bg-login.jpg');
  background-position: left center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ApplicationItem = styled.div`
  width: 850px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.secondaryColor};
  box-shadow: 0px 0px 12px -2px #2a3a51;
  padding: 50px;
  color: #6e6c83fa;
  position: relative;
  z-index: 1;
  .ant-tabs-nav-wrap{
    display: none;
  }
  .ant-steps {
    margin-bottom: 35px;
  }
  .ant-steps-item {
    height: 38px;
    display: flex;
    align-items: center;
    overflow: unset;
    margin-right: 8px !important;
    &:before {
      position: absolute;
      content: '';
      left: 3px;
      top: 0;
      width: 100%;
      height: 50.5%;
      z-index: 1;
      transform: skew(20deg);
      border-radius: 2px 2px 0 0;
      background-color: #eee;
    }
    &:after {
      position: absolute;
      content: '';
      left: 3px;
      bottom: 0;
      width: 100%;
      height: 50.5%;
      z-index: 1;
      background-color: #eee;
      transform: skew(-20deg);
      border-radius: 0 0 2px 2px;
    }
    &:last-child {
      margin-right: 8px !important;
      .ant-steps-item-title {
        padding-right: 16px !important;
      }
    }
  }
  .ant-steps-item-icon {
    position: relative;
    z-index: 2;
    background: transparent !important;
    border: none !important;
    margin-right: 0px;
    margin-left: 8px;
    span {
      color: #aaa !important;
      font-size: 14px;
    }
  }
  .ant-steps-item-content {
    position: relative;
    z-index: 2;
  }
  .ant-steps-item-title {
    color: #aaa !important;
    font-size: 14px;
    &:after {
      content: none;
    }
  }
  .ant-steps-item.ant-steps-item-process,
  .ant-steps-item.ant-steps-item-finish {
    &:before,
    &:after {
      background-color: ${props => props.theme.primaryColor} !important;
    }
    .ant-steps-item-icon {
      span {
        color: ${props => props.theme.secondaryColor} !important;
      }
    }
    .ant-steps-item-title {
      color: ${props => props.theme.secondaryColor} !important;
    }
  }
  .ant-tabs-bar {
    display: none;
  }
`;

export const ApplicationTitle = styled.div`
  text-align: center;
  font-size: 32px;
  font-family: Countryside, sans-serif;
  margin-bottom: 55px;
  color: #000;
`;

export const ApplicationInputWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 30px;
`;

export const ApplicationInput = styled(Input)`
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

export const ApplicationLabel = styled.div`
  margin-bottom: 7.5px;
  color: ${props => props.theme.textColor};
`;

export const ApplicationBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
`;

export const ApplicationBtn = styled.button`
  min-width: 100px;
  margin-top: 20px;
  padding: 8px 25px;
  border-radius: 5px;
  border: 1px solid #eee;
  transition: .3s ease;
  background: #eee;
  color: #aaa;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 12px;
    font-weight: 700;
    margin-right: 5px;
  }
  &:hover {
    opacity: 0.7;
  }
  ${({ submit }) => submit && css`
    margin-left: auto;
    border: 1px solid ${props => props.theme.primaryColor};
    background: ${props => props.theme.primaryColor};
    color: ${props => props.theme.secondaryColor};
    i {
      margin-left: 5px;
      margin-right: 0px;
    }
  `}
`;


export const ApplicationFooter = styled.div`
  margin-top: 15px;
  text-align: center;
`;

export const ApplicationFooterText = styled.span`
`;

export const ApplicationFooterLink = styled.a`
  margin-left: 3px;
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const spin = keyframes`
  100% {
    transform:rotate(360deg);
  }
`;

export const ApplicationSpinner = styled.div`
  border: 2px solid;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border-color:black black black transparent;
  animation: ${spin} 2s linear infinite;
  margin-right: 5px;
  display: inline-block;
`;

export const ApplicationErrorMessage = styled.div`
  color: crimson;
  text-align: center;
  margin-bottom: 15px;
`;

export const SelectStyled = { width: '100%' };

export const ArrayInputWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 20px;
  color: ${props => props.theme.textColor};
`;

export const ArrayTagWrapper = styled.div`
  border-bottom: 1px solid #000;
  width: fit-content;
  padding: 5px 10px;
  margin-right: 15px;
  float: left;

  i:first-child {
    margin-left: 10px;
  }
  i {
    margin-right: 5px;
  }
  i:last-child {
    margin-right: 0;
  }
`;

export const ArrayAddButton = styled.button`
  display: flex;
  align-items: center;
  margin-right: 5px;
  padding: 5px 20px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.textColor};
  background-color: ${props => props.theme.secondaryColor};
  i {
    margin-right: 5px;
  }
  &:hover {
    border-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
  }
`;

export const RoleWrapper = styled.div`
  > button {
    width: calc(50% - 10px);
    border-radius: 3px;
    border: 1px solid ${props => props.theme.borderColor};
    background-color: ${props => props.theme.secondaryColor};
    height: 200px;
    &:first-child {
      margin-right: 10px;
    }
    &:last-child {
      margin-left: 10px;
    }
    &:hover {
      border-color: ${props => props.theme.primaryColor};
      div {
        color: ${props => props.theme.primaryColor};
      }
    }
    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 2em;
      color: ${props => props.theme.cancelColor};
      i {
        width: 100%;
        height: 35px;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;

export const SubmitSuccess = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  min-height: 120px;
  color: #28a745;
  i {
    margin-right: 10px;
    font-size: 18px;
    border: 1px solid #28a745;
    border-radius: 100%;
    padding: 5px;
  }
`;
