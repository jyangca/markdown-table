import React, { useEffect, useState } from 'react';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { Button, Flex, Input, Popover } from '@/components/common';
import { TablePopover } from '@/components';
import StyledTh from './HeaderCell.style';
import { tableColumnDrag, tableCellRangeSelection, tableSortColumn } from '@/utils/table';
import { TableColumnDragReturnType } from '@/utils/table/tableColumnDrag';
import { TableSortColumnReturnType } from '@/utils/table/tableSortColumn';
import { TableCellRangeSelectionType } from '@/utils/table/tableCellRangeSelection';
import { TableApiType, UpdateColsType, UpdateRowsType } from '@/types/common';

type HeaderCellProps = {
  col: string;
  index: number;
  isEdit: boolean;
  updateCols: UpdateColsType;
  updateRows: UpdateRowsType;
  updateMarkdown: ForceUpdateType;
  tableApi: TableApiType | undefined;
};

function HeaderCell({ col, index, isEdit, updateCols, updateRows, updateMarkdown, tableApi }: HeaderCellProps) {
  const [headerCellEvent, setHeaderCellEvent] = useState<TableColumnDragReturnType & TableSortColumnReturnType & TableCellRangeSelectionType>();

  const handleChange = () => {
    updateMarkdown();
  };

  useEffect(() => {
    const { handleClick } = tableSortColumn();
    const { handleDragStart, handleDragOver, handleDrop } = tableColumnDrag({
      updateCols,
      updateRows,
    });
    const handleEditModeClick = tableCellRangeSelection;

    setHeaderCellEvent({
      handleClick,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleEditModeClick,
    });
  }, []);

  const dragEventProvider = (event: React.DragEvent<HTMLElement>, handler?: React.DragEventHandler<HTMLElement>) => {
    if (!isEdit) return undefined;
    handler?.(event);
    updateMarkdown();
  };

  const handleColumnClick = () => {
    if (!isEdit) {
      headerCellEvent?.handleClick(index);
      updateMarkdown();
      tableApi?.clearSelection();
    }
  };

  const handleColumnSelectButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (tableApi) {
      const rows = tableApi.getCurrentRows();
      headerCellEvent?.handleEditModeClick({ fromCellIndex: index, toCellIndex: index, fromRowIndex: 1, toRowIndex: rows.length });
    }
  };

  return (
    <StyledTh
      isEdit={isEdit}
      draggable={isEdit}
      onClick={handleColumnClick}
      onDragStart={(event) => dragEventProvider(event, headerCellEvent?.handleDragStart)}
      onDragOver={(event) => dragEventProvider(event, headerCellEvent?.handleDragOver)}
      onDrop={(event) => dragEventProvider(event, headerCellEvent?.handleDrop)}
    >
      {isEdit ? (
        <Flex gap={{ column: 8 }}>
          <Input onChange={handleChange} defaultValue={col}></Input>
          <Popover content={<TablePopover tableApi={tableApi} mode="COLUMN" selected={col} />}>
            <Button theme="system7" onClick={handleColumnSelectButtonClick}>
              선택
            </Button>
          </Popover>
        </Flex>
      ) : (
        col
      )}
    </StyledTh>
  );
}

export default HeaderCell;
