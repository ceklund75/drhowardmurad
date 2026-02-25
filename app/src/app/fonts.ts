import localFont from 'next/font/local'

export const caslon = localFont({
  src: [
    {
      path: '../../public/fonts/adobe-caslon-pro/ACaslonPro-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/adobe-caslon-pro/ACaslonPro-Italic.woff',
      weight: '400',
      style: 'italic',
    },
    // add bold/semibold as needed
  ],
  variable: '--font-heading',
  display: 'swap',
})

export const barlowSemiCondensed = localFont({
  src: [
    {
      path: '../../public/fonts/barlow-semi-condensed/BarlowSemiCondensed-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/barlow-semi-condensed/BarlowSemiCondensed-LightItalic.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/barlow-semi-condensed/BarlowSemiCondensed-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/barlow-semi-condensed/BarlowSemiCondensed-Italic.woff',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-body',
  display: 'swap',
})
