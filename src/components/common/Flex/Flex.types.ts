import React, { CSSProperties, HTMLAttributes } from 'react';
import { css, FlattenSimpleInterpolation } from 'styled-components';

export type FlexAlign = 'START' | 'CENTER' | 'END' | 'STRETCH';
export const flexAlignMap: { [key in FlexAlign]: FlattenSimpleInterpolation } = {
  START: css`
    align-items: flex-start;
  `,
  CENTER: css`
    align-items: center;
  `,
  END: css`
    align-items: flex-end;
  `,
  STRETCH: css`
    align-items: stretch;
  `,
};

export type FlexJustify = 'START' | 'CENTER' | 'END' | 'SPACE_BETWEEN' | 'SPACE_AROUND';
export const flexJustifyMap: {
  [key in FlexJustify]: FlattenSimpleInterpolation;
} = {
  START: css`
    justify-content: flex-start;
  `,
  CENTER: css`
    justify-content: center;
  `,
  END: css`
    justify-content: flex-end;
  `,
  SPACE_BETWEEN: css`
    justify-content: space-between;
  `,
  SPACE_AROUND: css`
    justify-content: space-around;
  `,
};

export type FlexDirection = 'ROW' | 'COLUMN' | 'ROW_REVERSE' | 'COLUMN_REVERSE';
export const flexDirectionMap: {
  [key in FlexDirection]: FlattenSimpleInterpolation;
} = {
  ROW: css`
    flex-direction: row;
  `,
  COLUMN: css`
    flex-direction: column;
  `,
  ROW_REVERSE: css`
    flex-direction: row-reverse;
  `,
  COLUMN_REVERSE: css`
    flex-direction: column-reverse;
  `,
};

export type FlexGap = {
  column?: number;
  row?: number;
};

export type FlexTag =
  | 'div'
  | 'section'
  | 'nav'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'ul'
  | 'ol'
  | 'dl'
  | 'li'
  | 'main'
  | 'header'
  | 'footer';

export interface FlexProps extends Omit<HTMLAttributes<HTMLElement>, 'ref'> {
  /** Flex 박스 안에 내용 */
  children?: React.ReactNode | React.ReactNode[];

  /** Flex width */
  width?: string | number;

  /** Flex align-items */
  align?: FlexAlign;

  /** Flex justify-content */
  justify?: FlexJustify;

  /** Flex 방향 */
  direction?: FlexDirection;

  /** Flex Gap */
  gap?: FlexGap;

  /** 스타일을 커스텀할 수 있다. */
  style?: CSSProperties;

  /** Flex 박스에 className을 지정 */
  className?: string;

  /** Flex 박스에 id를 지정 */
  id?: string;

  /** Flex 박스에 HTML tag를 지정 */
  tag?: FlexTag;

  /** wrap 여부를 결정 */
  wrap?: boolean;

  /** width를 100%로 설정한다. */
  boxFill?: boolean;

  /** Flex 박스에 ref를 지정 */
  ref?: React.RefObject<HTMLDivElement>;
}
