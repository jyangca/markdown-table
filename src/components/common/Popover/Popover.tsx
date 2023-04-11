import React, { useEffect, useRef, useState } from 'react';
import { Portal } from '@/components/common';
import { ContentBox } from './Popover.style';

type PopoverCloseOption = {
  contentClick: boolean;
  keyDown: boolean;
};

type PopoverProps = {
  content: React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
  closeOption?: PopoverCloseOption;
};

const Popover = ({ children, content, closeOption }: PopoverProps) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openPopover) {
      const triggerNode = triggerRef.current;
      const contentNode = contentRef.current;

      if (triggerNode && contentNode) {
        const triggerRect = triggerNode.getBoundingClientRect();
        const childrenRect = contentNode.getBoundingClientRect();

        const top = triggerRect.top;
        const left =
          triggerRect.right + childrenRect.width + 4 > window.innerWidth
            ? triggerRect.left - childrenRect.width - 4
            : triggerRect.left + triggerRect.width + 4;

        contentNode.style.top = `${top}px`;
        contentNode.style.left = `${left}px`;
      }
    }
  }, [openPopover]);

  useEffect(() => {
    if (closeOption?.keyDown) {
      document.addEventListener('keydown', () => setOpenPopover(false));

      return document.removeEventListener('keydown', () => setOpenPopover(false));
    }
  }, []);

  const handleContentClick = () => {
    if (closeOption?.contentClick) {
      setOpenPopover(false);
    }
  };

  return (
    <>
      <div ref={triggerRef} onClick={() => setOpenPopover((prev) => !prev)}>
        {children}
      </div>
      <Portal isOpen={openPopover} onDimClick={() => setOpenPopover(false)}>
        <ContentBox ref={contentRef} onClick={handleContentClick}>
          {content}
        </ContentBox>
      </Portal>
    </>
  );
};

export default Popover;
