// export const getRisks = () => async (dispatch) => {
//   console.log("fetching risks");
//   try {
//     const res = await axiosWithAuth().get(riskApi);
//     dispatch({
//       type: actionTypes.GET_RISKS,
//       payload: res.data,
//     });
//   } catch (e) {
//     dispatch({
//       type: actionTypes.USERS_ERROR,
//       payload: console.log(e),
//     });
//   }
// };

// export function deleteRiskOld(type, id) {
//   return {
//     type: actionTypes.DELETE_RISK,
//     payload: {
//       type,
//       id,
//     },
//   };
// }

import store from './store'

import * as actionType from './actionTypes'

function reorderItems(array, result) {
  const items = Array.from(array);
  const [item] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, item);
  return items;
}

export function reorderGanttRow(result) {
  // console.log(store.getState().ganttEntries);
  const reorderedGantt = reorderItems(store.getState().ganttEntries.data, result);
  // console.log(reorderedGantt);
  return {
    type: actionType.MOVE_GANTT_ROWS,
    payload: reorderedGantt,
  }
}