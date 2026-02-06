import type { PageHeroACF } from '@/lib/graphql/types'
import { ContentBoxHero } from '@/components/shared/ContentBoxHero'

interface BlogHeroProps {
  hero: PageHeroACF
  title?: string
  hideForm?: boolean
}

export default function PageHero({ hero, title, hideForm = false }: BlogHeroProps) {
  return <ContentBoxHero hero={hero} title={title} hideForm={hideForm} />
}
