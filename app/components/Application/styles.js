import styled, { css, keyframes } from 'styled-components';
import { Input } from 'antd';
import { LoginWrapper } from '../Login/styles';

export const ApplicationWrapper = styled(LoginWrapper)`
  textarea.ant-input {
    resize: none;
  }
`;

export const ApplicationTitle = styled.div`
  text-align: center;
  font-size: 2em;
  width: 14.125em;
  height: 5.063em;
  margin: 0 auto 1.5em;
  color: ${props => props.theme.colorStyled.ColorBlack};
  span {
    text-align: center;
    font-size: 18px;
    margin-bottom: 40px;
    display: inline-block;
    color: #6e6c83fa;
    width: 100%;
  }
  img {
    width: 100%;
    object-position: bottom;
    height: 100%;
    max-height: 115px;
    max-width: 175px;
    object-fit: contain;
  }
`;

export const ApplicationItem = styled.div`
  padding: 2em;
  width: 850px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  box-shadow: ${props => props.theme.boxShandow.loginPage};
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
        color: ${props => props.theme.colorStyled.ColorWhite} !important;
      }
    }
    .ant-steps-item-title {
      color: ${props => props.theme.colorStyled.ColorWhite} !important;
    }
  }
  .ant-tabs-bar {
    display: none;
  }
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
  color: ${props => props.theme.colorStyled.ColorBlack};
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
    color: ${props => props.theme.colorStyled.ColorWhite};
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
  margin-top: 20px;
  color: ${props => props.theme.colorStyled.ColorBlack};

  p{
    margin-top: 3px;
    margin-bottom: 1em;
    width: fit-content;
    margin-right: 10px;
    float: left;
  }
`;

export const ArrayWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;  
  flex-direction: column;
`;

export const ArrayTagWrapper = styled.div`
  width: 100%;
  padding: 15px 0px;    
  border-bottom: 1px solid #efeaea;
  position: relative;
  color: ${props => props.theme.colorStyled.ColorBlackTertiary};

  .WorkEducation{
    align-items: center;
    display: flex;
    .WorkEducationText{
      flex: 1; 
    }
    .language{
      strong{
        position: relative;
        margin: 0px 5px 0px 5px;
        padding-right: 10px;
        margin-right: 8px;
        &:after{
          content: '';
          width: 3px;
          height: 3px;
          background: #858585;
          border-radius: 100%;
          display: inline-block;
          position: absolute;
          top: 9px;
          right: 0px;
                  
        }
      }
    }
    a{
      color: #4a4a4a;
      &:hover{
        color: #ff5402;
      }
    }
    h2 {
      white-space: nowrap; 
      margin: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      font-weight: 600;
      font-size: 1.1em;
      span{
        font-weight: 400;
        position: relative;
        margin: 0px 5px 0px 5px;
        padding-left: 10px;
        margin-left: 8px;
        &:after{
          content: '';
          width: 3px;
          height: 3px;
          background: #858585;
          border-radius: 100%;
          display: inline-block;
          position: absolute;
          top: 9px;
          left: 0px
                  
        }
      }
    }
  }

  .WorkExperience{
    align-items: center;
    display: flex;
    .WorkExperienceText{
      flex: 1; 
    }
    h2 {
      white-space: nowrap; 
      margin: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      font-weight: 600;
      font-size: 1.1em;
      span{
        font-weight: 400;
        margin: 0px 5px 0px 5px;
      }
    }
    .time{
      display: flex;
      align-items: center;
      span{
        display: inline;        
      }
      .from{
        margin-right: 3px;
        text{
          font-size: 13px;
          font-style: italic;
          margin-right: 5px;
        }
      }
      .to{
        text{
          font-style: italic;
          font-size: 13px;
        }
      }
      .location{
        padding-right: 13px;
        position: relative;
        margin-right: 10px;
        &:after{
          content: '';
          width: 3px;
          height: 3px;
          background: #858585;
          border-radius: 100%;
          display: inline-block;
          position: absolute;
          top: 9px;
          right: 0px
                  
        }
      }
    }
  }
 
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  position: relative;
  p {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
    width: calc(100% - 40px);
    float: unset !important;
  }
`;

export const DescriptionNumber = styled.span`
  font-weight: 400;
  position: relative;
  margin: 0px 5px 0px 5px;
  padding-left: 10px;
  margin-left: 8px;
  &:after{
    content: '';
    width: 3px;
    height: 3px;
    background: #858585;
    border-radius: 100%;
    display: inline-block;
    position: absolute;
    top: 9px;
    left: 0px
            
  }
`;

export const TagAction = styled.div`  
  padding-right: 20px;
  i{
    color: #d2d2d2;
    &:hover{
      color: #000;
    }
  }
  .anticon-close{
    margin-left: 15px;
    &:hover{
      color: red;
    }
  }
`;

export const ArrayAddButton = styled.button`
  display: flex;
  align-items: center;
  margin-right: 5px;
  border-radius: 5px;
  padding: 5px 10px 5px 5px;
  font-size: 13px;
  border-radius: 3px;
  color: #ff5402;
  background: white;
  border: 1px solid #ff5402;
  i {
    margin-right: 3px;
  }
  &:hover {
    border-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
  }
`;

export const RoleWrapper = styled.div`
  > button {
    width: calc(50% - 10px);
    background: transparent;
    border: none;
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
      color: ${props => props.theme.colorStyled.ColoraBtnCancel};
      color: #2f2f2f;
      font-size: 22px;
      
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
