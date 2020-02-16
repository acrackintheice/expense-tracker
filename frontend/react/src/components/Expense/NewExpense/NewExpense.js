import './new-expense.css'
import React, { useState } from 'react'
import { Button, Input } from 'semantic-ui-react'
import TagPicker from '../TagPicker/TagPicker'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'
import { FormattedMessage } from 'react-intl'
import { useSpring, animated } from 'react-spring'

const NewExpense = props => {
  const blankExpense = {
    user: { name: '', email: '', googleId: '' },
    location: '',
    date: new Date(),
    tag: { name: 'question', icon: 'question' },
    value: 0
  }

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

  const handleEditDeactivation = () => props.toggleEditActive()

  const handleCreate = async () => {
    try {
      await props.create(expense)
      clearState()
    } catch (errorPromise) {
      handleCreateErrors(await errorPromise)
    }
  }

  const clearState = () => {
    props.toggleEditActive()
    setExpense(blankExpense)
  }

  const handleCreateErrors = error => {
    if (error.location) {
      alert('Error at field Location: ' + error.location)
    } else {
      alert(error.message)
    }
  }

  const handleEditActivation = () => props.toggleEditActive()

  const createLocationInput = () => (
    <FormattedMessage
      id='label.input.location'
      defaultMessage='Insert a location'
      description='Location input label'
    >
      {placeholder => (
        <Input
          placeholder={placeholder}
          transparent
          value={expense.location}
          onChange={handleLocationChange}
        />
      )}
    </FormattedMessage>
  )

  const createDateInput = () => (
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
  )

  const createValueInput = () => (
    <Input
      label='R$'
      placeholder='322'
      size='small'
      type='number'
      min='0'
      value={expense.value}
      onChange={handleCostChange}
    />
  )

  const createSaveButton = () => (
    <FormattedMessage
      id='label.button.cancel'
      defaultMessage='Cancel'
      description='Cancel button label'
    >
      {label => (
        <Button secondary onClick={handleEditDeactivation}>
          {label}
        </Button>
      )}
    </FormattedMessage>
  )

  const createCancelButton = () => (
    <FormattedMessage
      id='label.button.save'
      defaultMessage='Save'
      description='Save button label'
    >
      {label => (
        <Button primary onClick={handleCreate}>
          {label}
        </Button>
      )}
    </FormattedMessage>
  )

  const createNewExpense = () => (
    <div className='expense-item new'>
      <div className='new-expense-content-left'>
        <TagPicker onTagChange={handleTagChange} />
        <div className='location-date-div'>
          <div className='location-input'>{createLocationInput()}</div>
          <div className='date-input'>{createDateInput()}</div>
        </div>
      </div>
      <div className='new-expense-content-center'>{createValueInput()}</div>
      <div className='new-expense-content-right'>
        {createSaveButton()}
        {createCancelButton()}
      </div>
    </div>
  )

  const createEmptyExpense = () => (
    <div className='expense-item new empty'>
      <FormattedMessage
        id='label.button.new.expense'
        defaultMessage='New Expense'
        description='New expense button label'
      >
        {label => (
          <Button secondary onClick={handleEditActivation}>
            {label}
          </Button>
        )}
      </FormattedMessage>
    </div>
  )

  return props.isEditActive ? createNewExpense() : createEmptyExpense()
}

export default NewExpense
