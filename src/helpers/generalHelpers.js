import { produce } from "immer";
import { toast } from "react-toastify";
import { toastDelay } from "./settings";
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
  if ((charCode < 48 && !(charCode === 37 || charCode === 39 || charCode === 8)) || charCode > 57)
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
      autoClose: toastDelay,
    });
  }
}

export function nextIndexOfGroup(group, array) {
  const lastEntry = group.slice(-1)[0];
  const lastEntryIndex = array.indexOf(lastEntry);
  const position = lastEntryIndex + 1;
  return position
}



// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
export const debounce = (func, wait) => {
  let timeout;

  // This is the function that is returned and will be executed many times
  // We spread (...args) to capture any number of parameters we want to pass
  return function executedFunction(...args) {

    // The callback function to be executed after 
    // the debounce time has elapsed
    const later = () => {
      // null timeout to indicate the debounce ended
      timeout = null;
      
      // Execute the callback
      func(...args);
    };
    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the 
    // inside of the previous setTimeout  
    clearTimeout(timeout);
    
    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs Node)
    timeout = setTimeout(later, wait);
  };
};