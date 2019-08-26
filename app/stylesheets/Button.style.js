/**
 * Created by vienpn on 21/08/19.
 */
import styled, { css } from 'styled-components';


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
