import './header.css'
import React from 'react'
// import { FormattedMessage } from 'react-intl'
import { Button } from 'semantic-ui-react'

const Header = () => {
  const createHeader = () => (
    <div className='header item'>
      <Button positive labeled>
        Create
      </Button>
    </div>
  )

  return createHeader()
}

export default Header
