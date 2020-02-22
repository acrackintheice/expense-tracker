import React from 'react'
import './expense-cost.css'

const ExpenseValue = props => (
  <div className='cost text'>{props.currency + props.value}</div>
)

export default ExpenseValue
