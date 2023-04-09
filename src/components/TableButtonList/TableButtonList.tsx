import React, { memo } from 'react';
import { Flex, Button, Popover } from '@/components/common';
import { NewPopover } from '@/components';
import { TableApiType } from '@/types/common';

type TableButtonListProps = {
  editMode: boolean;
  pasteMode: boolean;
  tableApi: TableApiType | undefined;
};

const TableButtonList = ({ editMode, pasteMode, tableApi }: TableButtonListProps) => {
  return (
    <Flex justify="SPACE_BETWEEN" boxFill>
      <Flex gap={{ column: 8 }}>
        <Popover content={<NewPopover />}>
          <Button disabled={pasteMode || editMode}>New</Button>
        </Popover>
        <Popover content={<NewPopover />}>
          <Button disabled={pasteMode || editMode}>History</Button>
        </Popover>

        <Button disabled={!editMode} onClick={tableApi?.handleAddColumn}>
          Add Column
        </Button>
        <Button disabled={!editMode} onClick={tableApi?.handleAddRow}>
          Add Row
        </Button>

        <Button disabled={pasteMode} onClick={tableApi?.handleChangeEditMode}>
          {editMode ? 'View' : 'Edit'}
        </Button>
      </Flex>
      <Flex direction="ROW" gap={{ column: 8 }}>
        <Button disabled={editMode || pasteMode} onClick={tableApi?.handleExportCsv}>
          Export CSV
        </Button>
        <Button disabled={editMode} onClick={() => tableApi?.handleChangePasteMode({ isCancel: false })}>
          {pasteMode ? 'Done' : 'Paste'}
        </Button>
        {pasteMode && <Button onClick={() => tableApi?.handleChangePasteMode({ isCancel: true })}>Cancel</Button>}
      </Flex>
    </Flex>
  );
};

export default memo(TableButtonList);
