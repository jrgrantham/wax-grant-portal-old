

export function reorderItems(array, result) {
  const [item] = array.splice(result.source.index, 1);
  array.splice(result.destination.index, 0, item);
  return array;
}

export function reorderArrayByIndex(array, originalIndex, newIndex) {
  const [item] = array.splice(originalIndex, 1);
  array.splice(newIndex, 0, item)
  return array
}

export function setArrayIndexAsSortPosition(array) {
  for (let i=0; i<array.length; i++) {
    array[i].sortPosition = i
  }
  return array
}
