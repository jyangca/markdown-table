import { MarkdownContainer, TableForm } from '@/components';
import { useForceUpdate } from '@/hooks';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2.5rem;
  width: 100%;
  height: 100%;
  align-items: stretch;
  display: flex;
  flex-direciton: row;
  column-gap: 2rem;
  background-color: ${({ theme }) => theme.color.systemE};
`;

const ShortCutContainer = styled.div`
  width: 340px;
  height: 100%;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.systemWhite};
`;

const index = () => {
  const [deps, forceUpdate] = useForceUpdate();

  const updateMarkdown = useCallback(() => {
    forceUpdate();
  }, []);

  return (
    <Container>
      <ShortCutContainer />
      <TableForm updateMarkdown={updateMarkdown} />
      <MarkdownContainer deps={deps} />
    </Container>
  );
};

export default index;
