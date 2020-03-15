import React, { useState, useEffect } from 'react'
import { Icon, Dropdown } from 'semantic-ui-react'
import * as TagService from '../../../services/TagService'
import GoogleService from '../../../services/GoogleService'
import './tag-picker.css'

const TagPicker = props => {
  const createIcon = name => <Icon size='big' name={name} />

  const [trigger, setTrigger] = useState(createIcon(props.icon))
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (GoogleService.isGoogleInfoSet()) {
      if (!GoogleService.isGoogleInfoExpired()) {
        getTags(GoogleService.getToken().id_token)
      } else {
        console.log("Can't get tags, google token has expired")
      }
    } else {
      console.log("Can't get tags, no logged in user")
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
    setTrigger(createIcon(newTag.icon))
    props.onTagChange(newTag)
  }

  return (
    <Dropdown
      pointing
      className='tag picker'
      placeholder='Pick a Tag'
      trigger={trigger}
      options={options}
      onChange={handleDropdownChange}
    />
  )
}

export default TagPicker
