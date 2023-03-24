import React, { memo, useState } from 'react';
import { StyledTd } from './Cell.style';
import { Input } from '@/components';

type CellProps = {
  dragOver: boolean;
  children: string | number;
  updateMarkdown: (markdown: string) => void;
};
const Cell = ({ dragOver, children, updateMarkdown }: CellProps) => {
  const [value, setValue] = useState<string | number>(children);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateMarkdown(event.target.value);
  };

  return (
    <StyledTd dragOver={dragOver}>
      <Input onChange={handleChangeInput}>{value}</Input>
    </StyledTd>
  );
};

export default memo(Cell);
