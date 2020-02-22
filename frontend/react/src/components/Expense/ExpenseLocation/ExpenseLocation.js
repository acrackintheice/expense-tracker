import React from 'react'
import './expense-location.css'

const ExpenseLocation = props => (
  <div className='location'>
    <span className='location text'>{props.location}</span>
  </div>
)

export default ExpenseLocation
