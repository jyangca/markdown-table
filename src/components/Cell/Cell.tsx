import React from 'react';
import { StyledTd } from './Cell.style';
import { Button, Flex, Input, Popover } from '@/components/common';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { normalizeAlignType, toClassName } from '@/utils/common';
import { ColumnAlignType, RowsType, TableApiType } from '@/types/common';
import { tableCellRangeSelection } from '@/utils/table';
import TablePopover from '../TablePopover/TablePopover';

type CellProps = {
  isEdit: boolean;
  index: { cell: number; row: number };
  col: string;
  children: string | number;
  updateMarkdown: ForceUpdateType;
  columnAlign: ColumnAlignType;
  tableApi?: TableApiType;
};

const Cell = ({ isEdit, index, children, updateMarkdown, col, columnAlign, tableApi }: CellProps) => {
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
          <Popover content={<TablePopover tableApi={tableApi} mode="ROW" index={index.row} />} closeOption={{ keyDown: true, contentClick: true }}>
            <Button onClick={handleRowSelectButtonClick} theme="system7">
              Select
            </Button>
          </Popover>
          <Input onChange={handleChangeInput} defaultValue={children}></Input>
        </Flex>
      );
    return <Input onChange={handleChangeInput} defaultValue={children}></Input>;
  };

  return (
    <StyledTd
      onClick={handleCellClick}
      className={toClassName(['cell', isEdit ? 'cell-mode-edit' : 'cell-mode-read'])}
      textAlign={normalizeAlignType(columnAlign[col])}
    >
      {cellItem()}
    </StyledTd>
  );
};

export default Cell;
