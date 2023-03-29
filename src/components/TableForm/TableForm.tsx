import React, { memo, useEffect, useRef, useState } from 'react';
import { StyledTr, Table, TableAreaContainer } from './TableForm.style';
import { generateKey, toClassName, initialData } from '@/utils/common';
import { Cell, HeaderCell } from '@/components';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { useCellSelection } from '@/hooks';

type TableFormProps = {
  updateMarkdown: ForceUpdateType;
};

const TableForm = ({ updateMarkdown }: TableFormProps) => {
  const { cols: initialCols, rows: initialRows } = initialData();

  const tableRef = useRef<HTMLTableElement>(null);

  const [cols, setCols] = useState<string[]>(initialCols);
  const [rows, setRows] = useState<Record<string, any>[]>(initialRows);
  const [editMode, setEditMode] = useState<boolean>(true);

  useEffect(() => {
    useCellSelection();
  }, []);

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

  const removeEmptyRow = () => {
    const newRows = rows.filter((row) => {
      const values = Object.values(row);
      return values.some((value) => value !== '');
    });
    setRows(newRows);
  };

  const handleChangeEditMode = () => {
    removeEmptyRow();
    setEditMode((prev) => !prev);
    updateMarkdown();
  };

  return (
    <TableAreaContainer>
      <div>
        <button onClick={handleAddColumn}>Add Column</button>
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleChangeEditMode}>
          {editMode ? '편집' : '보기'}
        </button>
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
                isEdit={editMode}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <StyledTr key={generateKey(row, rowIdx)}>
              {Object.entries(row).map(([_, v], cellIdx) => (
                <Cell key={v} updateMarkdown={updateMarkdown} isEdit={editMode}>
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
