import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import './sidebar.css'

export default class MenuExampleLabeledIconsVertical extends Component {
  state = { activeItem: 'list' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state

    return (
      <Menu icon='labeled' borderless vertical>
        <div>
          <Menu.Item
            name='list'
            active={activeItem === 'list'}
            onClick={this.handleItemClick}
          >
            <Icon name='list alternate outline' size='mini' />
            <span className='text'>List</span>
          </Menu.Item>

          <Menu.Item
            name='stats'
            active={activeItem === 'stats'}
            onClick={this.handleItemClick}
          >
            <Icon name='area graph' size='mini' />
            <span className='text'>Statistics</span>
          </Menu.Item>

          <Menu.Item
            name='code'
            active={activeItem === 'code'}
            onClick={this.handleItemClick}
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
            onClick={this.handleItemClick}
          >
            <Icon name='cogs' size='mini' />
            <span className='text'>Settings</span>
          </Menu.Item>
        </div>
      </Menu>
    )
  }
}
