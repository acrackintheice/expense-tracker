import React, { useState, useEffect, useContext } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as TagService from '../../../services/TagService'
import GoogleService from '../../../services/GoogleService'
import UserContext from '../../../context/UserContext'
import { FormattedMessage } from 'react-intl'
import './tag-picker.css'
import PropTypes from 'prop-types'

const TagPicker = props => {
  const user = useContext(UserContext)
  const [options, setOptions] = useState([])

  useEffect(() => {
    const getTags = accessToken => {
      TagService.getAll(accessToken)
        .then(result => result.json())
        .then(({ _embedded }) => setOptions(createOptions(_embedded.tags)))
        .catch(error => alert(error))
    }

    if (user && !GoogleService.isUserExpired(user)) {
      getTags(GoogleService.getToken().id_token)
    } else {
      console.log("Can't get tags, google token has expired")
    }
  }, [user])

  const createOptions = (tags) => {
    return tags.map(t => ({
      key: t.name,
      text: t.name,
      value: tags.indexOf(t),
      links: t._links,
      icon: t.icon
    }))
  }

  const handleDropdownChange = (e, { value }) => {
    const option = options[value]
    const newTag = { name: option.key, icon: option.icon, _links: option.links }
    props.onTagChange(newTag)
  }

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
          options={options}
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
