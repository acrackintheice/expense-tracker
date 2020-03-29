import React from 'react'
import { Label, Icon } from 'semantic-ui-react'
import './filter.css'

const Filter = props => {
  return (
    <div className='filter'>
      <div className='header'>List Filters</div>
      <div className='content'>
        <div className='item'>
          <div className='header'>
            <Label>
              <Icon name='calendar alternate outline' /> By Date
            </Label>
          </div>
          <div className='content'>
            <Label>
              Today
            </Label>
            <Label>
              Last 7 Days
            </Label>
            <Label>
              Last 30 Days
            </Label>
          </div>
        </div>
        <div className='item'>
          <div className='header'>
            <Label>
              <Icon name='dollar' /> By Cost
            </Label>
          </div>
          <div className='content'>
            <Label>
              Most Expensive
            </Label>
            <Label>
              Least Expensive
            </Label>
          </div>
        </div>
        <div className='item'>
          <div className='header'>
            <Label>
              <Icon name='tag' /> By Tag
            </Label>
          </div>
          <div className='content'>
            <Label>
              <Icon name='home' /> Housing
            </Label>
            <Label>
              <Icon name='food' /> Food
            </Label>
            <Label>
              <Icon name='moon' /> Moon
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
