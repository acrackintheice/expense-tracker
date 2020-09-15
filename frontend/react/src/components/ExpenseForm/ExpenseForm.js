import './expense-form.css'
import React, { useState } from 'react'
import { Button, Input, Form, Header } from 'semantic-ui-react'
import TagPicker from './TagPicker/TagPicker'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'
import { FormattedMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const INSERT_EXPENSE = gql`
  mutation InsertExpense($cost: numeric, $date: date, $location: String!, $tag_id: bigint, $user_id: bigint) {
    insert_expense(objects: {cost: $cost, date: $date, location: $location, tag_id: $tag_id, user_id:$user_id}) {
      returning {
        id
      }
    }
  }
`

const ExpenseForm = () => {
  const history = useHistory()
  const [insertExpense] = useMutation(INSERT_EXPENSE)

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
      id='placeholder.insert.location'
      defaultMessage='Where was it?'
      description='Location input placeholder'
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
    <FormattedMessage
      id='label.input.cost'
      defaultMessage='How much did it cost?'
      description='Cost input placeholder'
    >
      {placeholder => (
        <Input
          label='R$'
          type='number'
          placeholder={placeholder}
          size='small'
          value={expense.value}
          onChange={handleCostChange}
        />
      )}
    </FormattedMessage>
  )

  const clearState = () => {
    setExpense(blankExpense)
  }

  const handleSubmit = event => {
    event.preventDefault()
    insertExpense({
      variables: {
        cost: expense.value,
        date: expense.date,
        location: expense.location,
        tag_id: 1,
        user_id: 1
      }
    }).then(() => {
      clearState()
    }).catch(error => {
      alert(error.message)
    })
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
          <FormattedMessage
            id='label.location'
            defaultMessage='Location label'
            description='Expense form location label'
          >
            {message => <div className='label'>{message}</div>}
          </FormattedMessage>
          {createLocationInput()}
        </Form.Field>
        <Form.Field>
          <FormattedMessage
            id='label.tag'
            defaultMessage='Tag'
            description='Expense form Tag label'
          >
            {message => <div className='label'>{message}</div>}
          </FormattedMessage>
          <TagPicker icon={expense.tag.icon} onTagChange={handleTagChange} />
        </Form.Field>
        <Form.Field>
          <FormattedMessage
            id='label.cost'
            defaultMessage='Cost'
            description='Expense form cost label'
          >
            {message => <div className='label'>{message}</div>}
          </FormattedMessage>
          {createCostInput()}
        </Form.Field>
        <Form.Field>
          <FormattedMessage
            id='label.date'
            defaultMessage='Date'
            description='Expense form date label'
          >
            {message => <div className='label'>{message}</div>}
          </FormattedMessage>
          {createDateInput()}
        </Form.Field>
        <div className='buttons'>
          <Button type='button' secondary onClick={handleBack}>
            <FormattedMessage
              id='label.back'
              defaultMessage='Voltar'
              description='Back button label'
            >
              {message => message}
            </FormattedMessage>
          </Button>
          <Button primary type='submit'>
            <FormattedMessage
              id='label.submit'
              defaultMessage='Enviar'
              description='Submit button label'
            >
              {message => message}
            </FormattedMessage>
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ExpenseForm
