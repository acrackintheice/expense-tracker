import React, { useState } from 'react'
import './tag-item.css'
import PropTypes from 'prop-types'
import { Icon, Button, Label } from 'semantic-ui-react'

const TagItem = ({ selectTag, deselectTag, tag }) => {
  const [selected, setSelected] = useState(false)

  const handleTagToggle = () => {
    if (selected) {
      deselectTag(tag.name)
    } else {
      selectTag(tag.name)
    }
    setSelected(!selected)
  }

  return (
    <div className={selected ? 'tag selected' : 'tag'}>
      <Button as='div' labelPosition='right' onClick={handleTagToggle}>
        <Button>
          <Icon name={tag.icon} />
        </Button>
        <Label basic pointing='left'>
          <div>
            {tag.name}
          </div>
        </Label>
      </Button>
    </div>
  )
}

TagItem.propTypes = {
  tag: PropTypes.object,
  selectTag: PropTypes.func,
  deselectTag: PropTypes.func
}

export default TagItem
