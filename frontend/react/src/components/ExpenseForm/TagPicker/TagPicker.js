import React, { useState, useEffect, useContext } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as TagService from '../../../services/TagService'
import GoogleService from '../../../services/GoogleService'
import UserContext from '../../../context/UserContext'
import './tag-picker.css'

const TagPicker = props => {
  const user = useContext(UserContext)
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (user && !GoogleService.isUserExpired(user)) {
      getTags(GoogleService.getToken().id_token)
    } else {
      console.log("Can't get tags, google token has expired")
    }
  }, [])

  const getTags = accessToken => {
    TagService.getAll(accessToken)
      .then(result => result.json())
      .then(result => {
        setOptions(
          result._embedded.tags.map(t => ({
            key: t.name,
            text: t.name,
            value: result._embedded.tags.indexOf(t),
            links: t._links,
            icon: t.icon
          }))
        )
      })
      .catch(error => alert(error))
  }

  const handleDropdownChange = (e, { value }) => {
    const option = options[value]
    const newTag = { name: option.key, icon: option.icon, _links: option.links }
    props.onTagChange(newTag)
  }

  return (
    <Dropdown
      selection
      className='tag picker'
      placeholder='Pick a Tag'
      options={options}
      onChange={handleDropdownChange}
    />
  )
}

export default TagPicker
