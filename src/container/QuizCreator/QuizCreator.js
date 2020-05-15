import React from 'react'
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {createControl, validate, formValidate} from "../../form/formFramework";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {quizAddQuestion, quizCreate} from "../../store/actions/create";

function createOptionControl(number){
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Поле не должно быть пустым!',
        id: number,
    },{
        required: true,
    })
}
function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос:',
            errorMessage: 'Поле не должно быть пустым'
        },{
            required: true,
        }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

 class QuizCreator extends React.Component {

    state = {
        rightAnswerId: 1,
        formControls: createFormControls(),
        formValid: false
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const {question, option1, option2, option3, option4 } = this.state.formControls
        const questionItem = {
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            question: question.value,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]

        }
        console.log(questionItem)
        this.props.quizAddQuestion(questionItem)

        this.setState({
            rightAnswerId: 1,
            formControls: createFormControls(),
            formValid: false
        })
    }
    createQuizHandler = event => {
        event.preventDefault()
            this.setState({
                rightAnswerId: 1,
                formControls: createFormControls(),
                formValid: false
            })
        this.props.quizCreate()
    }
    submitHandler = event => {
        event.preventDefault()
    }
    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }


        control.value = value
        control.touched = true
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control
        const formValid = formValidate(formControls)

        this.setState({
            formControls,
            formValid,
        })

    }


    rendersControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxiliary key={index + controlName}>
                    <Input

                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        shouldValidate={!!control.validation}

                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }
    render() {
        const select = <Select
            label='Выбирите правильный Ответ'
            value={this.state.rightAnswerId}
            onChange={event => this.selectChangeHandler(event)}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={classes.QuizCreator}>

                <div>
                    <h1>Создание Теста</h1>
                    <form onSubmit={this.submitHandler} >
                        {this.rendersControls()}
                        {select}
                        <Button
                        type='primary'
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.formValid}>Добавиьть вопрос</Button>
                        <Button
                        type='success'
                        onClick={this.createQuizHandler}
                        disabled={this.props.quiz.length === 0}
                        >Создать тест</Button>

                    </form>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}
function mapDispatchToProps(dispatch) {
    return {
        quizAddQuestion: (item) => dispatch(quizAddQuestion(item)),
        quizCreate: () => dispatch(quizCreate())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)