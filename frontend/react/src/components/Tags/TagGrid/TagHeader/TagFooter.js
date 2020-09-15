import './tag-header.css'
import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import TagItem from '../TagItem/TagItem'

const DELETE_TAG = gql`
    mutation MyMutation($names: [String!]) {
        delete_tag(where: {name: {_in: $names}}) {
            affected_rows
        }
    }
`

const TagHeader = ({ selected }) => {
  const [deleteTag] = useMutation(DELETE_TAG)

  const handleDeleteClick = () => deleteTag({ variables: { names: selected } })

  const createDeleteButton = () => (
    <FormattedMessage
      id='label.button.delete'
      defaultMessage='Delete'
      description='Delete button label'
    >
      {label => (
        <Button size='tiny' color='red' onClick={handleDeleteClick}>
          <Icon name='trash alternate' />
          {label}
        </Button>
      )}
    </FormattedMessage>
  )
  return (
    <div className='header'>
      <div className='actions'>
        <div className='right' />
        <div className='left'>
          {createDeleteButton()}
        </div>
      </div>
    </div>
  )
}

TagHeader.propTypes = {
  selected: PropTypes.array
}

export default TagHeader
