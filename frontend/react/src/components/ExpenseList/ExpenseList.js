import React, { useContext } from 'react'
import './expense-list.css'
import Expense from '../../components/ExpenseList/Expense/Expense'
import Header from './Header/Header'
import Message from './Message/Message'
import * as ExpenseService from '../../services/ExpenseService'
import UserContext from '../../context/UserContext'
import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks'

const GET_EXPENSES = gql`
    subscription {
        expense(order_by: {date: desc}) {
            id
            cost
            date
            location
            tag {
                name
                icon
                id
            }
        }
    }
`
const ExpenseList = () => {
  const { loading, error, data } = useSubscription(GET_EXPENSES)
  const user = useContext(UserContext)

  const deleteExpense = expense => {
    if (user.googleInfo) {
      ExpenseService.remove(user.googleInfo.token.id_token, expense)
        .then(() => alert('Expense deleted sucessfully'))
        .catch(error => alert(error))
    } else {
      alert('error.token.expired')
    }
  }

  const createItens = (expenses) => {
    if (expenses && expenses.length) {
      return expenses.map(expense => createItem(expense, expenses.indexOf(expense)))
    } else {
      return <Message message='message.empty.list' />
    }
  }

  const createItem = (expense, key) => (
    <Expense
      delete={deleteExpense}
      key={key}
      expense={expense}
    />
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div className='expenses'>
      <div className='list'>
        <Header
          count={data.expense.length}
          totalCost={data.expense.map(e => e.value).reduce((a, b) => a + b, 0)}
        />
        <div className='content'>{createItens(data.expense)}</div>
      </div>
    </div>
  )
}

export default ExpenseList
