import styled, { css } from 'styled-components';
import { COLOR_BY_STATUS } from '../../../common/enums';
import FormInput from '../FormInput/FormInput';

export const ChatbotWrapper = styled.div`
  display: flex;
  height: calc(100vh - 64px);
`;

export const ChatbotTicketListWrapper = styled.div`
  flex: 0 0 400px;
  background-color: #363e47;
  color: #fff;
  transition: all 300ms ease;
  .ant-input-search {
    .ant-input-search-icon {
      color: #fff;
    }
    input {
      background-color: #303841;
      color: #fff;
      border: none;
      &:focus {
        border-color: #363e47 !important;
      }
      &::placeholder {
        font-style: normal;
        color: #ccc;
      }
    }
  }
  .ant-menu {
    height: 100%;
    background-color: #363e47;
    color: #fff;
    border-right: none;
    li {
      display: flex;
      align-items: center;
      height: 85px;
    }
  }
  .ant-menu-item {
    line-height: normal;
    &:hover {
      color: unset;
      background-color: #3f4953;
      .anticon-setting {
        visibility: visible;
      }
    }
    .anticon {
      margin-right: 0px;
      margin-top: 5px;
    }
  }
  .ant-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    margin-right: 10px;
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #3f4953;
    color: #fff;
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
    .ant-menu-vertical {
      .ant-menu-item {
        padding: 0 8px;
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

export const TicketHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 24px;
  height: 60px;
  border-bottom: 1px solid #303841;
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

export const TicketItemWrapper = styled.div`
  height: calc(100% - 120px);
`;

export const TicketGroup = styled.div`
  flex: 1;
  line-height: normal;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TicketName = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TicketTime = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: normal;
  i {
    &:hover {
      color: #f9ba59;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TicketCategory = styled.div`
  flex: 0 0 100px;
  height: 100%;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 700;
`;

export const TicketStatus = styled.div`
  ${({ status }) => status
    && css`
      font-style: italic;
      color: ${[COLOR_BY_STATUS[status]]};
      opacity: 0.7;
    `};
`;

export const TicketFilterWrapper = styled.div`
  padding: 16px;
  border-top: 1px solid #303841;
  .ant-select {
    margin-top: 5px;
    border-radius: 4px;
  }
  .ant-select-selection--multiple {
    background-color: #303841;
    color: #fff;
    border: none;
  }
  .ant-select-open .ant-select-selection {
    border: none;
    box-shadow: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TicketPaginationWrapper = styled.div`
  padding: 0 16px;
  text-align: center;
  .ant-pagination-item a {
    color: #fff;
    &:hover {
      color: #9e9e9e;
    }
  }
  .ant-pagination-item.ant-pagination-item-active a {
    color: #000;
  }
  .ant-pagination-item-active {
    border-color: #000;
  }
  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      color: #fff;
      &:hover {
        color: #9e9e9e;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TickerActionWrapper = styled.div``;

export const TicketGroupAction = styled.div``;

export const TicketButton = styled.div`
  padding: 6px 15px;
  cursor: pointer;
  &:hover {
    background-color: #279cd4;
    color: #fff;
  }
`;

export const MessageBoxWrapper = styled.div`
  height: calc(100vh - 64px);
  background: #fff;
  position: relative;
`;

export const MessageBoxContent = styled.div`
  height: calc(100% - 60px);
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

export const MessageBoxHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .ant-breadcrumb-link {
    color: #595959;
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

  .ant-form-item{
    width: 100%;
    margin: 0;
    input{
      outline: none !important;
      border: 1px solid transparent !important;
    }
  }
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

export const MessageInput = styled(FormInput)`
  flex: 1;
  border: none;
  height: 100%;
  &::placeholder {
    font-style: normal;
    color: #ccc;
  }
`;

export const InputAction = styled.label`
  &:hover {
    color: #000;
  }
`;

export const InputUpload = styled.input`
  display: none;
`;

export const TicketEmpty = styled.div`
  padding: 15px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
`;
