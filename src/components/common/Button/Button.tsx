import React from 'react';
import styled, { css } from 'styled-components';
import { FontStyleKeyType } from '@/theme/fontStyle';
import { ButtonSizeMap, ButtonThemeMap } from './Button.theme';
import { ButtonProps, ButtonSize, ButtonTheme } from './Button.types';

type StyledButtonProps = {
  size: ButtonSize;
  buttonTheme: ButtonTheme;
  fontType?: FontStyleKeyType;
  fixWidth?: number | string;
  isIcon?: boolean;
  rounded?: boolean;
};
const StyledButton = styled.button<StyledButtonProps>`
  cursor: pointer;
  transition: color 0.15s, background-color 0.15s;
  border: 1px solid transparent;

  display: flex;
  justify-content: center;
  align-items: center;
  ${({ size }) => ButtonSizeMap[size]};
  ${({ buttonTheme }) => ButtonThemeMap[buttonTheme]};

  white-space: nowrap;
  & > * {
    flex-shrink: 0;
  }
  user-select: none;

  width: auto;
  ${({ fixWidth }) =>
    fixWidth &&
    css`
      width: ${fixWidth};
      display: table-cell;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 0 0.5rem !important;
    `}

  &:disabled {
    cursor: not-allowed;
  }
`;

const Button = ({ theme = 'system3', size = 32, children, disabled, ...props }: ButtonProps) => {
  return (
    <StyledButton
      buttonTheme={theme}
      size={size}
      disabled={disabled}
      {...props}
      onClick={(event) => {
        if (!disabled) props?.onClick?.(event);
      }}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
