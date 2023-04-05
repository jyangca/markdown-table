import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { PasteFormBox, PasteFormContainer, PasteFormInput, PreviewBox } from './PasteForm.style';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Typography from '../common/Typography/Typography';
import Flex from '../common/Flex/Flex';
import { PasteFormRefType, TableApiType } from '@/types/common';
import { generateMarkdownTable } from '@/utils/common';

type PasteFormProps = {
  tableApi: TableApiType | undefined;
};

const PasteForm = forwardRef<PasteFormRefType, PasteFormProps>(({ tableApi }, ref) => {
  const pasteFormBoxRef = useRef<HTMLTextAreaElement>(null);
  const [displayText, setDisplayText] = useState<string>('');
  const [defaultValue, setDefaultValue] = useState<string>('');
  const [rowSep, setRowSep] = useState<string>('\n');
  const [colSep, setColSep] = useState<string>('\t');

  useEffect(() => {
    if (tableApi) {
      const cols = tableApi.getCurrentCols();
      const rows = tableApi.getCurrentRows();
      const data = tableApi.toCSVFormat({ cols, rows, toCsvCell: false, joinWith: '\t' });
      const body = rows.map((row) => Object.values(row));
      setDefaultValue(data);
      setDisplayText(generateMarkdownTable({ header: cols, body }));
    }
  }, [tableApi]);

  const handleRowSepOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowSep(e.target.value);
  };

  const handleColSepOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColSep(e.target.value);
  };

  const handlePasteOnChange = () => {
    if (pasteFormBoxRef.current) {
      const arrayForm = pasteFormBoxRef.current.value.split(rowSep).map((row) => row.split(colSep));
      const markdownForm = generateMarkdownTable({ header: arrayForm[0], body: arrayForm.slice(1) });
      setDisplayText(markdownForm);
    }
  };

  useImperativeHandle(ref, () => ({
    getPastedText: () => ({
      cols: tableApi!.getCurrentCols(),
      rows: tableApi!.getCurrentRows(),
    }),
  }));

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
        <PasteFormBox ref={pasteFormBoxRef} onChange={handlePasteOnChange} defaultValue={defaultValue}></PasteFormBox>
        <PreviewBox direction="COLUMN" justify="START" align="START" gap={{ row: 24 }} boxFill>
          <Typography fontType="pB20">Preview</Typography>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayText}</ReactMarkdown>
        </PreviewBox>
      </PasteFormContainer>
    </Flex>
  );
});

PasteForm.displayName = 'PasteForm';

export default PasteForm;
