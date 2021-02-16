import { threeWorkPackages } from "../../data";
import * as actionType from "./actionTypes";
import { reorderArrayByIndex, setArrayIndexAsSortPosition } from "../../helpers";

export default function workPackageReducer(state = threeWorkPackages, action) {
  switch (action.type) {
    case actionType.FETCH_WORK_PACKAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionType.FETCH_WORK_PACKAGE_SUCCESS:
      return {
        ...state,
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
      const originalIndex = state.data
        .map(function (obj) {
          return obj.rowId;
        })
        .indexOf(rowId);
      const newIndex = originalIndex + action.payload.movement;
      const reordered = reorderArrayByIndex(
        state.data,
        originalIndex,
        newIndex
      );
      const reIndexed = setArrayIndexAsSortPosition(reordered);
      // send to server
      return {
        ...state,
        data: reIndexed,
      };
    case actionType.UPDATE_WORK_PACKAGE_ROW:
      // console.log(action.payload);
      console.log(state.data)
      return {
        ...state,
        data: state.data.map((entry) => {
          if (entry.rowId === action.payload.rowId) {
            return action.payload;
          }
          return entry;
        }),
      };

    case actionType.ROW_ADDED:
      const row = action.payload
      console.log(state.data)
      console.log(row);
      return {
        ...state,
        data: [...state.data, row],
      };

    case actionType.REMOVE_WORK_PACKAGE_ROW:
      return {
        ...state,
        data: state.data.filter((row) => row.rowId !== action.payload.rowId),
      };
    default:
      return state;
  }
}
