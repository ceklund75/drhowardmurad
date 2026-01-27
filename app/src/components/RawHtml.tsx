'use client'

import parse from 'html-react-parser'

interface RawHtmlProps {
  html: string
}

export function RawHtml({ html }: RawHtmlProps) {
  return <>{parse(html)}</>
}
