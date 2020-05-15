import React from "react";
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActieveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, quizRetry} from "../../store/actions/quiz";

class Quiz extends React.Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.quizRetry()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader/>
                            :
                            this.props.finished ? <FinishedQuiz
                                    quiz={this.props.quiz}
                                    results={this.props.results}
                                    onRetry={this.props.quizRetry}
                                />
                                :
                                <ActiveQuiz
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    onAnswerClick={this.props.quizAnswerClick}
                                    quizLength={this.props.quiz.length}
                                    answerNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}
                                />
                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.quiz.loading,
        finished: state.quiz.finished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        results: state.quiz.results,
        quiz: state.quiz.quiz,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        quizRetry: () => dispatch(quizRetry()),
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)