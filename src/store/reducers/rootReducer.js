import {combineReducers} from "redux";
import {quizReducer} from "../reducers/quiz";
import {createQuizReducer} from "./create";
import {authReducer} from "./auth";

export default combineReducers({
    quiz: quizReducer,
    create: createQuizReducer,
    auth: authReducer,
})