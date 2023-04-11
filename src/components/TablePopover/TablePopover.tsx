import React from 'react';
import { Button, Flex, Typography } from '@/components/common';
import { ColumnAlignType, TableApiType, UpdateColumnAlignType } from '@/types/common';
import { TablePopoverContainer } from './TablePopover.style';
import { getCurrentCols, getCurrentRows } from '@/utils/common';

type TablePopoverProps = {
  updateColumnAlign: UpdateColumnAlignType;
  tableApi?: TableApiType;
  mode: 'COLUMN' | 'ROW';
  index: number;
};

const TablePopover = ({ updateColumnAlign, tableApi, mode, index }: TablePopoverProps) => {
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

  const alignMap: Record<string, ColumnAlignType> = {
    LEFT: ':--',
    CENTER: ':-:',
    RIGHT: '--:',
  };

  const handleColumnAlignClick = (align: 'LEFT' | 'CENTER' | 'RIGHT') => {
    const cols = tableApi?.getCurrentCols();
    updateColumnAlign((prev) => {
      if (cols) {
        const newColumnAlign = { ...prev };
        newColumnAlign[cols[index]] = alignMap[align];
        return newColumnAlign;
      }
      return prev;
    });
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
          <Flex gap={{ column: 3 }}>
            <Typography fontType="pR20" color="systemWhite">
              Align:
            </Typography>
            <Button onClick={() => handleColumnAlignClick('LEFT')}>Left</Button>
            <Button onClick={() => handleColumnAlignClick('CENTER')}>Center</Button>
            <Button onClick={() => handleColumnAlignClick('RIGHT')}>Right</Button>
          </Flex>
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
