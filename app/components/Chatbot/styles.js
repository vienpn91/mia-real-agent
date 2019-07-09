import styled, { css } from 'styled-components';
import { COLOR_BY_STATUS } from '../../../common/enums';
import FormInput from '../FormInput/FormInput';

export const ChatbotWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export const ChatbotTicketListWrapper = styled.div`
  flex: 0 0 350px;
  color: #000;
  background-color: #fff;
  border-right: 1px solid #d9d9d9;
  transition: all 300ms ease;
  .ant-input-search {
    .ant-input {
      background-color: #f5f6f7;
      border: none;
      &::placeholder {
        font-style: normal;
        color: #ccc;
      }
    }
  }
  .ant-menu {
    height: 100%;
    border-right: none;
    li {
      display: flex;
      align-items: center;
      height: 85px;
    }
  }
  .ant-menu-item {
    line-height: normal;
    color: #000;
    &:hover {
      color: #000;
      background-color: #f5f6f7;
      border-bottom: 1px solid #d9d9d9;
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
    color: #000;
    background-color: #f5f6f7;
    border-bottom: 1px solid #d9d9d9;
  }
  .ant-tabs-bar {
    margin: 0px 25px;
    border-bottom: none;
  }
  .ant-tabs-nav {
    width: 100%;
    > div {
      display: flex;
    }
    .ant-tabs-tab {
      flex: 1;
      text-align: center;
      margin: 0px;
      color: #000;
      opacity: 0.6;
      &:hover {
        color: #000;
        opacity: 1;
      }
    }
    .ant-tabs-tab-active {
      color: #000;
      font-weight: bold;
      opacity: 1;
    }
    .ant-tabs-ink-bar {
      background-color: #000;
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
  border-bottom: 1px solid #d9d9d9;
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
  font-weight: 700;
  margin-bottom: 5px;
  max-width: 280px;
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

export const TicketStatus = styled.div`
  span {
    font-size: 13px;
    &:first-child {
      padding-right: 10px;
    }
    &:last-child {
      padding: 10px;
      ${({ status }) => status
    && css`
        font-style: italic;
        color: ${[COLOR_BY_STATUS[status]]};
        opacity: 0.8;
      `};
    } 
  }

`;

export const TicketFilterWrapper = styled.div`
  padding: 16px;
  border-top: 1px solid #d9d9d9;
  .ant-select {
    margin-top: 5px;
    border-radius: 4px;
  }
  .ant-select-selection--multiple {
    color: #fff;
    border: 1px solid #d9d9d9;
    &:hover {
      border-color: #b1b1b1;
    }
  }
  .ant-select-open .ant-select-selection {
    border-color: #b1b1b1;
    box-shadow: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TicketPaginationWrapper = styled.div`
  padding: 0 16px;
  text-align: center;
  .ant-pagination-item.ant-pagination-item-active a {
    color: #000;
  }
  .ant-pagination-item-active {
    border-color: #d9d9d9;
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
  height: 100vh;
  background: #fff;
  position: relative;
`;

export const MessageBoxContent = styled.div`
  height: calc(100% - 60px);
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
      color: #fff;
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
    color: #000;
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

export const TicketDetailWrapper = styled.div``;

export const TicketDetailAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 15px;
  img {
    object-fit: cover;
    object-position: center;
  }
`;

export const TicketInfoWrapper = styled.div`
  .ant-descriptions-row {
    display: flex;
    flex-direction: column;
    padding: 20px 25px;
    border-bottom: 1px solid #d9d9d9 !important;
    > td {
      padding-bottom: 16px;
      padding-top: 16px;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #d9d9d9;
      &:last-child {
        border-bottom: none;
      }
      .ant-descriptions-item-label {
        font-size: 12px;
        color: #808080;
        &:after {
          content: none;
        }
      }
      .ant-descriptions-item-content {
        font-size: 15px;
        color: #000;
      }
    }
  }
`;

export const TicketTimelineWrapper = styled.div`
  padding: 25px;
  .ant-timeline-item-content {
    margin: 0px 0x 0px 25px;
  }
  .ant-timeline-item {
    padding: 0 0 30px;
  }
`;
