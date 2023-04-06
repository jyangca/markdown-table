import { SelectCellsManualType } from '@/types/common';
import tableCellSelection from './tableCellSelection';

export type TableCellRangeSelectionType = {
  handleEditModeClick: ({ fromCellIndex, toCellIndex, fromRowIndex, toRowIndex }: SelectCellsManualType) => void;
};

const tableCellRangeSelection = ({ fromCellIndex, toCellIndex, fromRowIndex, toRowIndex }: SelectCellsManualType): void => {
  const { selectCells, clearSelection } = tableCellSelection();

  clearSelection();

  selectCells({
    manual: {
      fromCellIndex,
      toCellIndex,
      fromRowIndex,
      toRowIndex,
    },
  });
};

export default tableCellRangeSelection;
