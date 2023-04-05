import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { DividerBox, PasteFormBox, PasteFormContainer, PasteFormInput, PreviewBox } from './PasteForm.style';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Typography from '../common/Typography/Typography';
import Flex from '../common/Flex/Flex';
import { PasteFormRefType, TableApiType } from '@/types/common';
import { generateMarkdownTable } from '@/utils/common';

type PasteFormProps = {
  tableApi: TableApiType | undefined;
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
    <Flex direction="COLUMN" align="START" boxFill>
      <Flex justify="START" align="START" boxFill>
        <Flex gap={{ column: 8 }}>
          <Typography fontType="pB12">ROW SEP</Typography>
          <PasteFormInput onChange={handleRowSepOnChange} value={mapInputChar(rowSep)} />
        </Flex>
        <Flex gap={{ column: 8 }}>
          <Typography fontType="pB12">COLUMN SEP</Typography>
          <PasteFormInput onChange={handleColSepOnChange} value={mapInputChar(colSep)} />
        </Flex>
      </Flex>
      <PasteFormContainer direction="ROW" gap={{ column: 16 }} boxFill>
        <PasteFormBox ref={pasteFormBoxRef} onChange={() => handlePasteOnChange({})} defaultValue={defaultValue}></PasteFormBox>
        <PreviewBox direction="COLUMN" justify="START" align="START" gap={{ row: 16 }} boxFill>
          <DividerBox boxFill>
            <Typography fontType="pB20">Preview</Typography>
          </DividerBox>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayText}</ReactMarkdown>
        </PreviewBox>
      </PasteFormContainer>
    </Flex>
  );
});

PasteForm.displayName = 'PasteForm';

export default PasteForm;
