import React, { useEffect, useState } from 'react';
import { StyledTh } from './HeaderCell.style';
import { Input } from '@/components';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { useColumnDrag } from '@/hooks';
import { UseTableDragReturnType } from '@/hooks/useColumnDrag';

type HeaderCellProps = {
  col: string;
  index: number;
  setCols: React.Dispatch<React.SetStateAction<string[]>>;
  setRows: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  updateMarkdown: ForceUpdateType;
};

const HeaderCell = ({
  col,
  setCols,
  setRows,
  updateMarkdown,
}: HeaderCellProps) => {
  const [value, setValue] = useState(col);
  const [headerCellEvent, setHeaderCellEvent] =
    useState<UseTableDragReturnType>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  useEffect(() => {
    setHeaderCellEvent(
      useColumnDrag({
        setCols,
        setRows,
      }),
    );
    updateMarkdown();
  }, [value]);

  return (
    <StyledTh
      draggable
      onDragStart={headerCellEvent?.handleDragStart}
      onDragOver={headerCellEvent?.handleDragOver}
      onDrop={headerCellEvent?.handleDrop}
    >
      <Input onChange={handleChange}>{value}</Input>
    </StyledTh>
  );
};

export default HeaderCell;
