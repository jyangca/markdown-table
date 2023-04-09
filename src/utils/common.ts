import { ColsType, GenerateMarkdownTableProps, RowsType, UpdateColsType, UpdateRowsType } from '@/types/common';
import { tableCellSelection } from './table';

export const isClient = () => {
  return typeof window === 'object' && !!window.document;
};

export const isServer = () => {
  return !isClient();
};

export const toClassName = (array: Array<string | number | boolean>) => array.filter(Boolean).join(' ');

export const generateKey = (item: unknown, index?: number) => `${JSON.stringify(item)}_${index}`;

export const initialData = {
  cols: ['name', 'age', 'country', 'sport'],
  rows: [
    {
      name: 'Aleksey Nemov',
      age: 24,
      country: 'Russia',
      sport: 'Gymnastics',
    },
    {
      name: 'MICHAEL PHELPS',
      age: 27,
      country: 'USA',
      sport: 'Swimming',
    },
    {
      name: 'IAN THORPE',
      age: 17,
      country: 'Australia',
      sport: 'Swimming',
    },
    {
      name: 'LEONTIEN',
      age: 30,
      country: 'Netherlands',
      sport: 'Cycling',
    },
  ],
};

export const swapElement = (target: Record<string, any>, cols: string[]) => {
  const newObj: Record<string, any> = {};
  cols.forEach((col) => {
    newObj[col] = target[col];
  });
  return newObj;
};

export const getInputValue = (element: HTMLElement): string => {
  if (element instanceof HTMLInputElement) {
    return element.value;
  }

  const input = element.querySelector('input');

  if ('textContent' in element && !input) {
    return element.textContent || '';
  }

  if (input) {
    return input.value;
  }
  return '';
};

export const getColsFromTable = (table: Element | null) => {
  const ths = table!.querySelectorAll('th');
  const cols = Array.from(ths).map((th) => th.querySelector('input')?.value ?? '');
  return cols;
};

export const copySelected = (e: KeyboardEvent) => {
  if (e.target && (e.target as HTMLElement).tagName === 'INPUT') return;
  if (e.target && (e.target as HTMLElement).tagName === 'TEXTAREA') return;
  if (e.metaKey && e.key === 'c') {
    e.preventDefault();
    e.stopPropagation();
    const table = document.querySelector('table');
    const trs = table!.querySelectorAll('tr');
    const selectedCellsValuesString = Array.from(trs)
      .slice(1)
      .map((tr) =>
        Array.from(tr.querySelectorAll('.selected'))
          .map((cell) => getInputValue(cell as HTMLElement))
          .join('\t'),
      )
      .join('\n');

    setTimeout(() => Array.from(document.querySelectorAll('.selected')).forEach((cell) => cell.classList.remove('copied')), 100);
    Array.from(document.querySelectorAll('.selected')).forEach((cell) => cell.classList.add('copied'));

    navigator.clipboard.writeText(selectedCellsValuesString);
  }
};

export const getPasteText = (text: string) => {
  const textArray = text
    .trim()
    .split('\n')
    .map((row) => row.split('\t'));
  const cols = textArray[0];
  const rows = textArray.slice(1).map((row) => {
    const obj: Record<string, any> = {};
    row.forEach((value, i) => {
      obj[cols[i]] = value;
    });
    return obj;
  });

  return { cols, rows };
};

export const italicRegex = (string: string) => {
  const pattern = /\*{1,3}(\S+(?:\s+\S+)*)\s*\*{1,3}/g;
  const newString = string.replace(pattern, (match, p1) => {
    if (match.startsWith('***') && match.endsWith('***')) {
      return `**${p1}**`;
    } else {
      return p1;
    }
  });

  return newString;
};

export const getCurrentRows = () => {
  const table = document.querySelector('table');
  const trs = table!.querySelectorAll('tr');
  const ths = Array.from(table!.querySelectorAll('th')).map((th) => getInputValue(th));
  const rows = Array.from(trs)
    .slice(1)
    .map((tr) => {
      let obj: Record<string, any> = {};
      const tds = Array.from(tr.querySelectorAll('td'));
      tds.forEach((td, index) => (obj[ths[index]] = getInputValue(td)));
      return obj;
    });
  return rows;
};

export const getCurrentCols = () => {
  const table = document.querySelector('table');
  const ths = Array.from(table!.querySelectorAll('th')).map((th) => getInputValue(th));
  return ths;
};

export const removeEmptyRowAndCol = ({ rows, cols }: { rows: RowsType; cols: string[] }) => {
  const newCols = cols.filter((col) => {
    const values = rows.map((row) => row[col]);
    return values.some((value) => value !== '');
  });

  const newRows = rows
    .map((row) => {
      const newRow = Object.fromEntries(Object.entries(row).filter(([key]) => newCols.includes(key)));
      return newRow;
    })
    .filter((row) => {
      const values = Object.values(row);
      return values.some((value) => value !== '');
    });

  return { rows: newRows, cols: newCols };
};

