import React, { ChangeEvent, useRef } from 'react';
import { DividerBox, NewPopoverContainer } from './NewPopover.style';
import { Button, Flex, Input, Typography } from '@/components/common';

const NewPopover = () => {
  const columnRef = useRef<HTMLInputElement>(null);
  const rowRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');

    const valueInRange = Math.min(Math.max(Number(inputValue), 0), 20);

    event.target.value = valueInRange.toString();
  };

  const handleButtonClick = () => {
    if (columnRef.current && rowRef.current) {
      console.log(columnRef.current.value);
      console.log(rowRef.current.value);
    }
  };
  return (
    <NewPopoverContainer direction="COLUMN" align="START" gap={{ row: 8 }} boxFill>
      <Flex direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
        <Typography fontType="h5B" color="systemWhite">
          Create New Table
        </Typography>
        <DividerBox boxFill />
      </Flex>
      <Flex gap={{ column: 6 }} justify="SPACE_BETWEEN" boxFill>
        <Typography fontType="h5B" color="systemWhite">
          Column
        </Typography>
        <Input ref={columnRef} width="130px" onChange={handleInputChange} defaultValue={0} />
      </Flex>
      <Flex gap={{ column: 6 }} justify="SPACE_BETWEEN" boxFill>
        <Typography fontType="h5B" color="systemWhite">
          Row
        </Typography>
        <Input ref={rowRef} width="130px" onChange={handleInputChange} defaultValue={0} />
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
