import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, QUIZ_FINISHED, QUIZ_NEXT_QUESTION, QUIZ_RETRY, QUIZ_SET_STATE
} from "../actions/actionsTypes";

const initialState = {
    quizes: [],
    loading: true,
    error: null,

    finished: false,
    activeQuestion: 0,
    answerState: null,
    results: {},
    quiz: null,
}

export function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                loading: true,
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: true,
                error: action.error
            }
        case (FETCH_QUIZ_SUCCESS):
            return {
                ...state,
                loading: false,
                quiz: action.quiz

            }
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            }
        case QUIZ_FINISHED:
            return {
                ...state,
                finished: action.finished
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: action.activeQuestion,
                answerState: action.answerState,
            }
        case QUIZ_RETRY:
            return {
                ...state,
                finished: false,
                activeQuestion: 0,
                answerState: null,
                results: {},
            }
        default:
            return state
    }

}