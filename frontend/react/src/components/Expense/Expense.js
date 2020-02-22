import './expense.css'
import React from 'react'
import ExpenseValue from './ExpenseValue/ExpenseValue'
import ExpenseDate from './ExpenseDate/ExpenseDate'
import ExpenseLocation from './ExpenseLocation/ExpenseLocation'
import { Icon, Button } from 'semantic-ui-react'
import 'flatpickr/dist/themes/airbnb.css'
import { FormattedMessage } from 'react-intl'

const Expense = props => {
  const handleDelete = () => {
    props.delete(props.expense)
  }

  const createDeleteButton = () => (
    <FormattedMessage
      id='label.button.delete'
      defaultMessage='Delete'
      description='Delete button label'
    >
      {label => (
        <Button color='red' onClick={handleDelete}>
          {label}
        </Button>
      )}
    </FormattedMessage>
  )

  const createTag = () => (
    <div className='tag'>
      <Icon bordered inverted size='large' name={props.expense.tag.icon} />
    </div>
  )

  return (
    <div className='expense item'>
      <div className='left'>
        {createTag()}
        <div>
          <ExpenseLocation location={props.expense.location} />
          <ExpenseDate date={props.expense.date} />
        </div>
      </div>
      <div className='center'>
        <ExpenseValue currency='R$' value={props.expense.value} />
      </div>
      <div className='right'>{createDeleteButton()}</div>
    </div>
  )
}

export default Expense
