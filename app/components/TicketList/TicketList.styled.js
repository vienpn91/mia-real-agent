import styled, { css } from 'styled-components';
import { Menu } from 'antd';
import { COLOR_BY_STATUS } from '../../../common/enums';

export const MenuStyled = styled(Menu)`
  background-color: transparent !important;

  li{
    margin-top: 5px;
    height: 30px !important;
  }

  svg{
    text-align: end;
    font-size: 1.3em;
  }

  .ant-menu-submenu-arrow{
    display: none;
  }

  .ant-menu-submenu-title{
    padding-right: 5px !important;
  }
`;


export const TimeCreateTicket = styled.span`
  opacity: 0.5;
  font-size: .9em;
  padding-left: 1.35em;
`;



export const TicketAction = styled.div`
  span{
   
  }
  .anticon{
    opacity: .7;
    margin-left: .7em;
    font-size: 1em;
    &:hover {      
      font-size: 1em;      
      opacity: 1;
    }
  }
`;

export const TicketGroup = styled.div`
  font-size: 1em;
  margin-bottom: .2em;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  text-overflow: ellipsis;  
`;

export const TicketName = styled.div`
  font-weight: 600;
  flex: 1;
  font-size: 1.1em;
  &.Closed{
    font-weight: 400;
  }
`;

export const TicketItemStyled = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  line-height: normal;  
  @media (max-width: 768px) {
    display: none;
  } 
`;


export const TicketItemWrapper = styled.div`
  height: calc(100% - 120px);
  position: relative;
`;
export const FilterContainer = styled.div`
  position: absolute;
  top: -60px;
  right: 0px;    
  z-index: 9;
  width : 100%;
  overflow: hidden;
  &.filter-hide{
    .ant-select-enabled{
      right: -110%;
      
    }
  }
`;

export const TicketFilterWrapper = styled.div`
  padding: 1em 1.5em;
  border-top: 1px solid #d9d9d9;  
  display: flex;
  align-items: center;
  width: 100%;

  .anticon-filter{
    margin-left: .75em;
  }
  .ant-select{
    width: 100%;
  }
  .ant-select-selection--multiple {
    color: ${props => props.theme.secondaryColor};
    border: 1px solid #d9d9d9;
    &:hover {
      border-color: #b1b1b1;
    }
  }
  .ant-select-open .ant-select-selection {
    border-color: #b1b1b1;
    box-shadow: none;
  }
  @media (max-width: 1024px) {
    padding: 15px;
  }
  @media (max-width: 840px) {
    display: none;
  }
`;

export const TicketPaginationWrapper = styled.div`
  padding: 0 16px;
  text-align: center;
  .ant-pagination-item,
  .ant-pagination-prev,
  .ant-pagination-next {
    height: auto !important;
    line-height: normal !important;
    &:hover {
      a {
        color: ${props => props.theme.primaryColor};
      }
    }
  }
  .ant-pagination-item.ant-pagination-item-active a {
    color: ${props => props.theme.textColor};
  }
  .ant-pagination-item-active {
    border: none;
    a {
      color: ${props => props.theme.primaryColor} !important;
    }
    &:hover {
      color: ${props => props.theme.primaryColor};
    }
  }
  @media (max-width: 840px) {
    display: none;
  }
`;

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
`;


export const TicketStatus = styled.div`
  width: .75em;
  height: .75em;
  border-radius: 50%;
  margin-right: .5em;
  display: inline-table;
  background: ${({ status }) => [COLOR_BY_STATUS[status]]};
`;
