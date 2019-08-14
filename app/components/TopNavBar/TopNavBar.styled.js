import styled from 'styled-components';
import { Icon } from 'antd';

export const TopNavBarWrapper = styled.div`
  .ant-layout-header {
    display: flex;
    align-items: center;
    height: 4.5em;
    padding: 0px 1.5em;
    background-color: ${props => props.theme.textColor};
    box-shadow: 0px 0px 6px -1px ${props => props.theme.textColorSecondary};
    position: relative;
    z-index: 1;
  }
  .ant-dropdown-link {
    color: ${props => props.theme.textColor};
  }
`;

export const UserName = styled.span`
  margin: 0 .5em;
  font-weight: 400;
  font-size: .85em;
  color: ${props => props.theme.textColorSecondary};
`;

export const UserProfile = styled.div`
  position: relative;
  .ant-menu {
    position: absolute;
    top: 56px;
    right: 5px;
    width: 180px;
    box-shadow: 0px 0px 10px -2px ${props => props.theme.textColorSecondary} !important;
    border-radius: 6px;
    &:before {
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid;
      border-bottom-color: rgba(0, 0, 0, 0.05);
      top: -8px;
      content: '';
      left: 98%;
      margin-left: -41px;
      position: absolute;
    }
    &:after {
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid;
      border-bottom-color: ${props => props.theme.secondaryColor};
      top: -6px;
      content: '';
      left: 98%;
      margin-left: -39px;
      position: absolute;
    }
    .ant-menu-item {
      margin: 0px;
      &:hover {
        background-color: ${props => props.theme.textColorSecondary};
        a {
          color: ${props => props.theme.textColor};
        }
      }
    }
  }
`;

export const DropDown = styled.div`

`;

export const Logo = styled.div`
  flex: 0 0 90px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 15px;
  a {
    height: 100%;
    .ant-avatar {
      width: 100%;
      height: 100%;      
      border-radius: 0;
      img{
        object-fit: contain;
        padding-bottom: .5em;
      }
    }
  }
`;

export const NavBar = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
`;

export const Nav = styled.div`
  padding: 0px 15px;
  text-transform: uppercase;
  border-bottom: 2px solid transparent;
  transition: all 400ms ease;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  a {
    color: ${props => props.theme.textColorSecondary};
    &:hover {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

export const TopbarRight = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

export const ProfileStyled = styled.div`
  display: flex;
  align-items: center;
  text-align: center;  
  position: relative;
  cursor: pointer;
`;

export const ProfileImageStyled = styled.img`
  height: 35px;
  cursor: pointer;
  border-radius: 100%;
`;

export const MenuStyled = styled(Icon)`
  svg{
    color: ${props => props.theme.textColorSecondary};
    font-size: 0.85em;
  }
`;
