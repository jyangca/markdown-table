import { RowsType } from '@/components/TableForm/TableForm';

const useExportCsv = () => {
  const toCSVFormat = (cols: string[], rows: RowsType) => {
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

  const downloadBlob = (
    content: string,
    filename = 'export.csv',
    contentType = 'text/csv;charset=utf-8;',
  ) => {
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);

    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
  };

  return {
    toCSVFormat,
    downloadBlob,
  };
};

export default useExportCsv;
