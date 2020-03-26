import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeALLCss, getReadTimeByMinute } from './book'
import { saveLocation, getBookmark } from './localStorage'

export const storeHomeMixin = {
    computed: {
      ...mapGetters(['offsetY', 'hotSearchOffsetY', 'flapCardVisible'])
    },
    methods: {
      ...mapActions(['setOffsetY', 'setHotSearchOffsetY', 'setFlapCardVisible']),
     showBookDetail(book) {
       
     }
    }
}
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
          },
          getSectionName() { // 获取章节目录名
            return this.section ? this.navigation[this.section].label : ''
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
      if (currentLocation && currentLocation.start) {
      const startCfi = currentLocation.start.cfi
      const progress = this.currentBook.locations.percentageFromCfi(startCfi)
      this.setProgress(Math.floor(progress * 100))
      this.setSection(currentLocation.start.index)
      saveLocation(this.fileName, startCfi)
      const bookmark = getBookmark(this.fileName)
      if (bookmark) {
        if (bookmark.some(item => item.cfi === startCfi)) {
          this.setIsBookmark(true)
        } else {
          this.setIsBookmark(false)
        }
      } else {
        this.setIsBookmark(false)
      }
      }
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
     },
     hideTitleAndMenu() { // 隐藏菜单栏
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
     },
     getReadTimeText() {
      return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
      }
   }
}
