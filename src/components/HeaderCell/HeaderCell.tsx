import React, { useEffect, useState } from 'react';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { Button, Flex, Input, Popover } from '@/components/common';
import { TablePopover } from '@/components';
import StyledTh from './HeaderCell.style';
import { tableColumnDrag, tableCellRangeSelection, tableSortColumn } from '@/utils/table';
import { TableColumnDragReturnType } from '@/utils/table/tableColumnDrag';
import { TableSortColumnReturnType } from '@/utils/table/tableSortColumn';
import { TableCellRangeSelectionType } from '@/utils/table/tableCellRangeSelection';
import { ColumnAlignType, TableApiType, UpdateColsType, UpdateColumnAlignType, UpdateRowsType } from '@/types/common';
import { normalizeAlignType } from '@/utils/common';

type HeaderCellProps = {
  col: string;
  index: number;
  isEdit: boolean;
  updateCols: UpdateColsType;
  updateRows: UpdateRowsType;
  updateMarkdown: ForceUpdateType;
  updateColumnAlign: UpdateColumnAlignType;
  columnAlign: ColumnAlignType;
  tableApi?: TableApiType;
};

function HeaderCell({ col, index, isEdit, updateCols, updateRows, updateMarkdown, updateColumnAlign, columnAlign, tableApi }: HeaderCellProps) {
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
  };

  const handleColumnClick = () => {
    if (!isEdit) {
      headerCellEvent?.handleClick(index);
      updateMarkdown();
      tableApi?.clearSelection();
    }
  };

  const handleColumnSelectButtonClick = () => {
    if (tableApi) {
      const rows = tableApi.getCurrentRows();
      headerCellEvent?.handleEditModeClick({ fromCellIndex: index, toCellIndex: index, fromRowIndex: 1, toRowIndex: rows.length });
    }
  };

  return (
    <StyledTh
      isEdit={isEdit}
      draggable={isEdit}
      TextAlign={normalizeAlignType(columnAlign[col])}
      onClick={handleColumnClick}
      onDragStart={(event) => dragEventProvider(event, headerCellEvent?.handleDragStart)}
      onDragOver={(event) => dragEventProvider(event, headerCellEvent?.handleDragOver)}
      onDrop={(event) => dragEventProvider(event, headerCellEvent?.handleDrop)}
    >
      {isEdit ? (
        <Flex gap={{ column: 8 }}>
          <Input onChange={handleChange} defaultValue={col}></Input>
          <Popover
            content={<TablePopover updateColumnAlign={updateColumnAlign} tableApi={tableApi} mode="COLUMN" index={index} />}
            closeOption={{ keyDown: true, contentClick: true }}
          >
            <Button theme="system7" onClick={handleColumnSelectButtonClick}>
              Select
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
