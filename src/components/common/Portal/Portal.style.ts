import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: absolute;
  z-index: 1000;
  inset: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

type DimProps = {
  isModal: boolean;
};
export const Dim = styled.div<DimProps>`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;

  ${({ isModal }) =>
    isModal &&
    css`
      background: #000000;
      opacity: 0.5;
    `}
`;
