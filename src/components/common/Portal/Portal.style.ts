import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  z-index: 1000;
  inset: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dim = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
`;
