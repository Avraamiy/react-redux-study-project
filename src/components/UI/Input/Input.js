import React from 'react'
import classes from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {

    const htmlFor = `${props.type}-${Math.random()}`
    const inputType = props.type || 'text'
    const cls = [classes.Input]

    if(isInvalid(props)){
        cls.push(classes.invalid)
    }

        return (
            <div className={cls.join(' ')}>
                <label htmlFor={htmlFor}>{props.label}</label>
                <input type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}/>
                {
                    isInvalid(props)
                        ?  <span>{props.errorMessage || 'неверно!'}</span>
                        : null
                }
            </div>
        )
}
export default Input