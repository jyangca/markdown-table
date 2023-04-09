export type ColsType = string[];
export type RowsType = Record<string, any>[];

export type ToCsvFormatProps = {
  cols: ColsType;
  rows: RowsType;
  toCsvCell?: boolean;
  joinWith?: string;
};

export type GenerateMarkdownTableProps = { header: string[]; body: string[][] };

export type GetCurrentColsReturnType = {
  getCurrentCols: () => ColsType;
};

export type GetCurrentRowsReturnType = {
  getCurrentRows: () => RowsType;
};

export type TableCellSelectionReturnType = {
  clearSelection: () => void;
};

export type TableExportCsvReturnType = {
  toCSVFormat: ({ cols, rows, toCsvCell, joinWith }: ToCsvFormatProps) => string;
  downloadBlob: (content: string, filename?: string, contentType?: string) => void;
};

export type TableApiEventHandlersType = {
  handleAddColumn: () => void;
  handleAddRow: () => void;
  handleExportCsv: () => void;
  handleChangeEditMode: () => void;
  handleChangePasteMode: ({ isCancel }: { isCancel: boolean }) => void;
};

export type UpdateRowsType = (newRows: RowsType) => void;
export type UpdateColsType = (newCols: ColsType) => void;

export type TableApiType = TableCellSelectionReturnType &
  TableExportCsvReturnType &
  GetCurrentRowsReturnType &
  GetCurrentColsReturnType &
  TableApiEventHandlersType & { updateRows: UpdateRowsType; updateCols: UpdateColsType };

export type PasteFormRefType = {
  getPastedText: () => { cols: ColsType; rows: RowsType };
};

export type SelectCellsManualType = { fromCellIndex: number; toCellIndex: number; fromRowIndex: number; toRowIndex: number };
