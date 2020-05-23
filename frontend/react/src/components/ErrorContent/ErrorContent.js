import React from 'react'
import './error-content.css'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

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

ErrorContent.propTypes = {
  message: PropTypes.string
}

export default ErrorContent
