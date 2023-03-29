import React, { memo, useState } from 'react';
import { StyledTd } from './Cell.style';
import { Input } from '@/components';
import { ForceUpdateType } from '@/hooks/useForceUpdate';

type CellProps = {
  isEdit: boolean;
  children: string | number;
  updateMarkdown: ForceUpdateType;
};
const Cell = ({ isEdit, children, updateMarkdown }: CellProps) => {
  const [value, setValue] = useState<string | number>(children);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateMarkdown();
  };

  return (
    <StyledTd>
      {isEdit ? <Input onChange={handleChangeInput}>{value}</Input> : value}
    </StyledTd>
  );
};

export default memo(Cell);
