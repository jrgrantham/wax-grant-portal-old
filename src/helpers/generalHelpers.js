import { produce } from "immer";

export function reorderItems(array, result) {
  const [item] = array.splice(result.source.index, 1);
  array.splice(result.destination.index, 0, item);
  return array;
}

export function reorderArrayByIndex(oldArray, originalIndex, newIndex) {
  const newArray = produce(oldArray, draft => {
    const [item] = draft.splice(originalIndex, 1);
    draft.splice(newIndex, 0, item);
    setArrayIndexAsSortPosition(draft)
  })
  return newArray;
}

export function setArrayIndexAsSortPosition(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].sortPosition = i;
  }
  return array;
}
