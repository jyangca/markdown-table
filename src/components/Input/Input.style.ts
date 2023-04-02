import styled from 'styled-components';

export const InputContainer = styled.div`
  width: 80%;
`;

export const InputItem = styled.input`
  width: 100%;

  height: 32px;

  padding-left: 10px;
  font-size: 12px;

  border: 1px solid ${({ theme }) => theme.color.systemE};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.systemHover};

  align: left;

  &:focus {
    background-color: ${({ theme }) => theme.color.systemWhite};
    border-color: ${({ theme }) => theme.color.systemBlue};
  }
`;
