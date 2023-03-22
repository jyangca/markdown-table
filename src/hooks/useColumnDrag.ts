import React, { useState } from 'react';

type useTableDragProps = {
  cols: string[];
  setCols: React.Dispatch<React.SetStateAction<string[]>>;
};

const useTableDrag = ({ cols, setCols }: useTableDragProps) => {
  const [dragOver, setDragOver] = useState('');

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    const { id } = e.target as HTMLElement;
    const idx = cols.indexOf(id);
    e.dataTransfer.setData('colIdx', idx.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) =>
    e.preventDefault();

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    const { id } = e.target as HTMLElement;
    setDragOver(id);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLElement>) => {
    const { id } = e.target as HTMLElement;
    const droppedColIdx = cols.indexOf(id);
    const draggedColIdx = Number(e.dataTransfer.getData('colIdx'));
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];
    setCols(tempCols);
    setDragOver('');
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleOnDrop,
    dragOver,
  };
};

export default useTableDrag;
