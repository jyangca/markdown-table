import React from 'react';
import Flex from '../common/Flex/Flex';
import Button from '../common/Button/Button';
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
        <Button disabled={!editMode} onClick={tableApi?.handleAddColumn}>
          Add Column
        </Button>
        <Button disabled={!editMode} onClick={tableApi?.handleAddRow}>
          Add Row
        </Button>
        <Button disabled={editMode || pasteMode} onClick={tableApi?.handleExportCsv}>
          Export CSV
        </Button>
        <Button disabled={pasteMode} onClick={tableApi?.handleChangeEditMode}>
          {editMode ? '보기' : '편집'}
        </Button>
      </Flex>
      <Flex direction="ROW" gap={{ column: 8 }}>
        <Button disabled={editMode} onClick={tableApi?.handleChangePasteMode}>
          {pasteMode ? 'Done' : 'Paste'}
        </Button>
        {pasteMode && <Button onClick={tableApi?.handleChangePasteMode}>Cancel</Button>}
      </Flex>
    </Flex>
  );
};

export default TableButtonList;
