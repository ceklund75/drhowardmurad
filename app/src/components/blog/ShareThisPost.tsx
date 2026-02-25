/* eslint-disable react-hooks/immutability */
'use client'
import { JSX } from 'react'
import type { Post } from '@/lib/graphql/types'
import {
  FaFacebookF,
  FaXTwitter,
  FaPinterestP,
  FaLinkedinIn,
  FaWhatsapp,
  FaXing,
  FaPaperPlane,
} from 'react-icons/fa6'
import { FaThreads, FaBluesky } from 'react-icons/fa6'

interface ShareThisPostProps {
  post: Post
}

const NETWORKS = [
  'facebook',
  'twitter',
  'threads',
  'pinterest',
  'linkedin',
  'whatsapp',
  'bluesky',
  'xing',
  'email',
] as const

type Network = (typeof NETWORKS)[number]

const ICONS: Record<Network, JSX.Element> = {
  facebook: <FaFacebookF />,
  twitter: <FaXTwitter />,
  threads: <FaThreads />,
  pinterest: <FaPinterestP />,
  linkedin: <FaLinkedinIn />,
  whatsapp: <FaWhatsapp />,
  bluesky: <FaBluesky />,
  xing: <FaXing />,
  email: <FaPaperPlane />,
}

function getShareUrl(network: Network, url: string, title: string) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  switch (network) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    case 'threads':
      return `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`
    case 'pinterest':
      return `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    case 'whatsapp':
      return `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`
    case 'bluesky':
      return `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`
    case 'xing':
      return `https://www.xing.com/spi/shares/new?url=${encodedUrl}`
    case 'email':
      return `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
    default:
      return url
  }
}

export function ShareThisPost({ post }: ShareThisPostProps) {
  const url = `https://drhowardmurad.com${post.uri}`
  const title = post.title

  const handleShareClick = (network: Network) => {
    if (typeof window === 'undefined') return
    const shareUrl = getShareUrl(network, url, title)

    if (network === 'email') {
      window.location.href = shareUrl
      return
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=600')
  }

  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-gray-1 m-0 p-0 text-sm font-medium tracking-normal uppercase">
          Share this post
        </p>

        <ul className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
          {NETWORKS.map((network) => (
            <li key={network} className="m-0">
              <button
                type="button"
                className="focus-visible:ring-theme text-gray-1 flex h-8 w-8 cursor-pointer items-center justify-center focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                aria-label={`Share on ${network}`}
                onClick={() => handleShareClick(network)}
              >
                {ICONS[network]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
