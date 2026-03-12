import Link from 'next/link'
import { buttonClassName } from '@/lib/ui'
import PostVideoButton from './PostVideoButton'

interface ActionButtonsProps {
  amazonUrl?: string | null
  learnMoreUrl?: string | null
  //videoPopupClassName?: string | null
  videoContent?: string | null
}

function isInternalUrl(url: string): boolean {
  return url.startsWith('/') || url.startsWith('#') || url.indexOf('drhowardmurad.com') != -1
}

export function ActionButtons({ amazonUrl, learnMoreUrl, videoContent }: ActionButtonsProps) {
  if (!amazonUrl && !learnMoreUrl && !videoContent) return null

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

      {videoContent && (
        <PostVideoButton
          videoUrl={videoContent}
          className={buttonClassName(`button-theme cursor-pointer`)}
        />
      )}
    </div>
  )
}
