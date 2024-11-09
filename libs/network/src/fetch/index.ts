import { TypedDocumentNode } from '@apollo/client'
import { print } from 'graphql'

export interface FetchResult<TData> {
  data?: TData
  error?: string
}

export interface GraphqlRequestOptions<TData, Variable> {
  document: TypedDocumentNode<TData, Variable>
  variables?: Variable
  config?: RequestInit
  token?: string
}

/**
 * Send a GraphQL request to the server.
 * @param document The GraphQL document to send.
 * @param variables The variables to send with the document.
 * @param config Any additional configuration to pass to the fetch function.
 * @param token The JWT token to send with the request.
 * @returns A promise that resolves with the result of the query.
 */
export const fetchGraphQL = async <TData, Variable>({
  document,
  variables,
  config,
  token,
}: GraphqlRequestOptions<TData, Variable>): Promise<FetchResult<TData>> => {
  const query = print(document)

  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : null),
    },
    body: JSON.stringify({ query, variables }),
    ...config,
  }).then(async (res) => {
    const { data, errors } = await res.json()
    console.log({ data, errors })

    if (errors) {
      console.log('Error', JSON.stringify(errors))
      return { error: JSON.stringify(errors[0].message) }
    }
    return { data }
  })
}
