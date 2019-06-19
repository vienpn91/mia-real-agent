import styled, { css } from 'styled-components';

export const ChatbotWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export const ChatbotMessengerListWrapper = styled.div`
  flex: 0 0 400px;
  background-color: #fff;
  .ant-input-search {
    input {
      background-color: #f5f6f7;
      &::placeholder {
        font-style: normal;
        color: #ccc;
      }
    }
  }
  .ant-menu {
    height: 100%;
    li {
      display: flex;
      align-items: center;
      height: 64px;
    }
  }
  .ant-menu-item {
    .anticon {
      margin-right: 0px;
    }
  }
  .ant-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    margin-right: 10px;
  }
  .ant-menu-inline {
    .ant-menu-item {
      line-height: normal;
    }
  }
  @media (max-width: 1024px) {
    flex: 0 0 300px;
  }
  @media (max-width: 768px) {
    flex: 0 0 60px;
    .ant-avatar {
      margin-right: 0px;
    }
    .ant-menu {
      li {
        justify-content: center;
        height: 54px;
      }
    }
  }
`;

export const ChatbotContentWrapper = styled.div`
  flex: 1;
  .ant-breadcrumb {
    background-color: #fff;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    border-bottom: 1px solid #ddd;
  }
`;

export const MessengerHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 24px;
  height: 60px;
  border-bottom: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  span {
    font-weight: 700;
  }
  ${({ search }) => search && css`
    border-bottom: none;
    @media (max-width: 768px) {
      display: none;
    }
  `};
  @media (max-width: 768px) {
    .anticon-setting, span {
      display: none;
    }
  }
`;

export const MessengerGroup = styled.div`
  flex: 1;
  line-height: normal;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MessengerUserName = styled.span`
  color: #000;
  font-size: 15px;
`;

export const SubMessage = styled.div`
  color: #999;
  font-size: 13px;
  width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  @media (max-width: 1024px) {
    width: 125px;
  }
`;

export const MessengerTime = styled.div`
  margin-left: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MessageBoxWrapper = styled.div`
  height: calc(100vh - 60px);
  background: #fff;
  position: relative;
`;

export const MessageBoxContent = styled.div`
  height: 100%;
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
      background-color: #f1f0f0;
    }
  `};
  ${({ right }) => right && css`
    justify-content: flex-end;
    padding-right: 10px;
    .ant-avatar {
      margin-left: 10px;
    }
    p {
      float: right;
      color: #fff;
      background-color: #0084ff;
    }
  `};
  &:first-child {
    padding-top: 15px;
  }
  
`;

export const MessageText = styled.div`
  width: fit-content;
  max-width: 60%;
`;

export const MessageInputWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ddd;
  height: 60px;
  width: 100%;
  padding: 0px 10px;
`;

export const MessageActionWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 12px 0px;
  label {
    margin-left: 15px;
    font-size: 30px;
    color: #b5b5b5;
    cursor: pointer;
  }
`;

export const MessageInput = styled.input`
  flex: 1;
  border: none;
  height: 100%;
  &::placeholder {
    font-style: normal;
    color: #ccc;
  }
`;

export const InputAction = styled.label``;

export const InputUpload = styled.input`
  display: none;
`;
