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
    const trs = document.querySelectorAll('tr');
    const selectedCellsValuesString = Array.from(trs)
      .map((tr) =>
        Array.from(tr.querySelectorAll('.selected'))
          .map((cell) => cell.textContent)
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
