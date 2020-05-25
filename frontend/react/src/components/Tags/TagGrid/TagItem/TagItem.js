import React from 'react'
import './tag-item.css'
import PropTypes from 'prop-types'
import { Icon, Button, Label } from 'semantic-ui-react'

const TagItem = ({ tag }) => {
  return (
    <div className='tag'>
      <Button as='div' labelPosition='right'>
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
  tag: PropTypes.object
}

export default TagItem
