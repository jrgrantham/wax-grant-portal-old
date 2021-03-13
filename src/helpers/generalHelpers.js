import { produce } from "immer";
import { toast } from "react-toastify";
toast.configure();

// export function reorderWithImmerItems(oldArray, result) {
//   const newArray = produce(oldArray, draft => {
//     const [item] = draft.splice(result.source.index, 1);
//     draft.splice(result.destination.index, 0, item);
//   })
//   return newArray;
// }

export function reorderArrayByIndex(oldArray, originalIndex, newIndex) {
  const newArray = produce(oldArray, (draft) => {
    const [item] = draft.splice(originalIndex, 1);
    draft.splice(newIndex, 0, item);
    setArrayIndexAsSortPosition(draft);
  });
  return newArray;
}

export function setArrayIndexAsSortPosition(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].sortPosition = i;
  }
  return array;
}

export function isNumberKey(e) {
  const charCode = e.which ? e.which : e.keyCode;
  // if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
  if ((charCode < 48 && !(charCode === 37 || charCode === 39)) || charCode > 57)
    e.preventDefault();
}

export function leadingZero(number) {
  let zeroNumber = number.toString();
  zeroNumber = number < 10 ? 0 + zeroNumber : zeroNumber;
  return zeroNumber;
}


export function checkZero(value) {
  if (value === 0) {
    toast.info("zero days entered", {
      // success, info, warn, error
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  }
}