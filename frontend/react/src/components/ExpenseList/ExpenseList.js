import React, { useState, useEffect, useContext } from 'react'
import './expense-list.css'
import Expense from '../../components/ExpenseList/Expense/Expense'
import Header from './Header/Header'
import Message from './Message/Message'
import * as ExpenseService from '../../services/ExpenseService'
import UserContext from '../../context/UserContext'

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([])
  const user = useContext(UserContext)

  useEffect(() => {
    ExpenseService.findAllByGoogleId(user.googleInfo.profile.googleId, user.googleInfo.token.id_token)
      .then(exps => setExpenses(ExpenseService.sortExpenses(exps)))
  }, [expenses])

  const deleteExpense = expense => {
    if (user.googleInfo) {
      ExpenseService.remove(user.googleInfo.token.id_token, expense)
        .then(() => alert('Expense deleted sucessfully'))
        .catch(error => alert(error))
    } else {
      alert('error.token.expired')
    }
  }

  const createItens = () => {
    if (expenses && expenses.length) {
      return expenses.map(exp => createItem(exp))
    } else {
      return <Message message='message.empty.list' />
    }
  }

  const createItem = exp => (
    <Expense
      delete={deleteExpense}
      key={expenses.indexOf(exp)}
      expense={exp}
    />
  )

  return (
    <div className='expenses'>
      <div className='list'>
        <Header
          count={expenses.length}
          totalCost={expenses.map(e => e.value).reduce((a, b) => a + b, 0)}
        />
        <div className='content'>{createItens()}</div>
      </div>
    </div>
  )
}

export default ExpenseList
