import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, QUIZ_FINISHED, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./actionsTypes";

export function fetchQuizes(){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест  #${index + 1}`,
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        }
        catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes,
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e,
    }
}

export function fetchQuizById(id) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {

            const response = await axios.get(`quizes/${id}.json`)
            const quiz = response.data
           dispatch(fetchQuizSuccess(quiz))
        }
        catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }

}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz,
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const results = state.results
        const question = state.quiz[state.activeQuestion]


        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results))
            // this.setState({
            //     answerState: {[answerId]: 'success'},
            //     results
            // })

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishedQuiz())
                    // this.setState({finished: true})
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                    // this.setState({
                    //     activeQuestion: state.activeQuestion + 1,
                    //     answerState: null
                    // })
                }

                window.clearTimeout(timeout)
            }, 500)


        } else {
            results[question.id] = 'error'
            // this.setState({
            //     answerState: {[answerId]: 'error'},
            //     results
            // })
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }
    }
}

 function isQuizFinished(state) {
     return state.activeQuestion + 1 === state.quiz.length
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function finishedQuiz() {
    return {
        type: QUIZ_FINISHED,
        finished: true
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion: number,
        answerState: null,
    }
}

export function quizRetry() {
    return {
        type: QUIZ_RETRY,
    }
}