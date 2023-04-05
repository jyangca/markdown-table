import React from 'react';
import { StyledTd } from './Cell.style';
import { Button, Flex, Input } from '@/components';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { toClassName } from '@/utils/common';

type CellProps = {
  isEdit: boolean;
  index: number;
  children: string | number;
  updateMarkdown: ForceUpdateType;
};

const Cell = ({ isEdit, index, children, updateMarkdown }: CellProps) => {
  const handleChangeInput = () => {
    updateMarkdown();
  };

  const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isEdit) (event.target as HTMLDivElement).querySelector('input')?.focus();
  };

  const cellItemsByCondition = () => {
    if (!isEdit) return children;
    if (isEdit && index === 0)
      return (
        <Flex gap={{ column: 8 }}>
          <Button onClick={(e) => console.log(e)} theme="system7">
            선택
          </Button>
          <Input onChange={handleChangeInput} defaultValue={children}></Input>
        </Flex>
      );
    return <Input onChange={handleChangeInput} defaultValue={children}></Input>;
  };

  return (
    <StyledTd onClick={handleCellClick} className={toClassName(['cell', isEdit ? 'cell-mode-edit' : 'cell-mode-read'])}>
      {cellItemsByCondition()}
    </StyledTd>
  );
};

export default Cell;
