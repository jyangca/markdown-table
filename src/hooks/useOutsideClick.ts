import { useEffect } from 'react';

const useOutsideClick = (ref: HTMLElement, onClickOut: () => void) => {
  useEffect(() => {
    if (ref) {
      const onClick = ({ target }: MouseEvent) => !ref.contains(target as HTMLElement) && onClickOut?.();
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
    }
  }, []);
};

export default useOutsideClick;
