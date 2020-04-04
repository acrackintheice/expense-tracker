import './sidebar.css'
import React, { useState } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const Sidebar = () => {
  const history = useHistory()
  const [activeItem, setActiveItem] = useState('expenses')

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
    history.push(`/${name}`)
  }

  return (
    <Menu icon='labeled' className='x-sidebar' borderless vertical>
      <div>
        <Menu.Item
          name='expenses'
          active={activeItem === 'expenses'}
          onClick={handleItemClick}
        >
          <Icon name='list alternate outline' size='mini' />
          <span className='text'>List</span>
        </Menu.Item>

        <Menu.Item
          name='stats'
          active={activeItem === 'stats'}
          onClick={handleItemClick}
        >
          <Icon name='area graph' size='mini' />
          <span className='text'>Statistics</span>
        </Menu.Item>

        <Menu.Item
          name='code'
          active={activeItem === 'code'}
          onClick={handleItemClick}
        >
          <Icon name='code' size='mini' />
          <span className='text'>Code</span>
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
          <span className='text'>Settings</span>
        </Menu.Item>
      </div>
    </Menu>
  )
}

export default Sidebar
