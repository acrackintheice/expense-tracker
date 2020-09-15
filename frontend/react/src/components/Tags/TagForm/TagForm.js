import React, { useState } from 'react'
import './tag-form.css'
import { FormattedMessage } from 'react-intl'
import { Button, Form, Input } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'

const INSERT_TAG = gql`
    mutation InsertTag($name: String!, $icon: String!) {
        insert_tag_one(object: {name: $name, icon: $icon}) {
            name
            icon
            id
        }
    }
`

const TagForm = () => {
  const history = useHistory()
  const [inserTag] = useMutation(INSERT_TAG)
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')

  const clearState = () => {
    setName('')
    setIcon('')
  }

  const handleSubmit = event => {
    event.preventDefault()
    inserTag({ variables: { name: name, icon: icon } }).then(() => {
      clearState()
    }).catch(error => {
      alert(error.message)
    })
  }

  const createNameLabel = () =>
    <FormattedMessage
      id='label.name'
      defaultMessage='Name label'
      description='Tag form name label'
    >
      {message => <div className='label'>{message}</div>}
    </FormattedMessage>

  const createNameInput = () =>
    <FormattedMessage
      id='label.input.name'
      defaultMessage='What should be the tag name?'
      description='Tag name input placeholder'
    >
      {placeholder => (
        <Input
          placeholder={placeholder}
          size='small'
          value={name}
          onChange={event => setName(event.target.value)}
        />
      )}
    </FormattedMessage>

  const createIconLabel = () =>
    <FormattedMessage
      id='label.icon'
      defaultMessage='Icon'
      description='Tag form icon label'
    >
      {message => <div className='label'>{message}</div>}
    </FormattedMessage>

  const createIconInput = () =>
    <FormattedMessage
      id='label.input.name'
      defaultMessage='What should the tag icon be?'
      description='Tag icon input placeholder'
    >
      {placeholder => (
        <Input
          placeholder={placeholder}
          size='small'
          value={icon}
          onChange={event => setIcon(event.target.value)}
        />
      )}
    </FormattedMessage>

  return (
    <div className='create'>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          {createNameLabel()}
          {createNameInput()}
        </Form.Field>
        <Form.Field>
          {createIconLabel()}
          {createIconInput()}
        </Form.Field>
        <div className='buttons'>
          <Button type='button' secondary onClick={() => history.goBack()}>
            <FormattedMessage
              id='label.back'
              defaultMessage='Back'
              description='Back button label'
            >
              {message => message}
            </FormattedMessage>
          </Button>
          <Button primary type='submit'>
            <FormattedMessage
              id='label.submit'
              defaultMessage='Submit'
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

export default TagForm
