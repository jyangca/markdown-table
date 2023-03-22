const useSortColumn = (table: Element) => {
  const headers = table.querySelectorAll('th');
  const tableBody = table.querySelector('tbody');
  const trs = tableBody?.querySelectorAll('tr');

  headers?.forEach((header, index) => {
    header.addEventListener('click', () => {
      sortColumn(index);
    });
  });

  const transform = (index: number, content: string) => {
    const type = headers[index]?.getAttribute('data-type');
    switch (type) {
      case 'number':
        return parseFloat(content);
      case 'string':
      default:
        return content;
    }
  };

  const directions = Array.from(headers, (_) => 'desc');

  const sortColumn = (index: number) => {
    let direction = directions[index] || 'asc';
    console.log(directions, index);

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

    console.log(directions);

    trs?.forEach((row) => {
      tableBody?.removeChild(row);
    });

    newRows.forEach((newRow) => {
      tableBody?.appendChild(newRow);
    });
  };
};

export default useSortColumn;
