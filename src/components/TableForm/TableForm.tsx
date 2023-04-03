import React, { memo, useEffect, useRef, useState } from 'react';
import { StyledTr, Table, TableAreaContainer } from './TableForm.style';
import {
  generateKey,
  toClassName,
  initialData,
  copySelected,
  getPasteText,
  getCurrentRows,
  removeEmptyRow,
  toBold,
  toItalic,
  toPreviousRows,
  toSelectAll,
} from '@/utils/common';
import { Button, Cell, HeaderCell, PasteForm } from '@/components';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { tableCellSelection, tableExportCsv } from '@/utils/table';
import { TableCellSelectionReturnType } from '@/utils/table/tableCellSelection';
import { TableExportCsvReturnType } from '@/utils/table/tableExportCsv';
import Flex from '../common/Flex/Flex';

type TableFormProps = {
  updateMarkdown: ForceUpdateType;
};

export type TableApiType = TableCellSelectionReturnType & TableExportCsvReturnType;

export type ColsType = string[];
export type RowsType = Record<string, any>[];

const TableForm = ({ updateMarkdown }: TableFormProps) => {
  const { cols: initialCols, rows: initialRows } = initialData;

  const tableRef = useRef<HTMLTableElement>(null);
  const rowHistoryRef = useRef<RowsType[]>([]);
  const keydownHandlerRef = useRef<{ keydownHandler: null | ((event: KeyboardEvent) => void) }>({ keydownHandler: null });

  const [cols, setCols] = useState<ColsType>(initialCols);
  const [rows, setRows] = useState<RowsType>(initialRows);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [pasteMode, setPasteMode] = useState<boolean>(false);
  const [tableApi, setTableApi] = useState<TableApiType>();
  const [pastedText, setPastedText] = useState<string>('');

  useEffect(() => {
    const { clearSelection } = tableCellSelection();
    const { toCSVFormat, downloadBlob } = tableExportCsv();

    setTableApi({ clearSelection, toCSVFormat, downloadBlob });

    updateMarkdown();
  }, []);

  useEffect(() => {
    tableCellSelection();

    if (keydownHandlerRef.current && keydownHandlerRef.current.keydownHandler !== null) {
      document.removeEventListener('keydown', keydownHandlerRef.current.keydownHandler);
    }

    const keydownHandler = (event: KeyboardEvent) => {
      copySelected(event);
      toBold(event, rows, updateRows);
      toItalic(event, rows, updateRows);
      toPreviousRows(event, setRows, rowHistoryRef);
      toSelectAll(event);
    };
    keydownHandlerRef.current.keydownHandler = keydownHandler;
    document.addEventListener('keydown', keydownHandlerRef.current.keydownHandler);

    updateMarkdown();
    tableApi?.clearSelection();

    return () => document.removeEventListener('keydown', keydownHandler);
  }, [rows, cols]);

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
      const csv = tableApi.toCSVFormat(cols, rows);
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
    if (pasteMode) {
      const { cols: newCols, rows: newRows } = getPasteText(pastedText);
      setCols(newCols);
      updateRows(newRows);
    }
    if (tableApi) {
      tableApi.clearSelection();
    }
    !pasteMode && updateRows(removeEmptyRow(getCurrentRows()));
    setPasteMode((prev) => !prev);
  };

  const handlePasteOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPastedText(e.target.value);
  };

  return (
    <TableAreaContainer direction="COLUMN" align="START" boxFill>
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
          <Button disabled={editMode || (pasteMode && pastedText.length < 1)} onClick={handleChangePasteMode}>
            {pasteMode ? 'Done' : 'Paste'}
          </Button>
          {pasteMode && <Button onClick={() => setPasteMode(false)}>Cancel</Button>}
        </Flex>
      </Flex>
      {pasteMode ? (
        <PasteForm handlePasteOnChange={handlePasteOnChange} />
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
