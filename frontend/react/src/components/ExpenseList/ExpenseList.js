import React from 'react'
import './expense-list.css'
import Expense from '../Expense/Expense'

const ExpenseList = props => {
  const createItens = () => props.expenses.map(exp => createItem(exp))

  const createItem = exp => (
    <Expense
      delete={props.delete}
      key={props.expenses.indexOf(exp)}
      expense={exp}
    />
  )

  return (
    <div className='expense-list'>
      <div className='expense-list-content'>{createItens()}</div>
    </div>
  )
}

export default ExpenseList
