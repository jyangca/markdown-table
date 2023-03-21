import React, { useState } from 'react';
import { Cell, StyledTh, Table, TableAreaContainer } from './TableForm.style';

const TableForm = () => {
  const initialData = {
    cols: ['강아지', '고양이', '토끼'],
    rows: [
      {
        강아지: '멍멍이',
        고양이: '야옹이',
        토끼: '토끼',
      },
    ],
  };

  const [cols, setCols] = useState<string[]>(initialData.cols);
  const [rows, setRows] = useState<Record<string, string>[]>(initialData.rows);
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

  const generateRowKey = (row: unknown, index: number) =>
    `${JSON.stringify(row)}_${index}`;

  return (
    <TableAreaContainer>
      {cols && rows && (
        <div>
          <Table>
            <thead>
              <tr>
                {cols.map((col) => (
                  <StyledTh
                    id={col}
                    key={col}
                    draggable
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleOnDrop}
                    onDragEnter={handleDragEnter}
                    dragOver={col === dragOver}
                  >
                    {col}
                  </StyledTh>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={generateRowKey(row, rowIdx)}>
                  {Object.entries(row).map(([_, v], cellIdx) => (
                    <Cell key={v} dragOver={cols[cellIdx] === dragOver}>
                      {row[cols[cellIdx]]}
                    </Cell>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </TableAreaContainer>
  );
};

export default TableForm;
