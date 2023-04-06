import React, { useEffect, useState } from 'react';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { Button, Flex, Input } from '@/components';
import StyledTh from './HeaderCell.style';
import { tableColumnDrag, tableCellRangeSelection, tableSortColumn } from '@/utils/table';
import { TableColumnDragReturnType } from '@/utils/table/tableColumnDrag';
import { TableSortColumnReturnType } from '@/utils/table/tableSortColumn';
import { TableCellRangeSelectionType } from '@/utils/table/tableCellRangeSelection';
import { TableApiType } from '@/types/common';

type HeaderCellProps = {
  col: string;
  index: number;
  isEdit: boolean;
  setCols: React.Dispatch<React.SetStateAction<string[]>>;
  setRows: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  updateMarkdown: ForceUpdateType;
  tableApi: TableApiType | undefined;
};

function HeaderCell({ col, index, isEdit, setCols, setRows, updateMarkdown, tableApi }: HeaderCellProps) {
  const [headerCellEvent, setHeaderCellEvent] = useState<TableColumnDragReturnType & TableSortColumnReturnType & TableCellRangeSelectionType>();

  const handleChange = () => {
    updateMarkdown();
  };

  useEffect(() => {
    const { handleClick } = tableSortColumn();
    const { handleDragStart, handleDragOver, handleDrop } = tableColumnDrag({
      setCols,
      setRows,
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
    !isEdit && headerCellEvent?.handleClick(index);
    updateMarkdown();
    tableApi?.clearSelection();
  };

  const handleColumnSelectButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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
          <Button theme="system7" onClick={handleColumnSelectButtonClick}>
            선택
          </Button>
        </Flex>
      ) : (
        col
      )}
    </StyledTh>
  );
}

export default HeaderCell;
