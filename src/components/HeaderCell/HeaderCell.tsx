import React, { useEffect, useState } from 'react';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { Input } from '@/components';
import StyledTh from './HeaderCell.style';
import { tableColumnDrag, tableSortColumn } from '@/utils/table';
import { TableColumnDragReturnType } from '@/utils/table/tableColumnDrag';
import { TableSortColumnReturnType } from '@/utils/table/tableSortColumn';

type HeaderCellProps = {
  col: string;
  index: number;
  isEdit: boolean;
  setCols: React.Dispatch<React.SetStateAction<string[]>>;
  setRows: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  updateMarkdown: ForceUpdateType;
};

function HeaderCell({ col, index, isEdit, setCols, setRows, updateMarkdown }: HeaderCellProps) {
  const [value, setValue] = useState(col);
  const [headerCellEvent, setHeaderCellEvent] = useState<TableColumnDragReturnType & TableSortColumnReturnType>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setValue(inputValue);
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
    updateMarkdown();
  }, [value]);

  return (
    <StyledTh
      draggable={isEdit}
      onClick={() => {
        !isEdit && headerCellEvent?.handleClick(index);
        updateMarkdown();
      }}
      onDragStart={isEdit ? headerCellEvent?.handleDragStart : undefined}
      onDragOver={isEdit ? headerCellEvent?.handleDragOver : undefined}
      onDrop={isEdit ? headerCellEvent?.handleDrop : undefined}
    >
      {isEdit ? <Input onChange={handleChange}>{value}</Input> : value}
    </StyledTh>
  );
}

export default HeaderCell;
