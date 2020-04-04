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
        <Button color='black' icon onClick={handleDelete}>
          <Icon name='trash alternate' />
        </Button>
      )}
    </FormattedMessage>
  )

  const createTag = () => (
    <div className='tag'>
      <Icon circular inverted size='large' name={props.expense.tag.icon} />
    </div>
  )

  return (
    <div className='item'>
      <div className='content'>
        <div className='left'>{createTag()}</div>
        <div className='center'>
          <div className='location date'>
            <ExpenseLocation location={props.expense.location} />
            <ExpenseDate date={props.expense.date} />
          </div>
          <ExpenseValue currency='R$' value={props.expense.value} />
        </div>
        <div className='right'>{createDeleteButton()}</div>
      </div>
    </div>
  )
}

export default Expense
