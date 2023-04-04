import tableCellSelection from './tableCellSelection';

export type TableHeaderCellSelectionType = {
  handleEditModeClick: (index: number) => void;
};

const tableHeaderCellSelection = (index: number): void => {
  const { selectCells, clearSelection } = tableCellSelection();
  const table = document.querySelector('table');
  const rowLength = table!.querySelectorAll('tr').length;

  clearSelection();

  selectCells({
    manual: {
      fromCellIndex: index,
      toCellIndex: index,
      fromRowIndex: 1,
      toRowIndex: rowLength - 1,
    },
  });
};

export default tableHeaderCellSelection;
