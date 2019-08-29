import styled, { css } from 'styled-components';

export const PaginationBarStyled = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const ControlCss = css`
  text-align: center;
  color: #000;
  font-size: 18px;
  transition: all 0.3s;
  cursor: pointer;
  margin: 0px 4px;
  font-size: ${props => props.theme.fontSize.MediumFontSize};
  &:hover {
    color: #ff5402;
  }
`;

export const IconControlStyled = styled.i`
  ${ControlCss} width: 24px;
`;

export const TextControlStyled = styled.div`
  ${ControlCss};
  padding: 0 6px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
`;

export const PaginationPageNumberStyled = styled.div`
  margin: 0px 4px;
  cursor: pointer;
  width: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: all 0.3s;
  color: #000;
  &:hover {
    color: #ff5402;
  }
  ${({ selected }) => selected
    && css`
      color: #ff5402;
    `};
`;

export const PaginationWrapperStyled = styled.div`
  display: flex;
`;

export const PaginationContentWrapperStyled = styled.div`
  display: flex;
  width: 288px;
  justify-content: left;
  ${({ isAutoWidth }) => isAutoWidth
    && css`
      width: auto;
    `};
`;

export const DotsStyled = styled.div`
  margin: 0px 4px;
  width: 24px;
  text-align: center;
`;
