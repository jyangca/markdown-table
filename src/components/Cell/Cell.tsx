import React, { memo, useState } from 'react';
import { StyledTd } from './Cell.style';
import { Input } from '@/components';
import { ForceUpdateType } from '@/hooks/useForceUpdate';

type CellProps = {
  children: string | number;
  updateMarkdown: ForceUpdateType;
};
const Cell = ({ children, updateMarkdown }: CellProps) => {
  const [value, setValue] = useState<string | number>(children);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateMarkdown();
  };

  return (
    <StyledTd>
      <Input onChange={handleChangeInput}>{value}</Input>
    </StyledTd>
  );
};

export default memo(Cell);
