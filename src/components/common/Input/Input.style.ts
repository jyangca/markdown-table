import styled from 'styled-components';

type InputContainerProps = {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};
export const InputContainer = styled.div<InputContainerProps>`
  width: ${({ inputProps }) => inputProps.width || '100%'};

  user-select: none;
`;

export const InputItem = styled.input`
  width: 100%;

  height: 32px;

  padding-left: 10px;
  font-size: 12px;

  border: 1px solid ${({ theme }) => theme.color.systemE};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.systemHover};

  user-select: none;

  &:focus {
    background-color: ${({ theme }) => theme.color.systemWhite};
    border-color: ${({ theme }) => theme.color.systemBlue};
  }
`;
