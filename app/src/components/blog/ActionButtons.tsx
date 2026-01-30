import Link from 'next/link'
import { buttonClassName } from '@/lib/ui'

interface ActionButtonsProps {
  amazonUrl?: string | null
  learnMoreUrl?: string | null
  videoPopupClassName?: string | null
}

function isInternalUrl(url: string): boolean {
  return url.startsWith('/') || url.startsWith('#') || url.indexOf('drhowardmurad.com') != -1
}

export function ActionButtons({
  amazonUrl,
  learnMoreUrl,
  videoPopupClassName,
}: ActionButtonsProps) {
  if (!amazonUrl && !learnMoreUrl && !videoPopupClassName) return null

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {amazonUrl && (
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClassName('button-theme')}
        >
          Buy on Amazon
        </a>
      )}

      {learnMoreUrl &&
        (isInternalUrl(learnMoreUrl) ? (
          <Link href={learnMoreUrl} className={buttonClassName('button-theme')}>
            Learn More
          </Link>
        ) : (
          <a
            href={learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClassName()}
          >
            Learn More
          </a>
        ))}

      {videoPopupClassName && (
        <button type="button" className={buttonClassName(`button-theme ${videoPopupClassName}`)}>
          Watch Video
        </button>
      )}
    </div>
  )
}
