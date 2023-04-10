import React from 'react';
import { Button, Flex, Typography } from '@/components/common';
import { TableApiType } from '@/types/common';
import { TablePopoverContainer } from './TablePopover.style';
import { getCurrentCols, getCurrentRows, removeEmptyRowAndCol } from '@/utils/common';

type TablePopoverProps = {
  tableApi: TableApiType | undefined;
  mode: 'COLUMN' | 'ROW';
  selected: string | Record<string, any>;
};

const TablePopover = ({ tableApi, selected, mode }: TablePopoverProps) => {
  const handleAddColumnClick = (position: 'LEFT' | 'RIGHT') => {
    // const { cols: newCols, rows: newRows } = removeEmptyRowAndCol({ rows: getCurrentRows(), cols: getCurrentCols() });
  };

  return (
    <TablePopoverContainer direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
      {mode === 'COLUMN' ? (
        <Flex direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
          <Button fixWidth="100%">Add Column (Left)</Button>
          <Button fixWidth="100%">Add Column (Right)</Button>
          <Button fixWidth="100%">Delete Current Column</Button>
        </Flex>
      ) : (
        <Flex direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
          <Button fixWidth="100%">Add Row (Above)</Button>
          <Button fixWidth="100%">Add Row (Below)</Button>
          <Button fixWidth="100%">Delete Current Row</Button>
        </Flex>
      )}
    </TablePopoverContainer>
  );
};

export default TablePopover;
