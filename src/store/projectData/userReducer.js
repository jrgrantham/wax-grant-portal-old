// import * as actionType from "./actionTypes";

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


export function userReducer(state = {names: 'james'}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
