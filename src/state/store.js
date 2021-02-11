import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { workPackageReducer } from "./workPackageReducer";
import { userReducer } from "./userReducer";

const middleware = [thunk];
const rootReducer = combineReducers({
  // add imported reducers here
  workPackages: workPackageReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
