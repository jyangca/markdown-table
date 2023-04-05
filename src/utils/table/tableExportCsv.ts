type ColsType = string[];
type RowsType = Record<string, any>[];

type ToCsvFormatProps = {
  cols: ColsType;
  rows: RowsType;
  toCsvCell?: boolean;
  joinWith?: string;
};
export type TableExportCsvReturnType = {
  toCSVFormat: ({ cols, rows, toCsvCell, joinWith }: ToCsvFormatProps) => string;
  downloadBlob: (content: string, filename?: string, contentType?: string) => void;
};

const tableExportCsv = () => {
  const toCSVFormat = ({ cols, rows, toCsvCell = true, joinWith = ',' }: ToCsvFormatProps) => {
    const newCols = cols
      .map(String)
      .map((v) => v.replace(/"/g, ''))
      .map((v) => (toCsvCell ? `"${v}"` : v))
      .join(joinWith);

    const newRows = rows.map((row) =>
      Object.values(row)
        .map(String)
        .map((v) => v.replace(/"/g, ''))
        .map((v) => (toCsvCell ? `"${v}"` : v))
        .join(joinWith),
    );
    return [newCols, ...newRows].join('\n');
  };

  const downloadBlob = (content: string, filename = 'export.csv', contentType = 'text/csv;charset=utf-8;') => {
    let blob = new Blob([content], { type: contentType });
    let url = URL.createObjectURL(blob);

    let pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
  };

  return {
    toCSVFormat,
    downloadBlob,
  };
};

export default tableExportCsv;
