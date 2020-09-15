import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth0()

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuthenticated) {
          return children
        } else {
          return (
            <Redirect
              to={{
                pathname: '/error',
                state: { from: location }
              }}
            />
          )
        }
      }}
    />
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.object
}

export default PrivateRoute
