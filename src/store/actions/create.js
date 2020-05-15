import {QUIZ_ADD_QUESTION, RESET_QUIZ_CREATION} from "./actionsTypes"
import axios from '../../axios/axios-quiz'

export function quizCreate() {
    return async (dispatch, getState) => {
        await axios.post('/quizes.json', getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}

export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION,
    }
}
export function quizAddQuestion(questionItem) {
    return {
        type: QUIZ_ADD_QUESTION,
        questionItem,
    }
}