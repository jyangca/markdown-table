import React, { ChangeEvent, useRef } from 'react';
import { DividerBox, NewPopoverContainer } from './NewPopover.style';
import { Button, Flex, Input, Typography } from '@/components/common';
import { TableApiType } from '@/types/common';

type NewPopoverProps = {
  tableApi?: TableApiType;
};
const NewPopover = ({ tableApi }: NewPopoverProps) => {
  const columnRef = useRef<HTMLInputElement>(null);
  const rowRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');

    const valueInRange = Math.min(Math.max(Number(inputValue), 0), 20);

    event.target.value = valueInRange.toString();
  };

  const handleButtonClick = () => {
    if (columnRef.current && rowRef.current) {
      const columnSize = columnRef.current.value || 1;
      const rowSize = rowRef.current.value || 1;
      const newCols = Array.from({ length: Number(columnSize) }, (_, index) => `Column${(index + 1).toString()}`);
      const newRows = Array.from({ length: Number(rowSize) }, () => {
        const row: Record<string, any> = {};
        newCols.forEach((col) => {
          row[col] = '';
        });
        return row;
      });
      tableApi?.handleChangeEditMode();
      tableApi?.updateCols(newCols);
      tableApi?.updateRows(newRows);
    }
  };
  return (
    <NewPopoverContainer direction="COLUMN" align="START" gap={{ row: 8 }} boxFill>
      <Flex direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
        <Typography fontType="h5R" color="systemWhite">
          Create New Table
        </Typography>
        <DividerBox boxFill />
      </Flex>
      <Flex gap={{ column: 6 }} justify="SPACE_BETWEEN" boxFill>
        <Typography fontType="pR20" color="systemWhite">
          Column
        </Typography>
        <Input ref={columnRef} width="130px" onChange={handleInputChange} />
      </Flex>
      <Flex gap={{ column: 6 }} justify="SPACE_BETWEEN" boxFill>
        <Typography fontType="pR20" color="systemWhite">
          Row
        </Typography>
        <Input ref={rowRef} width="130px" onChange={handleInputChange} />
      </Flex>
      <Typography fontType="spanB12" color="systemWhite">
        Range: 1 - 20
      </Typography>
      <Button fixWidth="100%" onClick={handleButtonClick}>
        Apply
      </Button>
    </NewPopoverContainer>
  );
};

export default NewPopover;
