export type ColsType = string[];
export type RowsType = Record<string, any>[];

export type AlignType = ':--' | '--:' | ':-:' | '---';
export type ColumnAlignType = Record<string, AlignType>;
export type TextAlignType = 'start' | 'center' | 'end';
export type UpdateColumnAlignType = (align: ColumnAlignType | ((prev: ColumnAlignType) => ColumnAlignType)) => void;

export type ToCsvFormatProps = {
  cols: ColsType;
  rows: RowsType;
  toCsvCell?: boolean;
  joinWith?: string;
};

export type GenerateMarkdownTableProps = { manual?: { header: string[]; body: string[][] }; columnDivider?: AlignType[] };

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
  handleAddColumn: (index?: string) => void;
  handleAddRow: (index?: string) => void;
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

export type TableHistoryType = { cols: ColsType; rows: RowsType; createdAt: string };
