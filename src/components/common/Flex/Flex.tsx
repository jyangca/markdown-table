import React from 'react';
import styled, { css } from 'styled-components';
import { FlexAlign, flexAlignMap, FlexDirection, flexDirectionMap, FlexGap, FlexJustify, flexJustifyMap, FlexProps } from './Flex.types';

type FlexContainerProps = {
  width?: string | number;
  align: FlexAlign;
  justify: FlexJustify;
  direction: FlexDirection;
  gap?: FlexGap;
  boxWrap?: boolean;
  boxFill?: boolean;
};
const FlexContainer = styled.div<FlexContainerProps>`
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  ${({ boxFill }) =>
    boxFill &&
    css`
      width: 100%;
    `}

  display: flex;
  ${({ align }) => flexAlignMap[align]};
  ${({ justify }) => flexJustifyMap[justify]};
  ${({ direction }) => flexDirectionMap[direction]};

  ${({ gap }) =>
    gap?.column &&
    css`
      column-gap: ${gap.column}px;
    `}
  ${({ gap }) =>
    gap?.row &&
    css`
      row-gap: ${gap.row}px;
    `}

  flex-wrap: ${({ boxWrap }) => (boxWrap ? 'wrap' : 'nowrap')};
`;

const Flex = ({
  children,
  align = 'CENTER',
  justify = 'START',
  direction = 'ROW',
  style,
  className,
  id,
  tag = 'div',
  wrap,
  ref,
  ...argsProps
}: FlexProps) => {
  return (
    <FlexContainer
      as={tag}
      align={align}
      justify={justify}
      direction={direction}
      style={style}
      className={className}
      id={id}
      boxWrap={wrap}
      {...argsProps}
    >
      {children}
    </FlexContainer>
  );
};

export default Flex;
