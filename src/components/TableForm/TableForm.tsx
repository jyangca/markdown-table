import React, { memo, useEffect, useRef, useState } from 'react';
import { StyledTr, Table, TableAreaContainer } from './TableForm.style';
import {
  generateKey,
  toClassName,
  initialData,
  copySelected,
  getCurrentRows,
  getCurrentCols,
  toBold,
  toItalic,
  toSelectAll,
  toDeleteCellValue,
  toDeleteAndCopyCellValue,
  removeEmptyRowAndCol,
} from '@/utils/common';
import { Cell, HeaderCell, PasteForm, TableButtonList } from '@/components';
import { ForceUpdateType } from '@/hooks/useForceUpdate';
import { tableCellSelection, tableExportCsv } from '@/utils/table';
import { useOnOutsideClick } from '@/hooks';
import { ColsType, ColumnAlignType, PasteFormRefType, RowsType, TableApiType, TableHistoryType, UpdateColumnAlignType } from '@/types/common';
import dayjs from 'dayjs';
import { isEqual } from 'lodash';

type TableFormProps = {
  updateMarkdown: ForceUpdateType;
  updateColumnAlign: UpdateColumnAlignType;
  columnAlign: ColumnAlignType;
};

const TableForm = ({ updateMarkdown, updateColumnAlign, columnAlign }: TableFormProps) => {
  const { cols: initialCols, rows: initialRows } = initialData;

  const tableRef = useRef<HTMLTableElement>(null);
  const pasteFormRef = useRef<PasteFormRefType>(null);
  const keydownHandlerRef = useRef<{ keydownHandler: null | ((event: KeyboardEvent) => void) }>({ keydownHandler: null });

  const [cols, setCols] = useState<ColsType>(initialCols);
  const [rows, setRows] = useState<RowsType>(initialRows);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [pasteMode, setPasteMode] = useState<boolean>(false);
  const [tableApi, setTableApi] = useState<TableApiType>();
  const [tableHistory, setTableHistory] = useState<TableHistoryType[]>([{ cols, rows, createdAt: 'Example Data' }]);

  const updateRows = (newRows: RowsType) => {
    setRows(newRows);
  };

  const updateCols = (newCols: ColsType) => {
    setCols(newCols);
  };

  const handleAddColumn = (index?: string) => {
    const ths = tableRef.current?.querySelectorAll('th');
    const columnIndex = index || getCurrentCols().length;
    const newCols = [
      ...getCurrentCols().slice(0, Number(columnIndex)),
      `column${(ths || []).length + 1}`,
      ...getCurrentCols().slice(Number(columnIndex)),
    ];
    const newRows = getCurrentRows().map((row) => ({ ...row, [`column${(ths || []).length + 1}`]: '' }));
    updateCols(newCols);
    updateRows(newRows);
  };

  const handleAddRow = (index?: string) => {
    const newRow = getCurrentCols().reduce((acc, cur) => ({ ...acc, [cur]: '' }), {});
    const rowIndex = index || getCurrentRows().length;
    updateRows([...getCurrentRows().slice(0, Number(rowIndex)), newRow, ...getCurrentRows().slice(Number(rowIndex))]);
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
    const { cols: newCols, rows: newRows } = removeEmptyRowAndCol({ rows: getCurrentRows(), cols: getCurrentCols() });
    updateRows(newRows);
    updateCols(newCols);
    if (editMode) {
      setTableHistory((prev) => {
        const prevHistory = { cols: prev[prev.length - 1].cols, rows: prev[prev.length - 1].rows };
        if (isEqual(prevHistory, { cols: newCols, rows: newRows })) {
          prev.pop();
          prev.push({ cols: newCols, rows: newRows, createdAt: dayjs().format('HH:mm:ss') });
          return prev;
        }
        return [...prev, { cols: newCols, rows: newRows, createdAt: dayjs().format('HH:mm:ss') }];
      });
    }
    setEditMode((prev) => !prev);
    updateMarkdown();
  };

  const handleChangePasteMode = ({ isCancel }: { isCancel: boolean }) => {
    if (!isCancel && pasteMode && pasteFormRef.current) {
      const { cols: newCols, rows: newRows } = pasteFormRef.current.getPastedText();
      updateCols(newCols);
      updateRows(newRows);
    }
    if (tableApi) {
      tableApi.clearSelection();
    }
    setPasteMode((prev) => !prev);
  };

  useEffect(() => {
    const { clearSelection } = tableCellSelection();
    const { toCSVFormat, downloadBlob } = tableExportCsv();

    setTableApi({
      updateRows,
      updateCols,
      clearSelection,
      toCSVFormat,
      downloadBlob,
      getCurrentRows,
      getCurrentCols,
      handleAddColumn,
      handleAddRow,
      handleExportCsv,
      handleChangeEditMode,
      handleChangePasteMode,
    });

    updateMarkdown();
  }, [pasteMode, editMode]);

  useEffect(() => {
    tableCellSelection();

    if (keydownHandlerRef.current && keydownHandlerRef.current.keydownHandler !== null) {
      document.removeEventListener('keydown', keydownHandlerRef.current.keydownHandler);
    }

    const keydownHandler = (event: KeyboardEvent) => {
      copySelected(event);
      toSelectAll(event);
      if (editMode) {
        toBold(event, tableApi);
        toItalic(event, tableApi);
        toDeleteCellValue(event, tableApi);
        toDeleteAndCopyCellValue(event, tableApi);
      }
    };
    keydownHandlerRef.current.keydownHandler = keydownHandler;
    document.addEventListener('keydown', keydownHandlerRef.current.keydownHandler);

    updateMarkdown();
    tableApi?.clearSelection();

    return () => document.removeEventListener('keydown', keydownHandler);
  }, [rows, cols]);

  useOnOutsideClick(() => {
    tableApi?.clearSelection();
  }, tableRef);

  return (
    <>
      <TableAreaContainer direction="COLUMN" align="START" gap={{ row: 16 }} boxFill>
        <TableButtonList editMode={editMode} pasteMode={pasteMode} tableApi={tableApi} tableHistory={tableHistory} />
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
                    updateCols={updateCols}
                    updateRows={updateRows}
                    updateMarkdown={updateMarkdown}
                    updateColumnAlign={updateColumnAlign}
                    columnAlign={columnAlign}
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
                    <Cell
                      key={v}
                      updateMarkdown={updateMarkdown}
                      columnAlign={columnAlign}
                      col={cols[cellIdx]}
                      tableApi={tableApi}
                      isEdit={editMode}
                      index={{ cell: cellIdx, row: rowIdx }}
                    >
                      {row[cols[cellIdx]]}
                    </Cell>
                  ))}
                </StyledTr>
              ))}
            </tbody>
          </Table>
        )}
      </TableAreaContainer>
    </>
  );
};

export default memo(TableForm);
