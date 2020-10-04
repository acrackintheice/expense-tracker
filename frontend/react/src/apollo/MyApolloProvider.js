import React from 'react'
import { ApolloClient, createHttpLink, concat, ApolloLink } from '@apollo/client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import { ApolloProvider } from '@apollo/react-hooks'
import { useAuth0 } from "@auth0/auth0-react"

const MyApolloProvider = ({ children }) => {

  const { getAccessTokenSilently } = useAuth0()

  const httpLink = createHttpLink({
    uri: 'https://hasura.acrackintheice.com/v1/graphql',
  })

  const authMiddleware = new ApolloLink(async (operation, forward) => {
    const token = await getAccessTokenSilently();
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  
    return forward(operation);
  })

  const wsLink = () => {
    const wsLink = new WebSocketLink({
      uri: 'wss://hasura.acrackintheice.com/v1/graphql',
      webSocketImpl: WebSocket,
      options: {
        lazy: true,
        connectionParams: async () => {
          const token = await getAccessTokenSilently();
          return {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        }
      }
    })
    return wsLink
  }

  const createLink = () => split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink(),
    concat(authMiddleware, httpLink)
  )

  const createApolloClient = () => {
    return new ApolloClient({
      link: createLink(),
      cache: new InMemoryCache()
    })
  }

  return (
    <ApolloProvider client={createApolloClient()}>
      {children}
    </ApolloProvider>
  )

}

export default MyApolloProvider
