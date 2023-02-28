import { combineReducers } from "redux";
import { taskReducer } from "./tasks/task.reducer";
import { userReducer } from "./user/user.reducer";


export const rootReducer = combineReducers({
    user: userReducer,
    tasks: taskReducer,
})