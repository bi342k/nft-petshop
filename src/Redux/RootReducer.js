import { combineReducers } from "redux";
import { etherReducer } from "./Web3Connection";

const rootReducer = combineReducers({
    ethConnect: etherReducer,
});

export default rootReducer;