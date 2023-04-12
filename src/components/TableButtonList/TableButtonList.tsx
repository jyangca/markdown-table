import React, { memo, useEffect, useState } from 'react';
import { Flex, Button, Popover, Modal } from '@/components/common';
import { HistoryPopover, ModalContent, NewPopover } from '@/components';
import { TableApiType, TableHistoryType } from '@/types/common';
import { setCookie } from '@/utils/common';
import Cookies from 'js-cookie';

type TableButtonListProps = {
  editMode: boolean;
  pasteMode: boolean;
  tableApi?: TableApiType;
  tableHistory: TableHistoryType[];
};

const TableButtonList = ({ editMode, pasteMode, tableApi, tableHistory }: TableButtonListProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const visited = Cookies.get('visited');
    if (!visited) {
      setCookie('visited', 'true', 30);
      setModalOpen(true);
    }
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Flex justify="SPACE_BETWEEN" boxFill>
        <Flex gap={{ column: 8 }}>
          <Popover content={<NewPopover tableApi={tableApi} />}>
            <Button disabled={pasteMode || editMode}>New</Button>
          </Popover>
          <Popover content={<HistoryPopover tableApi={tableApi} tableHistory={tableHistory} />} closeOption={{ keyDown: true, contentClick: true }}>
            <Button disabled={pasteMode || editMode}>History</Button>
          </Popover>
          <Button disabled={!editMode} onClick={() => tableApi?.handleAddColumn()}>
            Add Column
          </Button>
          <Button disabled={!editMode} onClick={() => tableApi?.handleAddRow()}>
            Add Row
          </Button>

          <Button disabled={pasteMode} onClick={tableApi?.handleChangeEditMode}>
            {editMode ? 'View' : 'Edit'}
          </Button>
        </Flex>
        <Flex direction="ROW" gap={{ column: 8 }}>
          <Button onClick={handleModalOpen}>Help</Button>
          <Button disabled={editMode || pasteMode} onClick={tableApi?.handleExportCsv}>
            Export CSV
          </Button>
          <Button disabled={editMode} onClick={() => tableApi?.handleChangePasteMode({ isCancel: false })}>
            {pasteMode ? 'Done' : 'Paste'}
          </Button>
          {pasteMode && <Button onClick={() => tableApi?.handleChangePasteMode({ isCancel: true })}>Cancel</Button>}
        </Flex>
      </Flex>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent />
      </Modal>
    </>
  );
};

export default memo(TableButtonList);
