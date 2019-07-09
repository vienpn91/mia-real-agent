import styled, { css } from 'styled-components';

export const PaginationBarStyled = styled.div`
  display: flex;
  margin-right: 20px;
`;

const ControlCss = css`
  border-radius: 2px;
  background: #f2f4f7;
  text-align: center;
  display: flex !important;
  justify-content: center;
  flex-direction: column;
  color: #222;
  font-size: 18px;
  transition: all 0.3s;
  cursor: pointer;
  margin: 0px 4px;
  &:hover {
    background: #2fa3e6;
    color: ${props => props.theme.secondaryColor}
  }
`;

export const IconControlStyled = styled.i`
  ${ControlCss} width: 24px;
  height: 24px;
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
  height: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: all 0.3s;
  &:hover {
    color: #2fa3e6;
  }
  ${({ selected }) => selected
    && css`
      color: #2fa3e6;
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
