import React from 'react'
import './expense-list.css'
import Expense from './Expense/Expense'
import EditableExpense from './Expense/EditableExpense'

const ExpenseList = props => {
  const createItens = () => props.expenses.map(exp => createItem(exp))

  const createItem = exp => (
    <Expense
      onDelete={props.onDelete}
      key={props.expenses.indexOf(exp)}
      expense={exp}
    />
  )

  const createHeader = () => <EditableExpense key={-1} onSave={props.onSave} />

  return (
    <div className='expense-list'>
      <div className='expense-list-content'>
        {createHeader()}
        {createItens()}
      </div>
    </div>
  )
}

export default ExpenseList
