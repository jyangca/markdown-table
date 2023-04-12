import React from 'react';

export type DefaultButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonSize = 32 | 40 | 60;
export type ButtonTheme = 'systemA' | 'system3' | 'system7';

/** `Button` 컴포넌트 props */
export interface ButtonProps extends DefaultButtonType {
  /** 버튼 안의 내용  */
  children: React.ReactNode;

  /** 버튼의 고정 Width */
  fixWidth?: number | string;

  /** 버튼 사이즈  */
  size?: ButtonSize;

  /** 버튼의 색상 테마 설정  */
  theme?: ButtonTheme;
}
