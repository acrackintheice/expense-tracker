import './header.css'
import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const history = useHistory()
  const [filtersActive, setFiltersActive] = useState(false)
  const [sortActive, setSortActive] = useState(false)

  const handleFilterToggle = () => setFiltersActive(!filtersActive)

  const handleSortToggle = () => setSortActive(!sortActive)

  const createFilterButton = () => (
    <FormattedMessage
      id='label.button.filters'
      defaultMessage='Filters'
      description='Filters button label'
    >
      {label => (
        <Button
          toggle
          active={filtersActive}
          onClick={handleFilterToggle}
          secondary
        >
          <Icon name='tasks' />
          {label}
        </Button>
      )}
    </FormattedMessage>
  )

  const crateSortButton = () => (
    <FormattedMessage
      id='label.button.sort'
      defaultMessage='Sort'
      description='Sort button label'
    >
      {label => (
        <Button toggle active={sortActive} onClick={handleSortToggle} secondary>
          <Icon name='sort' />
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
        <div className='right'>
          {createFilterButton()}
          {crateSortButton()}
        </div>
        <div className='left'>{createNewButton()}</div>
      </div>
    </div>
  )

  return createHeader()
}

export default Header
