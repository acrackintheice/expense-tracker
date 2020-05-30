import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'

const makeApolloClient = (password) => {
  const httpLink = new HttpLink({
    uri: 'http://hasura.acrackintheice.com/v1/graphql',
    headers: {
      'x-hasura-admin-secret': password
    }
  })

  const wsLink = new WebSocketLink({
    uri: 'ws://hasura.acrackintheice.com/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          'x-hasura-admin-secret': 'mypassword'
        }
      }
    }
  })

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  )

  const cache = new InMemoryCache()
  return new ApolloClient({
    link,
    cache
  })
}
export default makeApolloClient
