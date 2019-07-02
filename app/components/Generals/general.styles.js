
import styled, { css } from 'styled-components';

export const DefaultButton = styled.button`
  color: #fff;
  background-color: #ff5402;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 6px 12px;
  font-size: 14px;
  min-width: 70px;
  &:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    opacity: 0.8;
  }
  ${({ submit }) => submit && css`
    background-color: #2697ea;
  `};
  ${({ cancel }) => cancel && css`
    background-color: #898c8e;
  `};
  ${({ error }) => error && css`
    background-color: #b52d2d;
  `};
`;

export const Return = styled.div`
  cursor: pointer;
  i {
    margin-right: 10px;
  }
`;
