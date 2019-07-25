import styled, { css } from 'styled-components';
import FormInput from '../FormInput/FormInput';

export const InfoNotification = styled.h2`
  margin: 50%;
  width: 200px;
  margin-left: calc(50% - 50px);
`;


export const MessageBoxWrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  background: ${props => props.theme.secondaryColor};
  position: relative;
`;

export const MessageBoxContent = styled.div`
  flex: 1;
  height: 100%;
  background-color: #f5f6f7;
`;

export const MessageBoxItem = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
  p {
    margin-bottom: 0;
    margin-top: 3px;
    width: fit-content;
    border-radius: 20px;
    padding: 5px 12px;
    word-break: break-all;
    clear: left;
  }
  ${({ left }) => left && css`
    justify-content: flex-start;
    padding-left: 10px;
    .ant-avatar {
      margin-right: 10px;
    }
    p {
      float: left;
      background-color: #e2e2e2;
    }
  `}
  ${({ right }) => right && css`
    justify-content: flex-end;
    padding-right: 10px;
    .ant-avatar {
      margin-left: 10px;
    }
    p {
      float: right;
      color: ${props => props.theme.secondaryColor};
      background-color: #ff5504;
    }
    > div{
     align-items: flex-end;
    }
  `}
  &:first-child {
    padding-top: 15px;
  }
`;

export const MessageBoxHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .ant-breadcrumb-link {
    color: ${props => props.theme.textColor};
  }
`;


export const MessageText = styled.div`
  width: fit-content;
  max-width: 60%;
  display: flex;
  flex-direction: column;
`;

export const UserMessage = styled.p`
  background-color: ${({ pending }) => pending && '#f78b5f !important'};
`;

export const MessageInputWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.secondaryColor};
  border-top: 1px solid #ddd;
  height: 60px;
  width: 100%;
  padding: 0px 10px;

  .ant-form-item{
    width: 100%;
    margin: 0;
    input{
      outline: none !important;
      border: 1px solid transparent !important;
    }
  }
  button{
    margin-left: 10px;
  }
`;

export const MessageActionWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 12px 0px;
`;

export const MessageInput = styled(FormInput)`
  flex: 1;
  border: none;
  height: 100%;
  &::placeholder {
    font-style: normal;
    color: #ccc;
  }
`;

export const MessageEmpty = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputAction = styled.label`
  margin-left: 15px;
  font-size: 22px !important;
  color: #b5b5b5;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.textColor};
  }
`;

export const InputUpload = styled.input`
  display: none;
`;
