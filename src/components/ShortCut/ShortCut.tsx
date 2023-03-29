import React from 'react';
import styled from 'styled-components';

const ShortCutContainer = styled.div`
  width: 340px;
  height: 100%;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.systemWhite};
`;

const ShortCut = () => {
  return <ShortCutContainer>ShortCutContainer</ShortCutContainer>;
};

export default ShortCut;
