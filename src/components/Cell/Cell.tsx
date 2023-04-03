import React, { memo, useState } from 'react';
import { StyledTd } from './Cell.style';
import { Input } from '@/components';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { toClassName } from '@/utils/common';

type CellProps = {
  isEdit: boolean;
  children: string | number;
  updateMarkdown: ForceUpdateType;
};
const Cell = ({ isEdit, children, updateMarkdown }: CellProps) => {
  const handleChangeInput = () => {
    updateMarkdown();
  };

  const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isEdit) (event.target as HTMLDivElement).querySelector('input')?.focus();
  };

  return (
    <StyledTd onClick={handleCellClick} className={toClassName(['cell', isEdit ? 'cell-mode-edit' : 'cell-mode-read'])}>
      {isEdit ? <Input onChange={handleChangeInput} defaultValue={children}></Input> : children}
    </StyledTd>
  );
};

export default Cell;
