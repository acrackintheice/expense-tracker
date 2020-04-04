import './header.css'
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const history = useHistory()

  const createFilterButton = () => (
    <FormattedMessage
      id='label.button.filters'
      defaultMessage='Filters'
      description='Filters button label'
    >
      {label => (
        <Button secondary>
          <Icon name='tasks' />
          {label}
        </Button>
      )}
    </FormattedMessage>
  )

  const createActionButton2 = () => (
    <FormattedMessage
      id='label.button.action'
      defaultMessage='Action'
      description='Action button label'
    >
      {label => (
        <Button secondary>
          <Icon name='code branch' />
          {label}
        </Button>
      )}
    </FormattedMessage>
  )

  const createActionButton3 = () => (
    <FormattedMessage
      id='label.button.action'
      defaultMessage='Action'
      description='Action button label'
    >
      {label => (
        <Button secondary>
          <Icon name='chess' />
          {label}
        </Button>
      )}
    </FormattedMessage>
  )

  const createActionButton4 = () => (
    <FormattedMessage
      id='label.button.action'
      defaultMessage='Action'
      description='Action button label'
    >
      {label => (
        <Button secondary>
          <Icon name='location arrow' />
          {label}
        </Button>
      )}
    </FormattedMessage>
  )
  const createNewButton = () => (
    <FormattedMessage
      id='label.button.new'
      defaultMessage='New'
      description='New button label'
    >
      {label => (
        <Button size='tiny' color='green' onClick={handleNewClick}>
          <Icon name='add' />
          {label}
        </Button>
      )}
    </FormattedMessage>
  )

  const handleNewClick = () => history.push('expenses/new')

  const createHeader = () => (
    <div className='header'>
      <div className='actions'>
        <div className='left'>
          {createNewButton()}
          {createFilterButton()}
        </div>
        <div className='right'>
          {createActionButton2()}
          {createActionButton3()}
          {createActionButton4()}
        </div>
      </div>
    </div>
  )

  return createHeader()
}

export default Header
