import React, { memo, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CopyButton, MarkdownStyle, MarkdownWrapper } from './MarkdownContainer.style';
import { generateMarkdownTable } from '@/utils/common';

type MarkdownContainerProps = {
  deps: number;
};

const MarkdownContainer = ({ deps }: MarkdownContainerProps) => {
  const [markdownTable, setMarkdownTable] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setMarkdownTable(generateMarkdownTable());
  }, [deps]);

  const copyMarkDownTable = () => {
    if (typeof window !== 'undefined') {
      window.navigator.clipboard.writeText(markdownTable);
      setCopied(true);
      setTimeout(() => setCopied(false), 700);
    }
  };

  return (
    <MarkdownWrapper direction="COLUMN" justify="SPACE_BETWEEN" gap={{ row: 16 }} align="START">
      <MarkdownStyle>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownTable}</ReactMarkdown>
      </MarkdownStyle>
      <CopyButton fixWidth="100%" size={60} onClick={copyMarkDownTable} copied={copied}>
        {copied ? 'Copied !' : 'Copy'}
      </CopyButton>
    </MarkdownWrapper>
  );
};

export default memo(MarkdownContainer);
