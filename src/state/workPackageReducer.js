import { workPackages } from "../data";
import * as actionType from "./actionTypes";
import { reorderArrayByIndex, setArrayIndexAsSortPosition } from "../helpers";

// const initialGanttState = [
//   {
//     id: uuidv4(),
//     section: "Project Management",
//     description: "example description",
//     resources: "JG",
//     days: 10,
//     schedule: [
//       {
//         status: false,
//         start: false,
//         end: false,
//         value: 0,
//         id: uuidv4(),
//       },
//     ],
//   },
// ];

// case actionTypes.UPDATE_CONSEQUENCE:
//   return {
//     entries: state.entries.map((entry) => {
//       if (entry.id === action.payload.id) {
//         return { ...entry, consequence: action.payload.value };
//       }
//       return entry;
//     }),
//   };

export function workPackageReducer(state = workPackages, action) {
  switch (action.type) {
    case actionType.FETCH_WORK_PACKAGE_REQUEST:
      return {
        ...workPackages,
        loading: true,
      };
    case actionType.FETCH_WORK_PACKAGE_SUCCESS:
      return {
        ...workPackages,
        loading: false,
        data: action.payload,
        error: "",
      };
    case actionType.FETCH_WORK_PACKAGE_FAILURE:
      return {
        data: [],
        loading: false,
        error: "failed to fetch gantt",
      };
    case actionType.REORDER_WORK_PACKAGE_ROWS:
      const rowId = action.payload.row.rowId;
      const originalIndex = workPackages.data
        .map(function (obj) {
          return obj.rowId;
        })
        .indexOf(rowId);
      const newIndex = originalIndex + action.payload.movement;
      const reordered = reorderArrayByIndex(workPackages.data, originalIndex, newIndex)
      console.log(reordered);
      const reIndexed = setArrayIndexAsSortPosition(reordered)
      // send to server
      return {
        ...workPackages,
        data: reIndexed,
      };
    case actionType.UPDATE_WORK_PACKAGE_ROW:
      // console.log(action.payload);
      return {
        ...workPackages,
        data: workPackages.data.map((entry) => {
          if (entry.rowId === action.payload.rowId) {
            return action.payload;
          }
          return entry;
        }),
      };
    default:
      return state;
  }
}
