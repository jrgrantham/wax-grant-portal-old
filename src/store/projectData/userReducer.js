
export function userReducer(state = {names: 'james'}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// export const fetchUser = () => {
//   return function (dispatch) {
//     dispatch(fetchWorkPackageRequest());
//     axios
//       .get("url")
//       .then((response) => {
//         // const gantt = response.data
//         // dispatch(fetchWorkPackageSuccess(gantt))
//       })
//       .catch((error) => {
//         //error.message
//       });
//   };
// };