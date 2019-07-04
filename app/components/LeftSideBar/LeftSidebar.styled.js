/* eslint-disable indent */
import styled, { css } from 'styled-components';

export const LeftSideBarStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: calc(100vh - 50px);
  width: 250px;
  box-shadow: 0 1px 30px 1px rgba(0, 0, 0, 0.11);
  background: #2d373c;
  transition: all 300ms ease;
  overflow: auto;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  @media (max-width: 1280px) {
    width: 50px;
    ${({ isOpen }) => isOpen
      && css`
        width: 200px;
      `};
  }
`;

export const SidebarBlockStyled = styled.ul`
  font-size: 14px;
  margin-top: 15px;
  & > a {
    text-decoration: none;
    cursor: pointer;
  }
  @media (max-width: 1280px) {
    margin-top: 0px;
  }
`;

export const SidebarToggleButton = styled.div`
  font-size: 28px;
  color: #fff;
  padding: 16px;
  height: 38px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 300ms ease;
  ${({ isOpen }) => isOpen
    && css`
      i {
        transform: rotate(180deg);
      }
    `};
`;

const SidebarItemOpen = css`
  margin-left: 30px;
  opacity: 1;
`;


export const SidebarItemStyled = styled.li`
  color: #d9d9d9;
  height: 40px;
  width: 200px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 12px 10px 12px 15px;
  background: transparent;
  border: none;
  transition: all 300ms ease;
  & > span {
    line-height: 15px;
    margin-left: 10px;
  }
  &:hover {
    background-color: #1f282d;
    color: #2fa3e6;
  }
  ${({ actived }) => actived
    && css`
      background-color: #1f282d;
      color: #2fa3e6;
    `};
  @media (max-width: 1280px) {
    padding: 16px;
    span {
      margin-left: 100px;
      opacity: 0;
      white-space: nowrap;
      transition: all 500ms ease;
      ${({ isOpen }) => isOpen && SidebarItemOpen};
    }
  }
`;
