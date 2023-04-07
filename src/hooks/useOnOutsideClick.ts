import React, { useCallback, useEffect } from 'react';

const useOnOutsideClick = (callback: Function, ...refs: React.RefObject<HTMLElement>[]) => {
  const onOutSideClick = useCallback(
    ({ target }: MouseEvent | TouchEvent) => {
      const checkTarget = refs.filter((ref) => ref.current?.contains(target as Node));

      if (checkTarget.length < 1) {
        callback();
      }
    },
    [refs, callback],
  );

  useEffect(() => {
    document.addEventListener('mousedown', onOutSideClick);
    document.addEventListener('touchstart', onOutSideClick);

    return () => {
      document.removeEventListener('mousedown', onOutSideClick);
      document.removeEventListener('touchstart', onOutSideClick);
    };
  }, [refs, callback]);
};

export default useOnOutsideClick;
