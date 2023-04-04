import { positiveAndZeroNumberOnly } from '../common';

type isDraggingType = boolean;
export type TableCellSelectionReturnType = {
  clearSelection: () => void;
};

const tableCellSelection = () => {
  let isDragging: isDraggingType = false;
  let startCell: HTMLTableCellElement | null = null;

  const tds = document!.querySelectorAll('td');

  const clearSelection = () => {
    const table = document.querySelector('table');
    const selectedCells = table!.querySelectorAll('.selected');
    const ths = document.querySelectorAll('th');
    const target = [...selectedCells, ...ths];

    for (let i = 0; i < target.length; i++) {
      target[i].classList.remove('selected', 'border-top', 'border-bottom', 'border-left', 'border-right', 'border-bottom-none');
    }
  };

  type SelectCellsType = {
    startCell?: HTMLTableCellElement;
    endCell?: HTMLTableCellElement;
    manual?: { fromCellIndex: number; toCellIndex: number; fromRowIndex: number; toRowIndex: number };
  };

  const selectCells = ({ startCell, endCell, manual }: SelectCellsType) => {
    const table = document.querySelector('table');
    const trs = table!.querySelectorAll('tr');
    const ths = table!.querySelectorAll('th');
    let startRowIndex = manual?.fromRowIndex || (startCell!.parentNode! as HTMLTableRowElement).rowIndex;
    let endRowIndex = manual?.toRowIndex || (endCell!.parentNode! as HTMLTableRowElement).rowIndex;
    let startCellIndex = positiveAndZeroNumberOnly(manual?.fromCellIndex, startCell?.cellIndex);
    let endCellIndex = positiveAndZeroNumberOnly(manual?.toCellIndex, endCell?.cellIndex);

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

    for (let i = startRowIndex - 1; i <= endRowIndex; i++) {
      const tableCells = trs[i]?.querySelectorAll('td');

      for (let j = startCellIndex; j <= endCellIndex; j++) {
        if (i === startRowIndex - 1) {
          if (i === 0) {
            ths[j].classList.add('border-bottom-none');
          } else if (tableCells[j]) {
            tableCells[j].classList.add('border-bottom-none');
          }
          continue;
        }
        if (tableCells[j]) {
          tableCells[j].classList.add('selected');

          if (i === startRowIndex) {
            tableCells[j].classList.add('border-top');
          }
          if (i === endRowIndex) {
            tableCells[j].classList.add('border-bottom');
          }
          if (j === startCellIndex) {
            tableCells[j].classList.add('border-left');
          }
          if (j === endCellIndex) {
            tableCells[j].classList.add('border-right');
          }
        }
      }
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    clearSelection();
    isDragging = true;
    startCell = event.target as HTMLTableCellElement;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && startCell) {
      let endCell = event.target as HTMLTableCellElement;

      clearSelection();

      selectCells({ startCell, endCell });
    }
  };
  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseClick = (event: MouseEvent) => {
    clearSelection();
    let currentCell = event.target as HTMLTableCellElement;
    if (currentCell.tagName === 'INPUT') {
      currentCell = currentCell.parentNode?.parentNode as HTMLTableCellElement;
    }

    selectCells({ startCell: currentCell, endCell: currentCell });
  };

  for (let i = 0; i < tds.length; i++) {
    tds[i].addEventListener('mousedown', handleMouseDown, true);
    tds[i].addEventListener('mousemove', handleMouseMove, true);
    tds[i].addEventListener('mouseup', handleMouseUp, true);
    tds[i].addEventListener('click', handleMouseClick, true);
  }

  return {
    selectCells,
    clearSelection,
  };
};

export default tableCellSelection;
