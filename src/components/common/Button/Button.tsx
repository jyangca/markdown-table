import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { FontStyleKeyType } from '@/theme/fontStyle';
import {
  ButtonFontTypeMap,
  ButtonSizeMap,
  ButtonThemeMap,
} from './Button.theme';
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
  ${({ rounded }) =>
    rounded &&
    css`
      border-radius: 56px;
    `}

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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      theme = 'system3',
      size = 32,
      children,
      disabled,
      fontType = ButtonFontTypeMap[size],
      rounded,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledButton
        buttonTheme={theme}
        size={size}
        fontType={fontType}
        disabled={disabled}
        rounded={rounded}
        {...props}
        ref={ref}
        onClick={(event) => {
          if (!disabled) props?.onClick?.(event);
        }}
      >
        {children}
      </StyledButton>
    );
  },
);

export default Button;
