import styled from 'styled-components';

export const RegistrationWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/images/bg-login.jpg');
  background-position: left center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const RegistrationItem = styled.div`
  width: 720px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.secondaryColor};
  box-shadow: 0px 0px 12px -2px #2a3a51;
  padding: 50px 50px 85px 50px;
  color: #6e6c83fa;
  position: relative;
  z-index: 1;
`;

export const RegistrationTitle = styled.div`
  text-align: center;
  font-size: 18px;
  margin-bottom: 40px;
`;

export const LinkWrapper = styled.div`
  > div {
    width: 50%;
    float: left;
    display: flex;
    flex-direction: column;
  }
  a {
    width: 100%;
    text-align: center;
    color: ${props => props.theme.cancelColor};
    color: #2f2f2f;
    font-size: 22px;
    i {
      width: 100%;
      height: 35px;
      svg {
        width: 40px;
        height: 40px;
      }
    }
    
    :hover {
      color: ${props => props.theme.submitColor};
    }
  }
`;
