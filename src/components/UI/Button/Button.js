import React from "react";
import classes from "./Button.module.css"

const Button = props => {

    const cls = [
        classes.Button,
        classes[props.type]
    ]

    return(
        <button
            disabled={props.disabled}
            onClick={props.onClick}
        className={cls.join(' ')}
        >
            {props.children}
        </button>
    )
}

export default Button