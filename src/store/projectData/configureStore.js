import { combineReducers } from "redux";
// import thunk from "redux-thunk";
// import { devToolsEnhancer } from "redux-devtools-extension";

import { configureStore } from "@reduxjs/toolkit";

import workPackageReducer from "./workPackages";
import delsAndMilsReducer from "./delsAndMils";
import { userReducer } from "./userReducer";

// const middleware = [thunk];
const rootReducer = combineReducers({
  workPackages: workPackageReducer,
  user: userReducer,
  delsAndMils: delsAndMilsReducer,
});

// export default function configureStore() {
//   const store = createStore(
//     rootReducer,
//     compose(
//       applyMiddleware(...middleware),
//       // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//       devToolsEnhancer({
//         trace: true,
//       })
//     )
//   );
//   return store
// };

export default function store () {
  return configureStore({ reducer: rootReducer });
}
