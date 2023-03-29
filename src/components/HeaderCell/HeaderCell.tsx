import React, { useEffect, useState } from 'react';
import { StyledTh } from './HeaderCell.style';
import { Input } from '@/components';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { useColumnDrag, useSortColumn } from '@/hooks';
import { UseTableDragReturnType } from '@/hooks/useColumnDrag';
import { UseSortColumnReturnType } from '@/hooks/useSortColumn';

type HeaderCellProps = {
  col: string;
  index: number;
  isEdit: boolean;
  setCols: React.Dispatch<React.SetStateAction<string[]>>;
  setRows: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  updateMarkdown: ForceUpdateType;
};

const HeaderCell = ({
  col,
  index,
  isEdit,
  setCols,
  setRows,
  updateMarkdown,
}: HeaderCellProps) => {
  const [value, setValue] = useState(col);
  const [headerCellEvent, setHeaderCellEvent] = useState<
    UseTableDragReturnType & UseSortColumnReturnType
  >();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  useEffect(() => {
    const { handleClick } = useSortColumn();
    const { handleDragStart, handleDragOver, handleDrop } = useColumnDrag({
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
      onDragStart={isEdit && headerCellEvent?.handleDragStart}
      onDragOver={isEdit && headerCellEvent?.handleDragOver}
      onDrop={isEdit && headerCellEvent?.handleDrop}
    >
      {isEdit ? <Input onChange={handleChange}>{value}</Input> : value}
    </StyledTh>
  );
};

export default HeaderCell;
