import React from 'react'
import './expense-date.css'

const format = date => {
  const options = {
    hour12: false,
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

const ExpenseDate = props => (
  <div className='date'>
    <span className='date text'>
      {format(new Date(props.date)).replace(',', ' at')}
    </span>
  </div>
)

export default ExpenseDate
