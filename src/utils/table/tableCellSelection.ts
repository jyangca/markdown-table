type isDraggingType = boolean;
export type TableCellSelectionReturnType = {
  clearSelection: () => void;
};

const tableCellSelection = () => {
  const table = document.querySelector('table');
  const tds = table!.querySelectorAll('td');

  let isDragging: isDraggingType = false;
  let startCell: HTMLTableCellElement | null = null;

  const clearSelection = () => {
    let selectedCells = table!.querySelectorAll('.selected');

    for (let i = 0; i < selectedCells.length; i++) {
      selectedCells[i].classList.remove('selected');
    }
  };

  const selectCells = (startCell: HTMLTableCellElement, endCell: HTMLTableCellElement) => {
    const trs = table!.querySelectorAll('tr');
    let startRowIndex = (startCell.parentNode! as HTMLTableRowElement).rowIndex;
    let endRowIndex = (endCell.parentNode! as HTMLTableRowElement).rowIndex;
    let startCellIndex = startCell.cellIndex;
    let endCellIndex = endCell.cellIndex;

    if (startRowIndex > endRowIndex) {
      let temp = startRowIndex;
      startRowIndex = endRowIndex;
      endRowIndex = temp;
    }

    if (startCellIndex > endCellIndex) {
      let temp = startCellIndex;
      startCellIndex = endCellIndex;
      endCellIndex = temp;
    }

    for (let i = startRowIndex; i <= endRowIndex; i++) {
      let tableCells = trs[i].querySelectorAll('td');

      for (let j = startCellIndex; j <= endCellIndex; j++) {
        tableCells[j].classList.add('selected');
      }
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    isDragging = true;
    startCell = event.target as HTMLTableCellElement;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && startCell) {
      let endCell = event.target as HTMLTableCellElement;

      clearSelection();

      selectCells(startCell, endCell);
    }
  };
  const handleMouseUp = () => {
    isDragging = false;
  };

  for (let i = 0; i < tds.length; i++) {
    tds[i].addEventListener('mousedown', handleMouseDown);
    tds[i].addEventListener('mousemove', handleMouseMove);
    tds[i].addEventListener('mouseup', handleMouseUp);
  }

  return {
    clearSelection,
  };
};

export default tableCellSelection;
