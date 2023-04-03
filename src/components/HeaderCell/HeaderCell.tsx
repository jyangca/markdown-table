import React, { useEffect, useState } from 'react';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { Input } from '@/components';
import StyledTh from './HeaderCell.style';
import { tableColumnDrag, tableSortColumn } from '@/utils/table';
import { TableColumnDragReturnType } from '@/utils/table/tableColumnDrag';
import { TableSortColumnReturnType } from '@/utils/table/tableSortColumn';
import { TableApiType } from '../TableForm/TableForm';

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
  const [headerCellEvent, setHeaderCellEvent] = useState<TableColumnDragReturnType & TableSortColumnReturnType>();

  const handleChange = () => {
    updateMarkdown();
  };

  useEffect(() => {
    const { handleClick } = tableSortColumn();
    const { handleDragStart, handleDragOver, handleDrop } = tableColumnDrag({
      setCols,
      setRows,
    });

    setHeaderCellEvent({
      handleClick,
      handleDragStart,
      handleDragOver,
      handleDrop,
    });
  }, []);

  const dragEventProvider = (event: React.DragEvent<HTMLElement>, handler?: React.DragEventHandler<HTMLElement>) => {
    if (!isEdit) return undefined;
    handler?.(event);
    updateMarkdown();
  };

  return (
    <StyledTh
      isEdit={isEdit}
      draggable={isEdit}
      onClick={() => {
        !isEdit && headerCellEvent?.handleClick(index);
        updateMarkdown();
        tableApi?.clearSelection();
      }}
      onDragStart={(event) => dragEventProvider(event, headerCellEvent?.handleDragStart)}
      onDragOver={(event) => dragEventProvider(event, headerCellEvent?.handleDragOver)}
      onDrop={(event) => dragEventProvider(event, headerCellEvent?.handleDrop)}
    >
      {isEdit ? <Input onChange={handleChange} defaultValue={col}></Input> : col}
    </StyledTh>
  );
}

export default HeaderCell;
