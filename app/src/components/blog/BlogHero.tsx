import type { PageHeroACF } from '@/lib/graphql/types'
import { ContentBoxHero } from '@/components/shared/ContentBoxHero'

interface BlogHeroProps {
  hero: PageHeroACF
  title?: string
  hideForm?: boolean
  hideHeroBody?: boolean
}

export default function BlogHero({
  hero,
  title,
  hideForm = false,
  hideHeroBody = false,
}: BlogHeroProps) {
  return (
    <ContentBoxHero hero={hero} title={title} hideForm={hideForm} hideHeroBody={hideHeroBody} />
  )
}
