import React from 'react';
import { StyledTd } from './Cell.style';
import { Button, Flex, Input } from '@/components/common';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { toClassName } from '@/utils/common';
import { TableApiType } from '@/types/common';
import { tableCellRangeSelection } from '@/utils/table';

type CellProps = {
  isEdit: boolean;
  index: { cell: number; row: number };
  children: string | number;
  updateMarkdown: ForceUpdateType;
  tableApi: TableApiType | undefined;
};

const Cell = ({ isEdit, index, children, updateMarkdown, tableApi }: CellProps) => {
  const handleChangeInput = () => {
    updateMarkdown();
  };

  const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isEdit) (event.target as HTMLDivElement).querySelector('input')?.focus();
  };

  const handleRowSelectButtonClick = () => {
    if (tableApi) {
      const cols = tableApi.getCurrentCols();
      tableCellRangeSelection({ fromCellIndex: 0, toCellIndex: cols.length - 1, fromRowIndex: index.row + 1, toRowIndex: index.row + 1 });
    }
  };

  const cellItem = () => {
    if (!isEdit) return children;
    if (isEdit && index.cell === 0)
      return (
        <Flex gap={{ column: 8 }}>
          <Button onClick={handleRowSelectButtonClick} theme="system7">
            선택
          </Button>
          <Input onChange={handleChangeInput} defaultValue={children}></Input>
        </Flex>
      );
    return <Input onChange={handleChangeInput} defaultValue={children}></Input>;
  };

  return (
    <StyledTd onClick={handleCellClick} className={toClassName(['cell', isEdit ? 'cell-mode-edit' : 'cell-mode-read'])}>
      {cellItem()}
    </StyledTd>
  );
};

export default Cell;
