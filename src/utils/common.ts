import { RowsType } from '@/components/TableForm/TableForm';

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
      name: 'LEONTIEN ZIJLAARD-VAN MOORSEL',
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
  if (e.metaKey && e.key === 'c') {
    e.preventDefault();
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

export const removeEmptyRow = (rows: RowsType) => {
  const newRows = rows.filter((row) => {
    const values = Object.values(row);
    return values.some((value) => value !== '');
  });
  return newRows;
};

export const toBold = (e: KeyboardEvent, rows: RowsType, updateRows: (newRows: RowsType) => void) => {
  if (e.metaKey && e.key === 'b') {
    e.preventDefault();
    const table = document.querySelector('table');
    const selectedValues = Array.from(table!.querySelectorAll('.selected')).map((td) => td.querySelector('input')?.value || '');
    const isBoldMode = selectedValues.some((value) => value.startsWith('**') && value.endsWith('**'));

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
    e.preventDefault();
    const table = document.querySelector('table');
    const selectedValues = Array.from(table!.querySelectorAll('.selected')).map((td) => td.querySelector('input')?.value || '');
    const isBoldMode = selectedValues.some(
      (value) =>
        (value.startsWith('*') && value.endsWith('*') && !value.startsWith('**') && !value.endsWith('**')) ||
        (value.startsWith('***') && value.endsWith('***')),
    );

    updateRows(
      rows.map((row) => {
        if (!isBoldMode) {
          const newRow = Object.fromEntries(Object.entries(row).map(([key, value]) => [key, selectedValues.includes(value) ? `*${value}*` : value]));
          return newRow;
        } else {
          const newRow = Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key, selectedValues.includes(value) ? value.replace(/\*/g, '') : value]),
          );
          return newRow;
        }
      }),
    );
  }
};

export const toPreviousRows = (
  e: KeyboardEvent,
  setRows: React.Dispatch<React.SetStateAction<RowsType>>,
  rowHistoryRef: React.MutableRefObject<RowsType[]>,
) => {
  if (e.metaKey && e.key === 'z') {
    e.preventDefault();
    const rowsHistory = [...rowHistoryRef.current];
    const rollBackPoint = rowsHistory.pop();
    if (rollBackPoint) {
      setRows(rollBackPoint);
    }
    rowHistoryRef.current = rowsHistory;
  }
};

export const toSelectAll = (e: KeyboardEvent) => {
  if (e.metaKey && e.key === 'a') {
    e.preventDefault();
    const table = document.querySelector('table');
    const tds = table!.querySelectorAll('td');
    Array.from(tds).forEach((td) => td.classList.add('selected'));
  }
};

export const toDeleteCellValue = (e: KeyboardEvent, rows: RowsType, updateRows: (newRows: RowsType) => void) => {
  if (e.metaKey && e.key === 'Backspace') {
    e.preventDefault();
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
  if (e.metaKey && e.key === 'x') {
    e.preventDefault();
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
