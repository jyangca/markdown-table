import React, { memo, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownWrapper } from './MarkdownContainer.style';
import { toArrayLikeType, toIterableType } from '@/utils/common';

type MarkdownContainerProps = {
  markdown: string;
};

const MarkdownContainer = ({ markdown }: MarkdownContainerProps) => {
  const [markdownTable, setMarkdownTable] = useState<string>('');

  useEffect(() => {
    const table = document.querySelector('#table');
    const headers = toArrayLikeType(table!.querySelectorAll('th'));
    const tableBody = table?.querySelector('tbody');
    const trs = toIterableType(tableBody!.querySelectorAll('tr'));

    const columnDivider = Array.from(
      { length: (headers || []).length },
      (_) => '---',
    );

    const generateMarkdownTable = () => {
      const header = Array.from(headers).map((header) => header.textContent);
      const body = Array.from(trs).map((tr) => {
        const tds = tr.querySelectorAll('td');
        return Array.from(tds).map((td) => td.querySelector('input')?.value);
      });

      const result = [header, columnDivider, ...body]
        .map((row) => row.join(' | '))
        .join('\n');

      return result;
    };
    setMarkdownTable(generateMarkdownTable());
  }, [markdown]);

  return (
    <MarkdownWrapper>
      <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdownTable} />
    </MarkdownWrapper>
  );
};

export default memo(MarkdownContainer);
