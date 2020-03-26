import { getReadTime } from './localStorage'

export const FONT_SIZE_LIST = [
   { fontSize: 12 },
   { fontSize: 14 },
   { fontSize: 16 },
   { fontSize: 18 },
   { fontSize: 22 },
   { fontSize: 24 }
]

export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' }
]

export function themeList(vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
         color: '#4c5059',
         background: '#cecece',
         'padding-top': '48px',
         'padding-bottom': '48px'
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
         color: '#5c5b56',
         background: '#c6c2b6',
         'padding-top': '48px',
         'padding-bottom': '48px'
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          color: '#404c42',
        background: '#a9c1a9',
        'padding-top': '48px',
         'padding-bottom': '48px'
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          color: '#cecece',
        background: '#000000',
        'padding-top': '48px',
         'padding-bottom': '48px'
        }
      }
    }
  ]
}

export function addCss(href) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
} // 设置添加css属性

export function removeCss(href) {
  const links = document.getElementsByTagName('link')
  for (let i = links.length; i >= 0; i--) {
    const link = links[i]
    if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
      link.parentNode.removeChild(link)
    }
  }
}

export function removeALLCss() {
  const RESURL = 'http://192.168.1.103:9000/theme/'
  removeCss(RESURL + 'theme_default.css')
  removeCss(RESURL + 'theme_eye.css')
  removeCss(RESURL + 'theme_gold.css')
  removeCss(RESURL + 'theme_night.css')
}

export function getReadTimeByMinute(fileName) {
  const readTime = getReadTime(fileName)
  if (!readTime) {
    return 0
  } else {
    return Math.ceil(readTime / 60)
  }
  }

export function flatten(array) {
    return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
  }
