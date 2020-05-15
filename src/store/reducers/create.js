import {QUIZ_ADD_QUESTION, RESET_QUIZ_CREATION} from "../actions/actionsTypes";

const initialState = {
    quiz: []
}

export function createQuizReducer(state = initialState, action) {
    switch (action.type) {
        case QUIZ_ADD_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.questionItem]
            }
        case RESET_QUIZ_CREATION:
            return {
                ...state,
                quiz: [],
            }
        default: {
            return state
        }
    }
}