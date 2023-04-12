import React, { HTMLAttributes } from 'react';
import { FontStyleKeyType, TextStyleProperties } from '@/theme/fontStyle';

type WordBreakType = 'normal' | 'break-all' | 'keep-all';

export type TypoElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';

export type TypographyProps = {
  /** 폰트 타입을 지정합니다. */
  fontType?: FontStyleKeyType;

  /** HTML 태그를 지정할 수 있습니다. */
  tag?: TypoElement;

  /** 문자의 정렬을 지정합니다. */
  textAlign?: string;

  /** 컴포넌트의 className */
  className?: string;

  /** Typography 안의 내용 */
  children?: React.ReactNode | React.ReactNode[];

  /** ``true``로 설정 시 줄바꿈하지 않고 ...처리를 합니다. */
  noWrap?: boolean;

  style?: React.CSSProperties;
} & TextStyleProperties &
  HTMLAttributes<HTMLElement>;
