import { MarkdownContainer, TableForm } from '@/components';
import { useForceUpdate } from '@/hooks';
import { Flex } from '@/components/common';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ColumnAlignType } from '@/types/common';

const Container = styled(Flex)`
  padding: 1rem;
  height: 100%;
  background-color: ${({ theme }) => theme.color.systemE};
  overflow: auto;
`;

const Home = () => {
  const [deps, forceUpdate] = useForceUpdate();
  const [columnAlign, setColumnAlign] = useState<Record<string, ColumnAlignType>>({});

  const updateMarkdown = useCallback(() => {
    forceUpdate();
  }, []);

  const updateColumnAlign = useCallback(
    (newColumnAlign: Record<string, ColumnAlignType> | ((prev: Record<string, ColumnAlignType>) => Record<string, ColumnAlignType>)) => {
      setColumnAlign(newColumnAlign);
    },
    [],
  );

  return (
    <Container direction="COLUMN" gap={{ row: 16 }} boxFill>
      <TableForm updateMarkdown={updateMarkdown} updateColumnAlign={updateColumnAlign} />
      <MarkdownContainer deps={deps} columnAlign={columnAlign} />
    </Container>
  );
};

export default Home;
