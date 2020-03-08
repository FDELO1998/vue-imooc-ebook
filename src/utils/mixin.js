import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeALLCss } from './book'
import { saveLocation } from './localStorage'

export const ebookMixin = {
      computed: {
        ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
        ]),
        themeList() {
          return themeList(this)
          }
},
   methods: {
    ...mapActions([
    'setFileName',
    'setMenuVisible',
    'setSettingVisible',
    'setDefaultFontSize',
    'setDefaultFontFamily',
    'setFontFamilyVisible',
    'setDefaultTheme',
    'setBookAvailable',
    'setProgress',
    'setSection',
    'setIsPaginating',
    'setCurrentBook',
    'setNavigation',
    'setCover',
    'setMetadata',
    'setPaginate',
    'setPagelist',
    'setOffsetY',
    'setIsBookmark'
    ]),
    initGlobalStyle() {
      removeALLCss()
      const RESURL = 'http://192.168.1.107:9000'
      switch (this.defaultTheme) {
          case 'Default':
          addCss(RESURL + '/theme/theme_default.css')
          break
          case 'Eye':
          addCss(RESURL + '/theme/theme_eye.css')
          break
          case 'Gold':
          addCss(RESURL + '/theme/theme_gold.css')
          break
          case 'Night':
          addCss(RESURL + '/theme/theme_night.css')
          break
      }
     },
     refreshLocation() {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const startCfi = currentLocation.start.cfi
      const progress = this.currentBook.locations.percentageFromCfi(startCfi)
      this.setProgress(Math.floor(progress * 100))
      this.setSection(currentLocation.start.index)
      saveLocation(this.fileName, startCfi)
    },
    display(target, cb) { // 保存阅读进度
      if (target) {
          this.currentBook.rendition.display(target).then(() => {
            this.refreshLocation()
            if (cb) cb()
          })
      } else {
          this.currentBook.rendition.display().then(() => {
            this.refreshLocation()
            if (cb) cb()
          })
      }
     }
   }
}
