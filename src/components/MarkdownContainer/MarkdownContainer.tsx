import React, { memo, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CopyButton, MarkdownStyle, MarkdownWrapper } from './MarkdownContainer.style';
import { toIterableType } from '@/utils/types';
import { getInputValue } from '@/utils/common';

type MarkdownContainerProps = {
  deps: number;
};

const MarkdownContainer = ({ deps }: MarkdownContainerProps) => {
  const [markdownTable, setMarkdownTable] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const table = document.querySelector('table');
    const ths = table!.querySelectorAll('th');
    const headers = Array.from(ths).map((th) => getInputValue(th));

    const tableBody = table?.querySelector('tbody');
    const trs = toIterableType(tableBody!.querySelectorAll('tr'));

    const columnDivider = Array.from({ length: (headers || []).length }, (_) => '---');

    const generateMarkdownTable = () => {
      const body = Array.from(trs).map((tr) => {
        const tds = tr.querySelectorAll('td');
        return Array.from(tds).map((td) => getInputValue(td));
      });

      const result = [headers, columnDivider, ...body].map((row) => row.join(' | ')).join('\n');

      return result;
    };
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
