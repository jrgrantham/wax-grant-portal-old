import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {ganttReducer} from './ganttReducer'
import {userReducer} from './userReducer'

const middleware = [thunk];
const rootReducer = combineReducers({
  // add imported reducers here
  ganttEntries: ganttReducer,
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