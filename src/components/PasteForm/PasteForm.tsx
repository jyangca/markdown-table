import React, { useEffect, useState } from 'react';
import { PasteFormBox, PasteFormContainer, PasteFormInput, PreviewBox } from './PasteForm.style';
import { TableApiType } from '../TableForm/TableForm';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Typography from '../common/Typography/Typography';
import Flex from '../common/Flex/Flex';

type PasteFormProps = {
  tableApi: TableApiType | undefined;
  handlePasteOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const PasteForm = ({ tableApi, handlePasteOnChange }: PasteFormProps) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [rowSep, setRowSep] = useState<string>('\\t');
  const [colSep, setColSep] = useState<string>('\\n');

  useEffect(() => {
    if (tableApi) {
      const cols = tableApi.getCurrentCols();
      const rows = tableApi.getCurrentRows();
      const data = tableApi.toCSVFormat({ cols, rows, toCsvCell: false, joinWith: '\t' });
      setDisplayText(data);
    }
  });

  const handleRowSepOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowSep(e.target.value);
  };

  const handleColSepOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColSep(e.target.value);
  };

  return (
    <Flex direction="COLUMN" align="START" boxFill>
      <Flex justify="START" align="START" boxFill>
        <Flex gap={{ column: 8 }}>
          <Typography fontType="pB12">ROW SEP</Typography>
          <PasteFormInput onChange={handleRowSepOnChange} value={rowSep} />
        </Flex>
        <Flex gap={{ column: 8 }}>
          <Typography fontType="pB12">COLUMN SEP</Typography>
          <PasteFormInput onChange={handleColSepOnChange} value={colSep} />
        </Flex>
      </Flex>
      <PasteFormContainer direction="ROW" gap={{ column: 32 }} boxFill>
        <PasteFormBox onChange={handlePasteOnChange} defaultValue={displayText}></PasteFormBox>
        <PreviewBox direction="COLUMN" justify="START" align="START" gap={{ row: 24 }} boxFill>
          <Typography fontType="pB20">미리보기</Typography>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayText}</ReactMarkdown>
        </PreviewBox>
      </PasteFormContainer>
    </Flex>
  );
};

export default PasteForm;
