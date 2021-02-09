import { workPackages } from "../data";
import * as actionType from "./actionTypes";

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

export function ganttReducer(state = workPackages, action) {
  switch (action.type) {
    case actionType.FETCH_GANTT_REQUEST:
      return {
        ...workPackages,
        loading: true,
      };
    case actionType.FETCH_GANTT_SUCCESS:
      return {
        ...workPackages,
        loading: false,
        data: action.payload,
        error: "",
      };
    case actionType.FETCH_GANTT_FAILURE:
      return {
        data: [],
        loading: false,
        error: "failed to fetch gantt",
      };
    case actionType.MOVE_GANTT_ROWS:
      console.log("moving rows");
      return {
        ...workPackages,
        data: action.payload,
      };
    case actionType.REASSIGN_GANTT_BLOCKS:
      // console.log(action.payload);
      return {
        ...workPackages,
        data: workPackages.data.map((entry) => {
          if (entry.rowId === action.payload.id) {
            return action.payload;
          }
          return entry;
        }),
      };
    default:
      return state;
  }
}
