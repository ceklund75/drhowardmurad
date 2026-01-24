import Link from 'next/link'
import * as React from 'react'
import { buttonClassName } from '@/lib/ui'

type ButtonLinkProps = React.ComponentProps<typeof Link>

export function ButtonLink({ className, ...props }: ButtonLinkProps) {
  return <Link {...props} className={buttonClassName(className)} />
}
