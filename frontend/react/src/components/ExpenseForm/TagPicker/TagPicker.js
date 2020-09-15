import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import './tag-picker.css'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks'

const GET_TAGS = gql`
    subscription {
        tag {
            id
            name
            icon
        }
    }
`

const TagPicker = props => {
  const { loading, error, data } = useSubscription(GET_TAGS)

  const handleDropdownChange = (e, { value }) => {
    const newTag = { name: 'kappa', icon: 'kappa' }
    props.onTagChange(newTag)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <FormattedMessage
      id='placeholder.pick.tag'
      defaultMessage='What was it?'
      description='Tag input placeholder'
    >
      {placeholder => (
        <Dropdown
          selection
          className='tag picker'
          placeholder={placeholder}
          options={data.tag.map(t => ({
            key: t.name,
            text: t.name,
            value: t.id,
            icon: t.icon
          }))}
          onChange={handleDropdownChange}
        />
      )}
    </FormattedMessage>
  )
}

TagPicker.propTypes = {
  onTagChange: PropTypes.func
}

export default TagPicker
