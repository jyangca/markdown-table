import React, { memo, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownStyle, MarkdownWrapper } from './MarkdownContainer.style';
import { toIterableType } from '@/utils/types';
import { getInputValue } from '@/utils/common';
import { Button } from '@/components';

type MarkdownContainerProps = {
  deps: number;
};

const MarkdownContainer = ({ deps }: MarkdownContainerProps) => {
  const [markdownTable, setMarkdownTable] = useState<string>('');

  useEffect(() => {
    const table = document.querySelector('#table');
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
    }
  };

  return (
    <MarkdownWrapper direction="COLUMN" justify="SPACE_BETWEEN" align="START">
      <MarkdownStyle>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownTable}</ReactMarkdown>
      </MarkdownStyle>
      <Button fixWidth="100%" size={60} onClick={copyMarkDownTable}>
        복사
      </Button>
    </MarkdownWrapper>
  );
};

export default memo(MarkdownContainer);
