import { TableForm } from '@/components';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

const MarkdownContainer = styled.div`
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.color.systemWhite};
`;

const ShortCutContainer = styled.div`
  width: 340px;
  height: 100%;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.systemWhite};
`;

const index = () => {
  const [markdown, setMarkdown] = useState('');

  return (
    <Container>
      <ShortCutContainer />
      <TableForm />
      <MarkdownContainer>
        <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown} />
      </MarkdownContainer>
    </Container>
  );
};

export default index;
