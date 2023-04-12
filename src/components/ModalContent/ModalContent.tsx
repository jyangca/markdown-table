import React, { useState } from 'react';
import { Flex, Typography } from '@/components/common';
import { ContentsContainer, DividerBox, ModeContentContainer, RootContainer, TabItem, TypoBox } from './ModalContent.style';

type TabType = 'Start' | 'View' | 'Edit';

const ModalContent = () => {
  const tabList: TabType[] = ['View', 'Edit'];
  const [tab, setTab] = useState<TabType>('View');

  const handleTabClick = (tab: TabType) => {
    setTab(tab);
  };

  const tabContent = () => {
    switch (tab) {
      case 'View':
        return (
          <Flex direction="COLUMN" align="START" gap={{ row: 16 }} boxFill>
            <TypoBox>
              <Typography fontType="h5B">View Mode</Typography>
            </TypoBox>
            <ContentsContainer align="START" direction="COLUMN" gap={{ row: 8 }}>
              <TypoBox boxFill>
                <Typography fontType="pB20">Features</Typography>
              </TypoBox>
              <ModeContentContainer direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Create new table
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Click &ldquo;New&rdquo;]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Select
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Drag]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Select all
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Command & Ctrl + A]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Copy selected
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Command & Ctrl + C]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Sort column values in order
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Click Column]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Export to CSV
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Click &ldquo;Export CSV&rdquo;]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Revert to a previously saved value
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Click &ldquo;History&rdquo;]
                  </Typography>
                </Flex>
              </ModeContentContainer>
            </ContentsContainer>
          </Flex>
        );
      case 'Edit':
        return (
          <Flex direction="COLUMN" align="START" gap={{ row: 16 }} boxFill>
            <TypoBox>
              <Typography fontType="h5B">Edit Mode</Typography>
            </TypoBox>
            <ContentsContainer align="START" direction="COLUMN" gap={{ row: 8 }}>
              <TypoBox boxFill>
                <Typography fontType="pB20">Features</Typography>
              </TypoBox>
              <ModeContentContainer direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Copy and delete cell value
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Command & Ctrl + X]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · To bold text
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Command & Ctrl + B]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · To italicize text
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Command & Ctrl + I]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Move column position
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Drag Column]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Add new column
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Click &ldquo;Add Column&rdquo;]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Add new row
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Click &ldquo;Add Row&rdquo;]
                  </Typography>
                </Flex>
                <Flex justify="SPACE_BETWEEN" boxFill>
                  <Typography fontType="pB12" color="system5">
                    · Align column
                  </Typography>
                  <Typography fontType="pB12" color="system5">
                    [Click align type on Popover]
                  </Typography>
                </Flex>
              </ModeContentContainer>
            </ContentsContainer>
          </Flex>
        );
      default:
        return null;
    }
  };

  return (
    <RootContainer direction="COLUMN" gap={{ row: 6 }} boxFill>
      <DividerBox justify="CENTER" boxFill>
        <Typography fontType="h4B">Guide</Typography>
      </DividerBox>
      <Flex direction="COLUMN" align="START" gap={{ row: 16 }} boxFill>
        <Flex gap={{ column: 4 }} boxFill>
          {tabList.map((tabItem) => (
            <TabItem justify="CENTER" key={tabItem} isSelected={tabItem === tab} onClick={() => handleTabClick(tabItem)} boxFill>
              <Typography fontType="pB12" color="system5">
                {tabItem}
              </Typography>
            </TabItem>
          ))}
        </Flex>
        {tabContent()}
      </Flex>
    </RootContainer>
  );
};

export default ModalContent;
