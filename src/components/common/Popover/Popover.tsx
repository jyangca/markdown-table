import React, { useEffect, useRef, useState } from 'react';
import { Flex, Portal } from '@/components';
import { ContentBox } from './Popover.style';

type PopoverProps = {
  content: React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
};

const Popover = ({ children, content }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const triggerNode = triggerRef.current;
      const contentNode = contentRef.current;

      if (triggerNode && contentNode) {
        const triggerRect = triggerNode.getBoundingClientRect();
        const childrenRect = contentNode.getBoundingClientRect();

        const top = triggerRect.top;
        const left = triggerRect.left + childrenRect.width;

        contentNode.style.top = `${top}px`;
        contentNode.style.left = `${left}px`;
      }
    }
  }, [isOpen]);

  return (
    <>
      <div ref={triggerRef} onClick={() => setIsOpen((prev) => !prev)}>
        {children}
      </div>
      <Portal isOpen={isOpen} onDimClick={() => setIsOpen(false)}>
        <ContentBox ref={contentRef} onClick={() => setIsOpen(false)}>
          {content}
        </ContentBox>
      </Portal>
    </>
  );
};

export default Popover;
