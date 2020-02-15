import './expense-item.css'
import React, { useState } from 'react'
import { Icon, Button, Input } from 'semantic-ui-react'
import TagPicker from './TagPicker/TagPicker'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'

const EditableExpense = props => {
  const blankExpense = {
    user: { name: '', email: '', googleId: '' },
    location: '',
    date: new Date(),
    tag: { name: 'question', icon: 'question' },
    value: 0
  }

  const [active, setActive] = useState(false)
  const [expense, setExpense] = useState(blankExpense)

  const handleTagChange = tag => {
    const newExpense = {
      user: expense.user,
      location: expense.location,
      date: expense.date,
      tag: tag,
      value: expense.value
    }
    setExpense(newExpense)
  }

  const handleCostChange = event => {
    const newExpense = {
      user: expense.user,
      location: expense.location,
      date: expense.date,
      tag: expense.tag,
      value: event.target.value
    }
    setExpense(newExpense)
  }

  const handleLocationChange = event => {
    const newExpense = {
      user: expense.user,
      location: event.target.value,
      date: expense.date,
      tag: expense.tag,
      value: expense.value
    }
    setExpense(newExpense)
  }

  const handleDateChange = dates => {
    const newExpense = {
      user: expense.user,
      location: expense.location,
      date: dates[0],
      tag: expense.tag,
      value: expense.value
    }
    setExpense(newExpense)
  }

  const handleEditDeactivation = () => setActive(false)

  const handleSave = () => props.onSave(expense).then(() => clearState())

  const clearState = () => {
    setActive(false)
    setExpense(blankExpense)
  }

  const handleEditActivation = () => setActive(true)

  const createEditableExpense = () => (
    <div className='expense-item new'>
      <div className='new-expense-content-left'>
        <TagPicker onTagChange={handleTagChange} />
        <div className='location-date-div'>
          <div className='location-input'>
            <Input
              placeholder='Insert a Location'
              transparent
              value={expense.location}
              onChange={handleLocationChange}
            />
          </div>
          <Flatpickr
            options={{
              enableTime: true,
              dateFormat: 'Y-m-d H:i',
              time_24hr: true
            }}
            className='flatpickr-datetime'
            value={expense.date}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <div className='new-expense-content-center'>
        <Input
          label='R$'
          placeholder='322'
          size='small'
          type='number'
          min='0'
          value={expense.value}
          onChange={handleCostChange}
        />
      </div>
      <div className='new-expense-content-right'>
        <Button secondary onClick={handleEditDeactivation}>
          <Icon className='button' name='cancel' /> Cancel
        </Button>
        <Button primary onClick={handleSave}>
          <Icon className='button' name='check' /> Done
        </Button>
      </div>
    </div>
  )

  const createEmptyExpense = () => (
    <div className='expense-item empty'>
      <Button primary onClick={handleEditActivation}>
        <Icon className='button' name='add' />
        New Expense
      </Button>
    </div>
  )

  return active ? createEditableExpense() : createEmptyExpense()
}

export default EditableExpense
