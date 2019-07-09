import styled from 'styled-components';
import { Menu } from 'antd';

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
