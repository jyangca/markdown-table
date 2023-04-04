import React, { useEffect, useState } from 'react';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { Input } from '@/components';
import StyledTh from './HeaderCell.style';
import { tableColumnDrag, tableHeaderCellSelection, tableSortColumn } from '@/utils/table';
import { TableColumnDragReturnType } from '@/utils/table/tableColumnDrag';
import { TableSortColumnReturnType } from '@/utils/table/tableSortColumn';
import { TableApiType } from '../TableForm/TableForm';
import { TableHeaderCellSelectionType } from '@/utils/table/tableHeaderCellSelection';

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
  const [headerCellEvent, setHeaderCellEvent] = useState<TableColumnDragReturnType & TableSortColumnReturnType & TableHeaderCellSelectionType>();

  const handleChange = () => {
    updateMarkdown();
  };

  useEffect(() => {
    const { handleClick } = tableSortColumn();
    const { handleDragStart, handleDragOver, handleDrop } = tableColumnDrag({
      setCols,
      setRows,
    });
    const handleEditModeClick = tableHeaderCellSelection;

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

  const clickEventProvider = () => {
    if (isEdit) headerCellEvent?.handleEditModeClick(index);
    else {
      !isEdit && headerCellEvent?.handleClick(index);
      updateMarkdown();
      tableApi?.clearSelection();
    }
  };

  return (
    <StyledTh
      isEdit={isEdit}
      draggable={isEdit}
      onClick={clickEventProvider}
      onDragStart={(event) => dragEventProvider(event, headerCellEvent?.handleDragStart)}
      onDragOver={(event) => dragEventProvider(event, headerCellEvent?.handleDragOver)}
      onDrop={(event) => dragEventProvider(event, headerCellEvent?.handleDrop)}
    >
      {isEdit ? <Input onChange={handleChange} defaultValue={col}></Input> : col}
    </StyledTh>
  );
}

export default HeaderCell;
