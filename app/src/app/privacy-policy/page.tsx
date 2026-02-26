import { wpgraphql } from '@/lib/graphql/server'
import { draftMode } from 'next/headers'

type PrivacyPolicyResult = {
  page: {
    databaseId: number
    id: string
    content: string
    title: string
    date: string
    modified: string
    slug: string
  } | null
}

const PRIVACY_POLICY_QUERY = `
query getPrivacyPolicy {
  page(id:"/privacy-policy", idType: URI){
    databaseId
    id
    content
    title
    date
    modified
    title
    slug
  }
}
`
export const revalidate = 86400 // match your global default if you want

export default async function PrivacyPolicyPage() {
  const { isEnabled } = await draftMode()
  const data = await wpgraphql<PrivacyPolicyResult>({
    query: PRIVACY_POLICY_QUERY,
    preview: isEnabled,
    revalidate: false,
  })

  const page = data?.page

  if (!page) {
    return <div>Privacy policy not found.</div>
  }

  return (
    <main className="prose mx-auto max-w-300 px-4 py-8">
      <h1>{page.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  )
}
