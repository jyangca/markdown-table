type ColsType = string[];
type RowsType = Record<string, any>[];

export type TableExportCsvReturnType = {
  toCSVFormat: (cols: ColsType, rows: RowsType) => string;
  downloadBlob: (content: string, filename?: string, contentType?: string) => void;
};

const tableExportCsv = () => {
  const toCSVFormat = (cols: ColsType, rows: RowsType) => {
    const newCols = cols
      .map(String)
      .map((v) => v.replace(/"/g, ''))
      .map((v) => `"${v}"`)
      .join(',');

    const newRows = rows.map((row) =>
      Object.values(row)
        .map(String)
        .map((v) => v.replace(/"/g, ''))
        .map((v) => `"${v}"`)
        .join(','),
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
