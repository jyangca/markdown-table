import React from 'react';
import styled, { css } from 'styled-components';
import fontStyle, { defaultTextStyle, FontStyleKeyType } from '@/theme/fontStyle';
import { TypoElement, TypographyProps } from './Typography.types';

const TextElement = styled.div<TypographyProps & Required<Pick<TypographyProps, 'fontType'>>>`
  text-align: ${(props) => props.textAlign};
  ${(props) => fontStyle[props.fontType]}
  ${defaultTextStyle};

  ${({ noWrap }) =>
    noWrap &&
    css`
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;

const defaultElement: { [key in FontStyleKeyType]: string } = {
  h1R: 'h1',
  h1B: 'h1',
  h2R: 'h2',
  h2B: 'h2',
  h3R: 'h3',
  h3B: 'h3',
  h4R: 'h4',
  h4B: 'h4',
  h5R: 'h5',
  h5B: 'h5',
  pR12: 'div',
  pB12: 'div',
  pR20: 'div',
  pB20: 'div',
  spanR12: 'div',
  spanB12: 'div',
  spanR20: 'div',
  spanB20: 'div',
  captionR12: 'div',
  captionB12: 'div',
  captionR20: 'div',
  captionB20: 'div',
  miniR12: 'div',
  miniB12: 'div',
  miniR20: 'div',
  miniB20: 'div',
};

const Typography = ({
  fontType = 'spanR12',
  tag = defaultElement[fontType] as TypoElement,
  children,
  style,
  color = 'system3',
  ...props
}: TypographyProps) => {
  return (
    <TextElement as={tag} fontType={fontType} style={style} color={color} {...props}>
      {children}
    </TextElement>
  );
};

export default Typography;
