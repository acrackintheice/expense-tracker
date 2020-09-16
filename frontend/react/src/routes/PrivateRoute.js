import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import ErrorContent from '../components/ErrorContent/ErrorContent'

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth0()

  return (
    <Route
      {...rest} >
        {isLoading && <div>Authenticating ...</div>}
        {isAuthenticated && children}
        {!isAuthenticated && !isLoading && <ErrorContent message='You must be authenticated to access content' />}
    </Route>
      
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.object
}

export default PrivateRoute
