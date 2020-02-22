import './new-expense.css'
import React, { useState } from 'react'
import { Button, Input } from 'semantic-ui-react'
import TagPicker from '../TagPicker/TagPicker'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'
import { FormattedMessage } from 'react-intl'

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

  const createCancelButton = () => (
    <Button secondary icon='arrow left' onClick={handleEditDeactivation} />
  )

  const createSaveButton = () => (
    <Button primary icon='check' onClick={handleCreate} />
  )

  const createNewExpense = () => (
    <div className='expense-item new'>
      <div className='content'>
        <div className='left'>
          <TagPicker onTagChange={handleTagChange} />
        </div>
        <div className='center'>
          <div className='location-input'>{createLocationInput()}</div>
          <div className='date'>
            <div className='date-input'>{createDateInput()}</div>
          </div>
          <div className='cost'>{createValueInput()}</div>
        </div>
      </div>
      <div className='buttons'>
        {createCancelButton()}
        {createSaveButton()}
      </div>
    </div>
  )

  const createEmptyExpense = () => (
    <div className='expense-item empty'>
      <div>
        <FormattedMessage
          id='label.button.new.expense'
          defaultMessage='New Expense'
          description='New expense button label'
        />
      </div>
      <div>
        <Button icon='arrow right' primary onClick={handleEditActivation} />
      </div>
    </div>
  )

  return props.isEditActive ? createNewExpense() : createEmptyExpense()
}

export default NewExpense
