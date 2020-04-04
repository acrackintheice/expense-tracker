import React from 'react'
import './expense-list.css'
import Expense from '../../components/ExpenseList/Expense/Expense'
// import Filter from '../ExpenseList/Filter/Filter'
import Header from '../ExpenseList/Header/Header'

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
    <div className='expenses'>
      {/* <Filter /> */}
      <div className='list'>
        <Header
          count={props.expenses.length}
          totalCost={props.expenses.map(e => e.value).reduce((a, b) => a + b, 0)}
        />
        <div className='content'>{createItens()}</div>
      </div>
    </div>
  )
}

export default ExpenseList
