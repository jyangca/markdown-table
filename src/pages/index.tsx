import { MarkdownContainer, TableForm } from '@/components';
import { useForceUpdate } from '@/hooks';
import { Flex } from '@/components/common';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ColumnAlignType } from '@/types/common';

const Container = styled(Flex)`
  background-color: ${({ theme }) => theme.color.systemE};
  height: 100%;
  overflow: auto;
  padding: 1rem;
`;

const Home = () => {
  const [deps, forceUpdate] = useForceUpdate();
  const [columnAlign, setColumnAlign] = useState<ColumnAlignType>({});

  const updateMarkdown = useCallback(() => {
    forceUpdate();
  }, []);

  const updateColumnAlign = useCallback((newColumnAlign: ColumnAlignType | ((prev: ColumnAlignType) => ColumnAlignType)) => {
    setColumnAlign(newColumnAlign);
  }, []);

  return (
    <Container direction="COLUMN" gap={{ row: 16 }} boxFill>
      <TableForm updateMarkdown={updateMarkdown} updateColumnAlign={updateColumnAlign} columnAlign={columnAlign} />
      <MarkdownContainer deps={deps} columnAlign={columnAlign} />
    </Container>
  );
};

export default Home;
