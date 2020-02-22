import React, { useState, useEffect } from 'react'
import { Icon, Dropdown } from 'semantic-ui-react'
import TagService from '../../../services/TagService'
import GoogleService from '../../../services/GoogleService'
import './tag-picker.css'

const TagPicker = props => {
  const createIcon = name => (
    <Icon
      size='big'
      className='expense-list-item-icon'
      name={name}
    />
  )

  const [trigger, setTrigger] = useState(createIcon('question'))

  const [options, setOptions] = useState([])

  useEffect(() => {
    if (GoogleService.isGoogleInfoSet()) {
      if (!GoogleService.isGoogleInfoExpired()) {
        getTags(GoogleService.getToken().id_token)
      } else {
        console.log("Can't get tags, current google token has already expired")
      }
    } else {
      console.log("Can't get tags, no logged in user")
    }
  }, [])

  const getTags = accessToken => {
    TagService.getAll(accessToken)
      .then(result => result.json())
      .then(tags => {
        setOptions(
          tags.map(t => ({
            key: t.name,
            text: t.name,
            value: tags.indexOf(t),
            icon: t.icon
          }))
        )
      })
      .catch(error => alert(error))
  }

  const handleDropdownChange = (e, { value }) => {
    const option = options[value]
    const newTag = { name: option.key, icon: option.icon }
    setTrigger(createIcon(newTag.icon))
    props.onTagChange(newTag)
  }

  return (
    <Dropdown
      pointing
      className='tag-picker-dropdown'
      placeholder='Pick a Tag'
      trigger={trigger}
      options={options}
      onChange={handleDropdownChange}
    />
  )
}

export default TagPicker
