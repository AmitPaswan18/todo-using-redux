import { createStore } from "redux";
import todoReducer from "../reducers/todoReducers";
import { composeWithDevTools } from "@redux-devtools/extension";

let store = createStore(todoReducer, composeWithDevTools());

export default store;
