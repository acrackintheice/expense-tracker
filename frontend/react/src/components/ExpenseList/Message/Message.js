import React from 'react'
import { FormattedMessage } from 'react-intl'
import './message.css'

const Message = props => {
  return (
    <div className='item empty'>
      <div className='content'>
        <FormattedMessage
          id={props.message}
          defaultMessage=''
          description='Information message display'
        />
      </div>
    </div>
  )
}

export default Message
