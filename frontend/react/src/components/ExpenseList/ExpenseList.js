import React from 'react'
import './expense-list.css'
import Expense from '../../components/ExpenseList/Expense/Expense'
import Header from './Header/Header'
import Message from './Message/Message'
import gql from 'graphql-tag'
import { useSubscription, useMutation } from '@apollo/react-hooks'

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

const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: bigint) {
    delete_expense(where: {id: {_eq: $id}}) {
      returning {
        id
      }
    }
  }
`


const ExpenseList = () => {
  const { loading, error, data } = useSubscription(GET_EXPENSES)
  const [deleteMutation] = useMutation(DELETE_EXPENSE)

  const deleteExpense = expense => deleteMutation({ variables: { id: expense.id } }).catch((error) => alert(error))

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
          totalCost={data.expense.map(e => e.cost).reduce((a, b) => a + b, 0)}
        />
        <div className='content'>{createItens(data.expense)}</div>
      </div>
    </div>
  )
}

export default ExpenseList
