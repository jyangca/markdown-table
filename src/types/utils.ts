export const toArrayLikeType = <T extends Node>(
  nodeList: NodeListOf<T>,
): ArrayLike<T> => {
  return nodeList;
};

export const toIterableType = <T extends Node>(
  nodeList: NodeListOf<T>,
): Iterable<T> => {
  return nodeList;
};

export const toElementType = (value: HTMLElement): Element => value;
