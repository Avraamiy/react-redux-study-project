import React from "react";
import classes from './MenuToggle.module.css'

const MenuToggle = props => {
    const cls = [
        classes.MenuToggle,
        'fa'
    ]
    if(props.isOpen){
        cls.push(classes.open)
        cls.push('fa-times')
    }
    else {
        cls.push('fa-bars')
    }
    return (
        <i onClick={props.onToggle} className={cls.join(' ')}/>
    )
}

export default MenuToggle