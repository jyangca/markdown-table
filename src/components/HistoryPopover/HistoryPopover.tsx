import { TableApiType, TableHistoryType } from '@/types/common';
import React from 'react';
import { DividerBox, HistoryPopoverContainer } from './HistoryPopover.style';
import { Button, Flex, Typography } from '@/components/common';
import { generateKey } from '@/utils/common';

type HistoryPopoverProps = {
  tableApi?: TableApiType;
  tableHistory: TableHistoryType[];
};
const HistoryPopover = ({ tableApi, tableHistory }: HistoryPopoverProps) => {
  const handleClickButton = (history: TableHistoryType) => {
    tableApi?.updateCols(history.cols);
    tableApi?.updateRows(history.rows);
  };
  return (
    <HistoryPopoverContainer direction="COLUMN" align="START" gap={{ row: 8 }} boxFill>
      <Flex direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
        <Typography fontType="h5R" color="systemWhite">
          To Previous State
        </Typography>
        <DividerBox boxFill />
      </Flex>
      <Flex direction="COLUMN" gap={{ row: 4 }} boxFill>
        {tableHistory.map((history, index) => (
          <Button fixWidth="100%" onClick={() => handleClickButton(history)} key={generateKey(history.createdAt, index)}>
            {`Snapshot: ${history.createdAt}`}
          </Button>
        ))}
      </Flex>
    </HistoryPopoverContainer>
  );
};

export default HistoryPopover;
