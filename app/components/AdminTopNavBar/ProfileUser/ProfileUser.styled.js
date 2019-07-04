import styled from 'styled-components';

export const ProfileUserInfoWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: -10px;
  transition: all 300ms ease-in-out;
  box-shadow: -2px 5px 10px 1px rgba(0, 0, 0, 0.176);
  width: 360px;
  min-height: 500px;
  z-index: 1;
  background-color: #fff;
`;

export const ProfileUserHead = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid #ededed;
  background: #f3f8fe;
  position: relative;
`;

export const ProfileUserAvatar = styled.div`
  width: 75px;
  height: 75px;
  margin: 20px auto 10px;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileUserName = styled.div`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;
  font-size: 15px;
`;

export const ProfileUserID = styled.div`
  line-height: 9.3px;
  padding: 5px 0;
  font-size: 11px;
  color: #777;
`;

export const ProfileUserEmail = styled.div`
  max-width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #777;
`;

export const ProfileUserAction = styled.div`
  margin-bottom: 10px;
  button {
    cursor: pointer;
    font-family: 'Proxima Nova Regular';
  }
  span {
    padding: 0px 10px;
  }
  .my-account {
    color: #206ec5;
    &:hover {
      color: #095cb7;
    }
  }
  .sign-out {
    color: #e4585a;
    &:hover {
      color: #b32628;
    }
  }
`;

export const CloseAction = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

export const ProfileOrganizationWrapper = styled.div`
  padding: 8px 20px;
`;

export const ProfileOrganizationHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
  span {
    text-transform: uppercase;
    font-size: 15px;
    color: #999;
  }

  a {
    text-decoration: unset;
  }
`;

export const ProfileOrganizationSetting = styled.div`
  display: flex;
  align-items: center;
  color: #206ec5;
  cursor: pointer;
  &:hover {
    color: #095cb7;
  }
  i {
    font-size: 20px;
    margin-right: 3px;
  }
`;

export const ProfileOrganizationItemWrapper = styled.div`
  max-height: 420px;
  overflow: auto;
`;

export const ProfileOrganizationItem = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  i {
    color: #10bc83;
    font-size: 22px;
  }
`;

export const ProfileOrganizationContent = styled.div``;

export const ProfileOrganizationName = styled.div`
  font-size: 15px;
`;

export const ProfileOrganizationID = styled.div`
  font-size: 10px;
  padding: 3px 0px;
`;

export const ProfileOrganizationStatus = styled.div`
  font-size: 10px;
`;
