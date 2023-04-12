import React from 'react';
import { Flex, Typography } from '@/components/common';
import { ContentsContainer, DividerBox, ModeContentContainer, RootContainer, TypoBox } from './ModalContent.style';

const ModalContent = () => {
  return (
    <RootContainer direction="COLUMN" gap={{ row: 30 }} boxFill>
      <DividerBox justify="CENTER" boxFill>
        <Typography fontType="h4B">도움말</Typography>
      </DividerBox>
      <Flex direction="COLUMN" align="START" gap={{ row: 8 }} boxFill>
        <TypoBox>
          <Typography fontType="h5B">Quick Start</Typography>
        </TypoBox>
        <ContentsContainer align="START" direction="COLUMN" gap={{ row: 8 }}>
          <TypoBox boxFill>
            <Typography fontType="pB12">Have Data</Typography>
          </TypoBox>
          <ModeContentContainer direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
            <Typography fontType="pB12" color="system5">
              1. Paste copied data
            </Typography>
            <Typography fontType="pB12" color="system5">
              2. Seperate to column and row
            </Typography>
            <Typography fontType="pB12" color="system5">
              3. Check preview
            </Typography>
            <Typography fontType="pB12" color="system5">
              4. Click Copy button
            </Typography>
          </ModeContentContainer>
        </ContentsContainer>
        <ContentsContainer align="START" direction="COLUMN" gap={{ row: 8 }}>
          <TypoBox boxFill>
            <Typography fontType="pB12">Create New</Typography>
          </TypoBox>
          <ModeContentContainer direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
            <Typography fontType="pB12" color="system5">
              1. create new column and Row
            </Typography>
            <Typography fontType="pB12" color="system5">
              2. Check preview
            </Typography>
            <Typography fontType="pB12" color="system5">
              3. Click Copy button
            </Typography>
          </ModeContentContainer>
        </ContentsContainer>
      </Flex>
      <Flex direction="COLUMN" align="START" gap={{ row: 8 }} boxFill>
        <TypoBox>
          <Typography fontType="h5B">Function</Typography>
        </TypoBox>
        <ContentsContainer align="START" direction="COLUMN" gap={{ row: 8 }}>
          <TypoBox boxFill>
            <Typography fontType="pB12">View Mode</Typography>
          </TypoBox>
          <ModeContentContainer direction="COLUMN" align="START" gap={{ row: 4 }} boxFill>
            <Typography fontType="pB12" color="system5">
              · ㅇㄴㅇㄴㅁㅇㅁ
            </Typography>
          </ModeContentContainer>
        </ContentsContainer>
      </Flex>
    </RootContainer>
  );
};

export default ModalContent;
