export type ColsType = string[];
export type RowsType = Record<string, any>[];

export type ToCsvFormatProps = {
  cols: ColsType;
  rows: RowsType;
  toCsvCell?: boolean;
  joinWith?: string;
};

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

export type TableApiType = TableCellSelectionReturnType & TableExportCsvReturnType & GetCurrentRowsReturnType & GetCurrentColsReturnType;
