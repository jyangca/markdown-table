import { useEffect } from 'react';

const useOutsideClick = (ref: any, onClickOut: () => void) => {
  useEffect(() => {
    const onClick = ({ target }: any) => !ref.contains(target) && onClickOut?.();
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
};

export default useOutsideClick;
