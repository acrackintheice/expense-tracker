import './expense-form.css'
import React, { useState } from 'react'
import { Button, Input, Form, Header } from 'semantic-ui-react'
import TagPicker from './TagPicker/TagPicker'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'
import { FormattedMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'

const ExpenseForm = props => {
  const history = useHistory()
  const blankExpense = {
    location: '',
    date: new Date(),
    tag: {
      name: 'angle double down',
      icon: 'angle double down',
      _links: { self: { href: 'http://api.exptracker.com/tags/40' } }
    },
    value: ''
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

  const createLocationInput = () => (
    <FormattedMessage
      id='label.input.location'
      defaultMessage='Where did it happen?'
      description='Location input label'
    >
      {placeholder => (
        <Input
          iconPosition='left'
          icon='map marker alternate'
          placeholder={placeholder}
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

  const createCostInput = () => (
    <Input
      label='R$'
      type='number'
      placeholder='How much'
      size='small'
      value={expense.value}
      onChange={handleCostChange}
    />
  )

  const createExpense = async () => {
    try {
      await props.create(expense)
      clearState()
      history.push('/expenses')
    } catch (errorPromise) {
      handleCreateErrors(await errorPromise)
    }
  }

  const clearState = () => {
    setExpense(blankExpense)
  }

  const handleCreateErrors = error => {
    if (error.location) {
      alert('Error at field Location: ' + error.location)
    } else {
      alert(error.message)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    createExpense()
  }

  const handleBack = () => history.goBack()

  return (
    <div className='create expense'>
      <FormattedMessage
        id='label.header.new.expense'
        defaultMessage='New expense'
        description='Expense creation header'
      >
        {message => <Header as='h1'>{message}</Header>}
      </FormattedMessage>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Location</label>
          {createLocationInput()}
        </Form.Field>
        <Form.Field>
          <label>Tag</label>
          <TagPicker icon={expense.tag.icon} onTagChange={handleTagChange} />
        </Form.Field>
        <Form.Field>
          <label>Cost</label>
          {createCostInput()}
        </Form.Field>
        <Form.Field>
          <label>Date</label>
          {createDateInput()}
        </Form.Field>
        <div className='buttons'>
          <Button type='button' secondary onClick={handleBack}>
            Back
          </Button>
          <Button primary type='submit'>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ExpenseForm
