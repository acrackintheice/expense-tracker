import React from 'react'

const SecurityContext = React.createContext(null)

export const UserProvider = SecurityContext.Provider
export const UserConsumer = SecurityContext.Consumer

// In memory variable holding the token, implementation based on:
// https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#login

export default SecurityContext
