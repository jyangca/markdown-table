import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { StyledTr, Table, TableAreaContainer } from './TableForm.style';
import { generateKey, toClassName, initialData } from '@/utils/common';
import { useColumnDrag, useSortColumn } from '@/hooks';
import { Cell, HeaderCell } from '@/components';
import { ForceUpdateType } from '@/hooks/useForceUpdate';

type TableFormProps = {
  updateMarkdown: ForceUpdateType;
};

const TableForm = ({ updateMarkdown }: TableFormProps) => {
  const { cols: initialCols, rows: initialRows } = initialData();

  const tableRef = useRef<HTMLTableElement>(null);

  const [cols, setCols] = useState<string[]>(initialCols);
  const [rows, setRows] = useState<Record<string, any>[]>(initialRows);

  useEffect(() => {
    useSortColumn();
  }, [cols]);

  const handleAddColumn = () => {
    const newCols = [...cols, `column${cols.length + 1}`];
    const newRows = rows.map((row) => ({ ...row, '': '' }));
    setCols(newCols);
    setRows(newRows);
  };

  const handleAddRow = () => {
    const newRow = cols.reduce((acc, cur) => ({ ...acc, [cur]: '' }), {});
    setRows([...rows, newRow]);
  };

  return (
    <TableAreaContainer>
      <div>
        <button onClick={handleAddColumn}>Add Column</button>
        <button onClick={handleAddRow}>Add Row</button>
      </div>
      <Table id="table" ref={tableRef} className={toClassName(['table'])}>
        <thead>
          <tr>
            {cols.map((col, index) => (
              <HeaderCell
                key={generateKey([col, index])}
                col={col}
                index={index}
                setCols={setCols}
                setRows={setRows}
                updateMarkdown={updateMarkdown}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <StyledTr key={generateKey(row, rowIdx)}>
              {Object.entries(row).map(([_, v], cellIdx) => (
                <Cell key={v} updateMarkdown={updateMarkdown}>
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

export default memo(TableForm);
