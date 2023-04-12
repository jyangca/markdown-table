import { getCurrentCols, getCurrentRows, getInputValue, swapElement } from '@/utils/common';
import React, { DragEventHandler } from 'react';
import { UpdateColsType, UpdateRowsType } from '@/types/common';

type TableColumnDragProps = {
  updateCols: UpdateColsType;
  updateRows: UpdateRowsType;
};

export type TableColumnDragReturnType = {
  handleDragStart: DragEventHandler<HTMLElement>;
  handleDragOver: DragEventHandler<HTMLElement>;
  handleDrop: DragEventHandler<HTMLElement>;
};

const tableColumnDrag = ({ updateCols, updateRows }: TableColumnDragProps): TableColumnDragReturnType => {
  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    if (e.target && (e.target as HTMLElement).tagName === 'BUTTON') return;

    const cols = getCurrentCols();

    const value = getInputValue(e.target as HTMLElement);
    const idx = cols.indexOf(value);

    e.dataTransfer.setData('colIdx', idx.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => e.preventDefault();

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    if (e.target && (e.target as HTMLElement).tagName === 'BUTTON') return;

    const cols = getCurrentCols();
    const value = getInputValue(e.target as HTMLElement);
    const droppedColIdx = cols.indexOf(value);
    const draggedColIdx = Number(e.dataTransfer.getData('colIdx'));
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];

    updateCols(tempCols);
    updateRows(getCurrentRows().map((row) => swapElement(row, tempCols)));
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
};

export default tableColumnDrag;
