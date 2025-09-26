import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const persistedState = loadState();

export const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState({
    user: store.getState().user, // only persist what you need
  });
});
