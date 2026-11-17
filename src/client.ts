import { relayStylePagination } from '@apollo/client/utilities'
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, makeVar, ReactiveVar } from '@apollo/client'
import { parseStoredAuthToken, readStoredAuthValue } from '@auth/session'

export const authTokenReactiveVar: ReactiveVar<string | null> = makeVar(readStoredAuthValue())

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_GRAPHQL_URL,
})

const authLink = new ApolloLink((operation, forward) => {
  const authToken = authTokenReactiveVar()

  if (authToken) {
    const parsedAuthToken = parseStoredAuthToken(authToken)
    if (!parsedAuthToken) return forward(operation)
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `JWT ${parsedAuthToken}`,
      },
    }))
  }

  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // TODO modify in favor of our queries
          models: relayStylePagination([]),
        },
      },
    },
  }),
})

export default client