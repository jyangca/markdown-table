import { MarkdownContainer, TableForm } from '@/components';
import Flex from '@/components/common/Flex/Flex';
import { useForceUpdate } from '@/hooks';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const Container = styled(Flex)`
  padding: 1rem;
  height: 100%;
  background-color: ${({ theme }) => theme.color.systemE};
`;

const Home = () => {
  const [deps, forceUpdate] = useForceUpdate();

  const updateMarkdown = useCallback(() => {
    forceUpdate();
  }, []);

  return (
    <Container direction="COLUMN" gap={{ row: 16 }} boxFill>
      <TableForm updateMarkdown={updateMarkdown} />
      <MarkdownContainer deps={deps} />
    </Container>
  );
};

export default Home;
