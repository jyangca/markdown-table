import { css, DefaultTheme, FlattenInterpolation, ThemedStyledProps, ThemeProps } from 'styled-components';
import { AllColor, ColorKeyType } from '@/theme/color';
import fontStyle, { FontStyleKeyType } from '@/theme/fontStyle';
import { ButtonSize, ButtonTheme } from './Button.types';

type ButtonThemeFontType = { fontType?: FontStyleKeyType };
export const ButtonSizeMap: {
  [key in ButtonSize]: FlattenInterpolation<ThemedStyledProps<ButtonThemeFontType, DefaultTheme>>;
} = {
  32: css<ButtonThemeFontType>`
    min-width: 48px;
    min-height: 32px;
    padding: 0 0.75rem;
    border-radius: 4px;
    column-gap: 4px;

    ${({ fontType }) => fontStyle[fontType || 'captionB12']};
  `,
  40: css<ButtonThemeFontType>`
    min-width: 80px;
    min-height: 40px;
    padding: 0 1.5rem;
    border-radius: 4px;
    column-gap: 8px;

    ${({ fontType }) => fontStyle[fontType || 'spanB12']};
  `,
  60: css<ButtonThemeFontType>`
    min-width: 100px;
    min-height: 60px;
    padding: 0 6.75rem;
    border-radius: 8px;
    column-gap: 8px;

    ${({ fontType }) => fontStyle[fontType || 'pB12']};
  `,
};

const defaultDisabled = css`
  &:disabled {
    background-color: ${AllColor.systemC};
    color: ${AllColor.systemWhite};
    border-color: transparent;

    & > * {
      opacity: 0.7;
    }
  }
`;

export const ButtonContentColorMap: { [key in ButtonTheme]: ColorKeyType } = {
  systemA: 'systemWhite',
  system3: 'systemWhite',
  system7: 'systemWhite',
};

export const ButtonDisabledColorMap: {
  [key in ButtonTheme]: ColorKeyType;
} = {
  systemA: 'systemWhite',
  system3: 'systemWhite',
  system7: 'systemWhite',
};

export const ButtonThemeMap: {
  [key in ButtonTheme]: FlattenInterpolation<ThemeProps<DefaultTheme>>;
} = {
  systemA: css`
    background-color: ${AllColor.systemA};
    color: ${AllColor.systemWhite};

    ${defaultDisabled}
  `,
  system3: css`
    background-color: ${AllColor.system3};
    color: ${AllColor.systemWhite};

    ${defaultDisabled}
  `,
  system7: css`
    background-color: ${AllColor.system7};
    color: ${AllColor.systemWhite};

    ${defaultDisabled}
  `,
};

export const ButtonFontTypeMap: { [key in ButtonSize]: FontStyleKeyType } = {
  32: 'captionB12',
  40: 'spanB12',
  60: 'pB12',
};
