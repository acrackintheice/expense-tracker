import React from 'react'
import './error-content.css'
import { FormattedMessage } from 'react-intl'

const ErrorContent = props => {
  return (
    <div className='center login-message-parent'>
      <div className='login-message-div'>
        <FormattedMessage
          id={props.message}
          defaultMessage=''
          description='Information message display'
        />
      </div>
    </div>
  )
}

export default ErrorContent