export const toBold = (e: KeyboardEvent, rows: RowsType, updateRows: (newRows: RowsType) => void) => {
  if (e.metaKey && e.key === 'b') {
    e.stopPropagation();
    const table = document.querySelector('table');
    const selectedValues = Array.from(table!.querySelectorAll('.selected')).map((td) => td.querySelector('input')?.value || '');
    const isBoldMode = selectedValues.some((value) => value.match(/\*{2}(\S+)\s*\*{2}/g));

    updateRows(
      rows.map((row) => {
        if (!isBoldMode) {
          const newRow = Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key, selectedValues.includes(value) ? `**${value}**` : value]),
          );
          return newRow;
        } else {
          const newRow = Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key, selectedValues.includes(value) ? value.replace(/\*\*/g, '') : value]),
          );
          return newRow;
        }
      }),
    );
  }
};

export const toItalic = (e: KeyboardEvent, rows: RowsType, updateRows: (newRows: RowsType) => void) => {
  if (e.metaKey && e.key === 'i') {
    e.stopPropagation();
    const table = document.querySelector('table');
    const selectedValues = Array.from(table!.querySelectorAll('.selected')).map((td) => td.querySelector('input')?.value || '');
    const isItalicMode = selectedValues.some(
      (value) =>
        (value.startsWith('*') && value.endsWith('*') && !value.startsWith('**') && !value.endsWith('**')) ||
        (value.startsWith('***') && value.endsWith('***')),
    );

    updateRows(
      rows.map((row) => {
        if (!isItalicMode) {
          const newRow = Object.fromEntries(Object.entries(row).map(([key, value]) => [key, selectedValues.includes(value) ? `*${value}*` : value]));
          return newRow;
        } else {
          const newRow = Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key, selectedValues.includes(value) ? italicRegex(value) : value]),
          );
          return newRow;
        }
      }),
    );
  }
};

export const toSelectAll = (e: KeyboardEvent) => {
  if (e.target && (e.target as HTMLElement).tagName === 'INPUT') return;
  if (e.target && (e.target as HTMLElement).tagName === 'TEXTAREA') return;
  if (e.metaKey && e.key === 'a') {
    const { clearSelection } = tableCellSelection();
    clearSelection();
    e.preventDefault();
    e.stopPropagation();
    const table = document.querySelector('table');
    const tds = table!.querySelectorAll('td');
    Array.from(tds).forEach((td) => td.classList.add('selected'));
  }
};

export const toDeleteCellValue = (e: KeyboardEvent, rows: RowsType, updateRows: (newRows: RowsType) => void) => {
  if (e.target && (e.target as HTMLElement).tagName === 'INPUT') return;
  if (e.target && (e.target as HTMLElement).tagName === 'TEXTAREA') return;
  if (e.metaKey && e.key === 'Backspace') {
    e.stopPropagation();
    const table = document.querySelector('table');
    const selectedValues = Array.from(table!.querySelectorAll('.selected')).map((td) => td.querySelector('input')?.value || '');

    updateRows(
      rows.map((row) => {
        const newRow = Object.fromEntries(Object.entries(row).map(([key, value]) => [key, selectedValues.includes(value) ? '' : value]));
        return newRow;
      }),
    );
  }
};

export const toDeleteAndCopyCellValue = (e: KeyboardEvent, rows: RowsType, updateRows: (newRows: RowsType) => void) => {
  if (e.target && (e.target as HTMLElement).tagName === 'INPUT') return;
  if (e.target && (e.target as HTMLElement).tagName === 'TEXTAREA') return;
  if (e.metaKey && e.key === 'x') {
    e.stopPropagation();
    const table = document.querySelector('table');
    const selectedValues = Array.from(table!.querySelectorAll('.selected')).map((td) => td.querySelector('input')?.value || '');
    const trs = table!.querySelectorAll('tr');

    const selectedCellsValuesString = Array.from(trs)
      .slice(1)
      .map((tr) =>
        Array.from(tr.querySelectorAll('.selected'))
          .map((cell) => getInputValue(cell as HTMLElement))
          .join('\t'),
      )
      .join('\n');

    navigator.clipboard.writeText(selectedCellsValuesString);

    updateRows(
      rows.map((row) => {
        const newRow = Object.fromEntries(Object.entries(row).map(([key, value]) => [key, selectedValues.includes(value) ? '' : value]));
        return newRow;
      }),
    );
  }
};

export const positiveAndZeroNumberOnly = (value?: number, alt?: number): number => {
  if (value || value === 0) return value;
  if (alt) return alt;
  return 0;
};

export const generateMarkdownTable = (manual?: GenerateMarkdownTableProps) => {
  const table = document.querySelector('table');
  const ths = table!.querySelectorAll('th');
  const headers = manual?.header || Array.from(ths).map((th) => getInputValue(th));

  const trs = table!.querySelectorAll('tr');

  const columnDivider = Array.from({ length: (headers || []).length }, (_) => '---');

  const body =
    manual?.body ||
    Array.from(trs)
      .slice(1)
      .map((tr) => {
        const tds = tr.querySelectorAll('td');
        return Array.from(tds).map((td) => getInputValue(td));
      });

  const result = [headers, columnDivider, ...body].map((row) => row.join(' | ')).join('\n');

  return result;
};
