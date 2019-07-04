import styled from 'styled-components';

export const TopbarLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  color: #646777;
`;

export const TopbarRight = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 20px;
`;

export const HeaderStyled = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  z-index: 3;
  background-color: #f8f7f7;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
`;

export const LogoStyled = styled.a`
  width: 200px;
  height: 100%;
  margin: auto 0;
  margin-left: 20px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: left;
  background-size: contain;
  cursor: pointer;
  background-image: url('/assets/images/logo.png');
`;

export const ProfileStyled = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0px 20px;
  position: relative;
`;

export const ProfileImageStyled = styled.img`
  height: 30px;
  cursor: pointer;
`;

export const LogoutStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin: 0px 10px;
`;

export const ActionsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    line-height: 21px;
    font-size: 18px;
    margin-left: 15px;
    cursor: pointer;
    &:hover {
      color: #41a0d9;
    }
  }
`;

export const SettingIcon = styled.i``;

export const TopNavBarSerachWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 320px;
  height: 32px;
  display: flex;
  align-items: center;
  i {
    padding: 3px 7px 3px 10px;
    margin: 4px 0px;
    font-size: 16px;
    cursor: pointer;
    border-right: 1px solid #ccc;
    &:hover {
      color: #222;
    }
  }
  input {
    padding-left: 10px;
    width: 100%;
    font-size: 14px;
    color: #222;
  }
  &:focus,
  &:hover {
    border: 1px solid #41a0d9;
  }
`;
