import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { DividerBox, PasteFormBox, PasteFormContainer, PasteFormInput, PreviewBox, SeperationContainer } from './PasteForm.style';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Flex, Typography } from '@/components/common';
import { PasteFormRefType, TableApiType } from '@/types/common';
import { generateMarkdownTable } from '@/utils/common';

type PasteFormProps = {
  tableApi?: TableApiType;
};

type HandlePasteOnChangeProps = { newRowSep?: string; newColSep?: string };

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

  const normalizeInput = (value: string) => {
    const specialChars: Record<string, string> = {
      TAB: '\t',
      NEW_LINE: '\n',
    };
    return specialChars[value] ?? value;
  };
  const mapInputChar = (value: string) => {
    const specialChars: Record<string, string> = {
      '\t': 'TAB',
      '\n': 'NEW_LINE',
    };
    return specialChars[value] ?? value;
  };

  const handlePasteOnChange = ({ newRowSep, newColSep }: HandlePasteOnChangeProps) => {
    if (pasteFormBoxRef.current) {
      const arrayForm = pasteFormBoxRef.current.value.split(newRowSep || rowSep).map((row) => row.split(newColSep || colSep));
      const markdownForm = generateMarkdownTable({ header: arrayForm[0], body: arrayForm.slice(1) });
      setDisplayText(markdownForm);
    }
  };

  const handleRowSepOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowSep(normalizeInput(e.target.value));
    handlePasteOnChange({ newRowSep: normalizeInput(e.target.value) });
  };

  const handleColSepOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColSep(normalizeInput(e.target.value));
    handlePasteOnChange({ newColSep: normalizeInput(e.target.value) });
  };

  useImperativeHandle(ref, () => ({
    getPastedText: () => ({
      cols: tableApi!.getCurrentCols(),
      rows: tableApi!.getCurrentRows(),
    }),
  }));

  return (
    <Flex direction="COLUMN" style={{ padding: '16px' }} align="START" gap={{ row: 16 }} boxFill>
      <SeperationContainer justify="START" gap={{ column: 16 }} boxFill>
        <Flex gap={{ column: 8 }}>
          <Typography style={{ whiteSpace: 'nowrap' }} fontType="pB12">
            Row Separator
          </Typography>
          <PasteFormInput onChange={handleRowSepOnChange} value={mapInputChar(rowSep)} />
        </Flex>
        <Flex gap={{ column: 8 }}>
          <Typography style={{ whiteSpace: 'nowrap' }} fontType="pB12">
            Column Separator
          </Typography>
          <PasteFormInput onChange={handleColSepOnChange} value={mapInputChar(colSep)} />
        </Flex>
      </SeperationContainer>
      <Flex style={{ padding: '0 16px' }}>
        <Typography fontType="captionB12">\t는 TAB 으로, \n는 NEW_LINE 으로 입력해주세요.</Typography>
      </Flex>
      <PasteFormContainer direction="ROW" gap={{ column: 16 }} boxFill>
        <PasteFormBox ref={pasteFormBoxRef} onChange={() => handlePasteOnChange({})} defaultValue={defaultValue}></PasteFormBox>
        <PreviewBox direction="COLUMN" justify="START" align="START" gap={{ row: 16 }} boxFill>
          <DividerBox boxFill>
            <Typography fontType="pB20">Preview</Typography>
          </DividerBox>
          <Flex justify="CENTER" boxFill>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayText}</ReactMarkdown>
          </Flex>
        </PreviewBox>
      </PasteFormContainer>
    </Flex>
  );
});

PasteForm.displayName = 'PasteForm';

export default PasteForm;
