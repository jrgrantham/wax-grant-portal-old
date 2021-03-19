import { combineReducers } from "redux";
// import thunk from "redux-thunk";
// import { devToolsEnhancer } from "redux-devtools-extension";

import { configureStore } from "@reduxjs/toolkit";

import workPackageReducer from "./workPackages";
import deadlinesReducer from "./deadlines";
import projectReducer from "./project";
import teamReducer from "./team";
import { userReducer } from "./user";

// const middleware = [thunk];
const rootReducer = combineReducers({
  workPackages: workPackageReducer,
  user: userReducer,
  deadlines: deadlinesReducer,
  project: projectReducer,
  team: teamReducer,
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

export default function store() {
  return configureStore({ reducer: rootReducer });
}
