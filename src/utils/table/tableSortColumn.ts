export type TableSortColumnReturnType = {
  handleClick: (index: number) => void;
};

const tableSortColumn = () => {
  const table = document.querySelector('#table');
  const ths = table!.querySelectorAll('th');
  const tableBody = table!.querySelector('tbody');

  const transform = (index: number, content: string) => {
    const type = ths[index]?.getAttribute('data-type');
    switch (type) {
      case 'number':
        return parseFloat(content);
      case 'string':
      default:
        return content;
    }
  };

  const directions = Array.from(ths, (_) => 'desc');

  const sortColumn = (index: number) => {
    const trs = tableBody?.querySelectorAll('tr');

    let direction = directions[index] || 'asc';

    const newRows = Array.from(trs || []);

    const multiplier = direction === 'asc' ? 1 : -1;

    newRows.sort((rowA, rowB) => {
      const cellA = rowA.querySelectorAll('td')[index].innerHTML;
      const cellB = rowB.querySelectorAll('td')[index].innerHTML;

      const a = transform(index, cellA);
      const b = transform(index, cellB);

      if (a > b) {
        return 1 * multiplier;
      }
      if (a < b) {
        return -1 * multiplier;
      }
      return 0;
    });

    directions[index] = direction === 'asc' ? 'desc' : 'asc';

    trs?.forEach((row) => {
      tableBody?.removeChild(row);
    });

    newRows.forEach((newRow) => {
      tableBody?.appendChild(newRow);
    });
  };

  return {
    handleClick: sortColumn,
  };
};

export default tableSortColumn;
