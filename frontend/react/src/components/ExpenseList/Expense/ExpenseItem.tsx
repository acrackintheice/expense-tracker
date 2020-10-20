import './expense.css'
import React from 'react'
import ExpenseValue from './ExpenseValue/ExpenseValue'
import ExpenseDate from './ExpenseDate/ExpenseDate'
import ExpenseLocation from './ExpenseLocation/ExpenseLocation'
import { Icon, Button } from 'semantic-ui-react'
import 'flatpickr/dist/themes/airbnb.css'
import { FormattedMessage } from 'react-intl'
import { Expense } from '../../../model/model'

interface ExpenseItemProps {
  expense: Expense,
  deleteExpense: (expense: Expense) => string,
  key: number
}

const ExpenseItem = ({expense, deleteExpense, key} : ExpenseItemProps) => {
  const handleDelete = () => {
    deleteExpense(expense)
  }

  const createDeleteButton = () => (
    <FormattedMessage
      id='label.button.delete'
      defaultMessage='Delete'
      description='Delete button label'
    >
      {() => (
        <Button color='black' icon onClick={handleDelete}>
          <Icon name='trash alternate' />
        </Button>
      )}
    </FormattedMessage>
  )

  const createTag = () => (
    <div className='tag'>
      <Icon circular inverted size='large' name={expense.tag.icon} />
    </div>
  )
  
  return (
    <div className='item'>
      <div className='content'>
        <div className='left'>{createTag()}</div>
        <div className='center'>
          <div className='location date'>
            <ExpenseLocation location={expense.location} />
            <ExpenseDate date={expense.date} />
          </div>
          <ExpenseValue currency='R$ ' value={expense.cost} />
        </div>
        <div className='right'>{createDeleteButton()}</div>
      </div>
    </div>
  )
}

export default ExpenseItem
