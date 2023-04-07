import { getColsFromTable, getInputValue, swapElement } from '@/utils/common';
import { toIterableType } from '@/types/utils';
import React, { DragEventHandler } from 'react';

type TableColumnDragProps = {
  setCols: React.Dispatch<React.SetStateAction<string[]>>;
  setRows: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
};

export type TableColumnDragReturnType = {
  handleDragStart: DragEventHandler<HTMLElement>;
  handleDragOver: DragEventHandler<HTMLElement>;
  handleDrop: DragEventHandler<HTMLElement>;
};

const tableColumnDrag = ({ setCols, setRows }: TableColumnDragProps): TableColumnDragReturnType => {
  const table = document.querySelector('#table');
  const tableBody = table?.querySelector('tbody');

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    if (e.target && (e.target as HTMLElement).tagName === 'BUTTON') return;

    const cols = getColsFromTable(table);

    const value = getInputValue(e.target as HTMLElement);
    const idx = cols.indexOf(value);

    e.dataTransfer.setData('colIdx', idx.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => e.preventDefault();

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    if (e.target && (e.target as HTMLElement).tagName === 'BUTTON') return;

    const cols = getColsFromTable(table);
    const trs = toIterableType(tableBody!.querySelectorAll('tr'));
    const rows = Array.from(trs).map((tr) => {
      let obj: Record<string, any> = {};
      const tds = tr.querySelectorAll('td');
      Array.from(tds).forEach((td, index) => {
        return (obj[cols[index]] = td.querySelector('input')?.value);
      });
      return obj;
    });

    const value = getInputValue(e.target as HTMLElement);
    const droppedColIdx = cols.indexOf(value);
    const draggedColIdx = Number(e.dataTransfer.getData('colIdx'));
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];

    setCols(tempCols);
    setRows(rows.map((row) => swapElement(row, tempCols)));
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
};

export default tableColumnDrag;
