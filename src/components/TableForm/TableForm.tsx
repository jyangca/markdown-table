import React, { useState } from 'react';
import {
  Cell,
  StyledTh,
  StyledTr,
  Table,
  TableAreaContainer,
} from './TableForm.style';
import { generateKey, toClassName, initialData } from '@/utils/common';
import { useColumnDrag, useSortColumn } from '@/hooks';

const TableForm = () => {
  const { cols: initialCols, rows: initialRows } = initialData();

  const [cols, setCols] = useState<string[]>(initialCols);
  const [rows, setRows] = useState<Record<string, any>[]>(initialRows);

  const {
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleOnDrop,
    dragOver,
  } = useColumnDrag({ cols, setCols });

  if (typeof document !== 'undefined') {
    const table = document.querySelector('#table');
    if (table) useSortColumn(table);
  }

  return (
    <TableAreaContainer>
      <Table id="table" className={toClassName(['table'])}>
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
            <StyledTr key={generateKey(row, rowIdx)}>
              {Object.entries(row).map(([_, v], cellIdx) => (
                <Cell key={v} dragOver={cols[cellIdx] === dragOver}>
                  {row[cols[cellIdx]]}
                </Cell>
              ))}
            </StyledTr>
          ))}
        </tbody>
      </Table>
    </TableAreaContainer>
  );
};

export default TableForm;
