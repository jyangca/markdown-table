export const toClassName = (array: string[]) => array.join(' ');

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

export const toArrayLikeType = <T extends Node>(
  nodeList: NodeListOf<T>,
): ArrayLike<T> => {
  return nodeList;
};

export const toIterableType = <T extends Node>(
  nodeList: NodeListOf<T>,
): Iterable<T> => {
  return nodeList;
};
