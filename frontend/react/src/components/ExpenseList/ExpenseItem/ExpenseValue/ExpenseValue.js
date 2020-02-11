import React from 'react';
import './expense-value.css'

const ExpenseValue = props => (
    <div className="expense-value">
        {props.currency + props.value}
    </div>
)

export default (ExpenseValue);