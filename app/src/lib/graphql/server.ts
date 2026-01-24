export async function wpgraphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 }, // menu can be cached
  })

  if (!res.ok) throw new Error(`WPGraphQL failed: ${res.status}`)

  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)

  return json.data as T
}
