import styled from 'styled-components';

export const InputContainer = styled.div`
  width: 100%;
`;

export const InputItem = styled.input`
  width: 100%;

  height: 32px;

  border: 1px solid ${({ theme }) => theme.color.systemE};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.systemHover};

  align: left;

  &:focus {
    background-color: ${({ theme }) => theme.color.systemWhite};
    border-color: ${({ theme }) => theme.color.systemBlue};
  }
`;
