import './sidebar.css'
import React, { useState } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const Sidebar = () => {
  const history = useHistory()
  const [activeItem, setActiveItem] = useState('expenses')

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
    history.push(`/${name}`)
  }

  return (
    <Menu icon='labeled' className='x-sidebar responsive' borderless vertical>
      <div>
        <Menu.Item
          name='expenses'
          active={activeItem === 'expenses'}
          onClick={handleItemClick}
        >
          <Icon name='list alternate outline' size='mini' />
          <FormattedMessage
            id='label.expenses'
            defaultMessage='Expenses'
            description='Expenses label'
          >
            {label => <span className='text'>{label}</span>}
          </FormattedMessage>
        </Menu.Item>

        <Menu.Item
          name='tags'
          active={activeItem === 'tags'}
          onClick={handleItemClick}
        >
          <Icon name='tags' size='mini' />
          <FormattedMessage
            id='label.tags'
            defaultMessage='Tags'
            description='Tags label'
          >
            {label => <span className='text'>{label}</span>}
          </FormattedMessage>
        </Menu.Item>

        <Menu.Item
          name='stats'
          active={activeItem === 'stats'}
          onClick={handleItemClick}
        >
          <Icon name='area graph' size='mini' />
          <FormattedMessage
            id='label.statistics'
            defaultMessage='Statistics'
            description='Statistics label'
          >
            {label => <span className='text'>{label}</span>}
          </FormattedMessage>
        </Menu.Item>

        <Menu.Item
          name='code'
          active={activeItem === 'code'}
          onClick={handleItemClick}
        >
          <Icon name='code' size='mini' />
          <FormattedMessage
            id='label.code'
            defaultMessage='Code'
            description='Code label'
          >
            {label => <span className='text'>{label}</span>}
          </FormattedMessage>
        </Menu.Item>
      </div>

      <div>
        <Menu.Item
          className='settings'
          name='settings'
          active={activeItem === 'settings'}
          onClick={handleItemClick}
        >
          <Icon name='cogs' size='mini' />
          <FormattedMessage
            id='label.settings'
            defaultMessage='Settings'
            description='Settings label'
          >
            {label => <span className='text'>{label}</span>}
          </FormattedMessage>
        </Menu.Item>
      </div>
    </Menu>
  )
}

export default Sidebar
