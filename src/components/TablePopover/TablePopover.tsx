import React from 'react';
import { Button, Flex, Typography } from '@/components/common';
import { TableApiType } from '@/types/common';
import { TablePopoverContainer } from './TablePopover.style';
import { getCurrentCols, getCurrentRows, removeEmptyRowAndCol } from '@/utils/common';

type TablePopoverProps = {
  tableApi: TableApiType | undefined;
  mode: 'COLUMN' | 'ROW';
  index: number;
};

const TablePopover = ({ tableApi, mode, index }: TablePopoverProps) => {
  const handleAddColumnClick = (position: 'LEFT' | 'RIGHT') => {
    if (position === 'LEFT') {
      tableApi?.handleAddColumn(index.toString());
    }
    if (position === 'RIGHT') {
      tableApi?.handleAddColumn((index + 1).toString());
    }
  };

  const handleDeleteColumnClick = () => {
    const newCols = getCurrentCols().filter((_, i) => i !== index);
    const newRows = getCurrentRows().map((row) => {
      const newRow = Object.fromEntries(Object.entries(row).filter(([key]) => newCols.includes(key)));
      return newRow;
    });
    tableApi?.updateCols(newCols);
    tableApi?.updateRows(newRows);
  };

  const handleAddRowClick = (position: 'ABOVE' | 'BELOW') => {
    if (position === 'ABOVE') {
      tableApi?.handleAddRow(index.toString());
    }
    if (position === 'BELOW') {
      tableApi?.handleAddRow((index + 1).toString());
    }
  };

  const handleDeleteRowClick = () => {
    const newRows = getCurrentRows().filter((_, i) => i !== index);
    tableApi?.updateRows(newRows);
  };

  return (
    <TablePopoverContainer direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
      {mode === 'COLUMN' ? (
        <Flex direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
          <Button fixWidth="100%" onClick={() => handleAddColumnClick('LEFT')}>
            Add Column (Left)
          </Button>
          <Button fixWidth="100%" onClick={() => handleAddColumnClick('RIGHT')}>
            Add Column (Right)
          </Button>
          <Button fixWidth="100%" onClick={handleDeleteColumnClick}>
            Delete Current Column
          </Button>
        </Flex>
      ) : (
        <Flex direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
          <Button fixWidth="100%" onClick={() => handleAddRowClick('ABOVE')}>
            Add Row (Above)
          </Button>
          <Button fixWidth="100%" onClick={() => handleAddRowClick('BELOW')}>
            Add Row (Below)
          </Button>
          <Button fixWidth="100%" onClick={handleDeleteRowClick}>
            Delete Current Row
          </Button>
        </Flex>
      )}
    </TablePopoverContainer>
  );
};

export default TablePopover;
