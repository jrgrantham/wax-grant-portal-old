import { produce } from "immer";

// export function reorderWithImmerItems(oldArray, result) {
//   const newArray = produce(oldArray, draft => {
//     const [item] = draft.splice(result.source.index, 1);
//     draft.splice(result.destination.index, 0, item);
//   })
//   return newArray;
// }

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
