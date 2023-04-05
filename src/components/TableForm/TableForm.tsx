import React, { memo, useEffect, useRef, useState } from 'react';
import { StyledTr, Table, TableAreaContainer } from './TableForm.style';
import {
  generateKey,
  toClassName,
  initialData,
  copySelected,
  getPasteText,
  getCurrentRows,
  getCurrentCols,
  removeEmptyRow,
  toBold,
  toItalic,
  toPreviousRows,
  toSelectAll,
  toDeleteCellValue,
  toDeleteAndCopyCellValue,
} from '@/utils/common';
import { Button, Cell, HeaderCell, PasteForm } from '@/components';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { tableCellSelection, tableExportCsv } from '@/utils/table';
import Flex from '../common/Flex/Flex';
import { useOutsideClick } from '@/hooks';
import { ColsType, PasteFormRefType, RowsType, TableApiType } from '@/types/common';

type TableFormProps = {
  updateMarkdown: ForceUpdateType;
};

const TableForm = ({ updateMarkdown }: TableFormProps) => {
  const { cols: initialCols, rows: initialRows } = initialData;

  const tableRef = useRef<HTMLTableElement>(null);
  const pasteFormRef = useRef<PasteFormRefType>(null);
  const rowHistoryRef = useRef<RowsType[]>([]);
  const keydownHandlerRef = useRef<{ keydownHandler: null | ((event: KeyboardEvent) => void) }>({ keydownHandler: null });

  const [cols, setCols] = useState<ColsType>(initialCols);
  const [rows, setRows] = useState<RowsType>(initialRows);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [pasteMode, setPasteMode] = useState<boolean>(false);
  const [tableApi, setTableApi] = useState<TableApiType>();

  useEffect(() => {
    const { clearSelection } = tableCellSelection();
    const { toCSVFormat, downloadBlob } = tableExportCsv();

    setTableApi({ clearSelection, toCSVFormat, downloadBlob, getCurrentRows, getCurrentCols });

    updateMarkdown();
  }, []);

  useEffect(() => {
    tableCellSelection();

    if (keydownHandlerRef.current && keydownHandlerRef.current.keydownHandler !== null) {
      document.removeEventListener('keydown', keydownHandlerRef.current.keydownHandler);
    }

    const keydownHandler = (event: KeyboardEvent) => {
      copySelected(event);
      toSelectAll(event);
      if (editMode) {
        toBold(event, rows, updateRows);
        toItalic(event, rows, updateRows);
        toPreviousRows(event, setRows, rowHistoryRef);
        toDeleteCellValue(event, rows, updateRows);
        toDeleteAndCopyCellValue(event, rows, updateRows);
      }
    };
    keydownHandlerRef.current.keydownHandler = keydownHandler;
    document.addEventListener('keydown', keydownHandlerRef.current.keydownHandler);

    updateMarkdown();
    tableApi?.clearSelection();

    return () => document.removeEventListener('keydown', keydownHandler);
  }, [rows, cols]);

  useOutsideClick(tableRef.current!, () => {
    tableApi?.clearSelection();
  });

  const updateRows = (newRows: RowsType) => {
    rowHistoryRef.current.push(rows);
    setRows(newRows);
  };

  const handleAddColumn = () => {
    const newCols = [...cols, `column${cols.length + 1}`];
    const newRows = getCurrentRows().map((row) => ({ ...row, [`column${cols.length + 1}`]: '' }));
    setCols(newCols);
    updateRows(newRows);
  };

  const handleAddRow = () => {
    const newRow = cols.reduce((acc, cur) => ({ ...acc, [cur]: '' }), {});
    updateRows([...getCurrentRows(), newRow]);
  };

  const handleExportCsv = () => {
    if (tableApi) {
      const csv = tableApi.toCSVFormat({ cols, rows });
      if (csv) tableApi.downloadBlob(csv);
    }
  };

  const handleChangeEditMode = () => {
    if (tableApi) {
      tableApi.clearSelection();
    }
    updateRows(removeEmptyRow(getCurrentRows()));
    setEditMode((prev) => !prev);
    updateMarkdown();
  };

  const handleChangePasteMode = () => {
    if (pasteMode && pasteFormRef.current) {
      const { cols: newCols, rows: newRows } = pasteFormRef.current.getPastedText();
      setCols(newCols);
      updateRows(newRows);
    }
    if (tableApi) {
      tableApi.clearSelection();
    }
    !pasteMode && updateRows(removeEmptyRow(getCurrentRows()));
    setPasteMode((prev) => !prev);
  };

  return (
    <TableAreaContainer direction="COLUMN" align="START" gap={{ row: 16 }} boxFill>
      <Flex justify="SPACE_BETWEEN" boxFill>
        <Flex gap={{ column: 8 }}>
          <Button disabled={!editMode} onClick={handleAddColumn}>
            Add Column
          </Button>
          <Button disabled={!editMode} onClick={handleAddRow}>
            Add Row
          </Button>
          <Button disabled={editMode || pasteMode} onClick={handleExportCsv}>
            Export CSV
          </Button>
          <Button disabled={pasteMode} onClick={handleChangeEditMode}>
            {editMode ? '보기' : '편집'}
          </Button>
        </Flex>
        <Flex direction="ROW" gap={{ column: 8 }}>
          <Button disabled={editMode} onClick={handleChangePasteMode}>
            {pasteMode ? 'Done' : 'Paste'}
          </Button>
          {pasteMode && <Button onClick={() => setPasteMode(false)}>Cancel</Button>}
        </Flex>
      </Flex>
      {pasteMode ? (
        <PasteForm tableApi={tableApi} ref={pasteFormRef} />
      ) : (
        <Table id="table" ref={tableRef} className={toClassName(['table', editMode ? 'table-mode-edit' : 'table-mode-read'])}>
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
                  tableApi={tableApi}
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
      )}
    </TableAreaContainer>
  );
};

export default memo(TableForm);
