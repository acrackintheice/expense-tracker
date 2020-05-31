import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from '../context/UserContext'
import PropTypes from 'prop-types'

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <UserContext.Consumer>
      {({ googleInfo }) => (
        <Route
          {...rest}
          render={({ location }) => {
            if (googleInfo) {
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
      )}
    </UserContext.Consumer>
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.array
}

export default PrivateRoute
