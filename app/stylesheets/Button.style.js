/**
 * Created by vienpn on 21/08/19.
 */
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  100% {
    transform:rotate(360deg);
  }
`;

export const Button = styled.button`

  text-align: center;
  border-radius: ${props => props.theme.borderRadius.borderbtn};
  font-family: 'MontserratSemiBold';
  user-select: none;
  font-size: ${props => props.theme.fontSize.BaseFontSize};
  cursor: pointer;
  border: none;
  color: ${props => props.theme.colorStyled.ColorPrimary};
  padding: .875em;
  background: ${props => props.theme.colorStyled.colorBtn};
  display: flex;
  align-items: center;
  min-width: 10em;
  margin: 0 auto;
  justify-content: center;
  ${props => props.full && css`
    width: 100%;  
    padding: 1em;
  `}
  ${props => props.fullSmall && css`
    width: 100%;  
    padding: .5em;
  `}
  &:hover{
    opacity: 0.8;
  }


`;

export const ActionForm = styled.div`

`;

export const LoginBtn = styled.button`
  cursor: pointer;
  height: 3.75em;
  width: 100%;
  border-radius: 3.75em;
  border: 1px solid ${props => props.theme.colorStyled.ColorBlack};
  transition: 0.3s ease;
  background: ${props => props.theme.colorStyled.ColorBlack};
  color: ${props => props.theme.colorStyled.ColorWhite};  
  margin-top: 1.5em;
  display: flex;
  font-size: ${props => props.theme.fontSize.BaseFontSize};
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${props => props.theme.colorStyled.ColorWhite};
    color: ${props => props.theme.colorStyled.ColorBlack};
  }
`;

export const LoginFBBtn = styled(LoginBtn)`
  border: 1px solid ${props => props.theme.colorStyled.ColorBtnFb};
  background: ${props => props.theme.colorStyled.ColorBtnFb};
  color: ${props => props.theme.colorStyled.ColorWhite};
  margin-bottom: 1.5em;
  i {
    margin-right: 0.313em;
    font-size: ${props => props.theme.fontSize.HeadingH6FontSize};
  }
  &:hover {
    background: ${props => props.theme.colorStyled.ColorWhite};
    color: ${props => props.theme.colorStyled.ColorBtnFb};
  }
`;

export const LoginFooter = styled.div`
  text-align: center;  
`;

export const LoginFooterText = styled.span`
  font-size: ${props => props.theme.fontSize.MediumFontSize};
`;

export const LoginFooterLink = styled.a`
  font-size: ${props => props.theme.fontSize.MediumFontSize};
  margin-left: .5em;
  text-decoration: none;
  color: ${props => props.theme.colorStyled.ColorBlack};
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.colorStyled.ColorBgDefaultHover};
  }
`;

export const LoginSpinner = styled.div`
  border: 2px solid;
  width: 0.938em;
  height: 0.938em;
  border-radius: 50%;
  border-color: black black black transparent;
  animation: ${spin} 2s linear infinite;
  margin-right: .5em;
  display: inline-block;
`;

export const LoginErrorMessage = styled.div`
  color: crimson;
  text-align: center;
  margin-bottom: 0.938em;
`;
