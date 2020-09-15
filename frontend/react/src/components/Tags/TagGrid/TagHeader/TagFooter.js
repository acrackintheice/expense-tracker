import './tag-footer.css'
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

const TagFooter = ({ deleteSelectedTags }) => {
  const createDeleteButton = () => (
    <FormattedMessage
      id='label.button.delete'
      defaultMessage='Delete'
      description='Delete button label'
    >
      {label => (
        <Button color='red' onClick={() => deleteSelectedTags()}>
          <Icon name='trash alternate' />
          {label}
        </Button>
      )}
    </FormattedMessage>
  )
  return (
    <div className='footer'>
      <div className='actions'>
        <div className='right' />
        <div className='left'>
          {createDeleteButton()}
        </div>
      </div>
    </div>
  )
}

TagFooter.propTypes = {
  deleteSelectedTags: PropTypes.func
}

export default TagFooter
