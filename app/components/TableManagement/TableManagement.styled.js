import styled from 'styled-components';

export const ButtonGroupWrapper = styled.div`
  border: 1px solid #ededed;
  display: flex;
`;

export const ButtonElement = styled.button`
  padding: 5px;
  border-right: 1px solid #ededed;
  border-radius: 3px;

  &:last-child {
    border-right: none;
  }

  &:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
`;
