import { useReducer } from 'react';

export type ForceUpdateType = () => void;
type useForceUpdateType = () => [number, ForceUpdateType];

const updater = (num: number): number => (num + 1) % 1_000_000;

/**
 * @name useForceUpdate
 * @description
 * 반환된 함수를 실행 시 강제로 리렌더가 실행됩니다.
 *
 * ```ts
 * const useForceUpdate = () => [
 * deps, // number
 * forceUpdate // ForceUpdateType
 * ]
 * ```
 */
const useForceUpdate: useForceUpdateType = () => {
  const [deps, forceUpdate] = useReducer(updater, 0);

  return [deps, forceUpdate as ForceUpdateType];
};

export default useForceUpdate;
