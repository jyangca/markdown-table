export const toClassName = (array: Array<string | number>) => array.join(' ');

export const generateKey = (item: unknown, index?: number) =>
  `${JSON.stringify(item)}_${index}`;

export const initialData = () => {
  const cols = ['name', 'age', 'country', 'sport'];
  const rows = [
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
  ];
  return { cols, rows };
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
  const cols = Array.from(ths).map(
    (th) => th.querySelector('input')?.value ?? '',
  );
  return cols;
};

export const copySelected = (e: KeyboardEvent) => {
  if (e.metaKey && e.key === 'c') {
    e.preventDefault();
    const selectedCells = document.querySelectorAll('.selected');
    const selectedCellsValues = Array.from(selectedCells).map(
      (cell) => cell.textContent,
    );
    const selectedCellsValuesString = selectedCellsValues.join('\t');
    navigator.clipboard.writeText(selectedCellsValuesString);
  }
};
