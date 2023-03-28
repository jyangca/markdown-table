import {
  getColsFromTable,
  getInputValue,
  swapElement,
  toIterableType,
} from '@/utils/common';
import React from 'react';

type useTableDragProps = {
  setCols: React.Dispatch<React.SetStateAction<string[]>>;
  setRows: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
};

export type UseTableDragReturnType = {
  handleDragStart: (e: React.DragEvent<HTMLElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLElement>) => void;
};

const useTableDrag = ({
  setCols,
  setRows,
}: useTableDragProps): UseTableDragReturnType => {
  const table = document.querySelector('#table');
  const tableBody = table?.querySelector('tbody');

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    const cols = getColsFromTable(table);

    const value = getInputValue(e.target as HTMLElement);
    const idx = cols.indexOf(value);

    e.dataTransfer.setData('colIdx', idx.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) =>
    e.preventDefault();

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
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

export default useTableDrag;
