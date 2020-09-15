import React from 'react'

const SecurityContext = React.createContext(null)

export const UserProvider = SecurityContext.Provider
export const UserConsumer = SecurityContext.Consumer

export default SecurityContext
