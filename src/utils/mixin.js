import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeALLCss, getReadTimeByMinute } from './book'
import { saveLocation, getBookmark, getBookShelf, saveBookShelf } from './localStorage'
import { gotoBookDetail, appendAddToShelf, computeId, removeAddFromShelf } from './store'
import { shelf } from '../api/store'

export const storeShelfMixin = {
  computed: {
    ...mapGetters([
    'isEditMode',
    'shelfList',
    'shelfSelected',
    'shelfTitleVisible',
    'offsetY',
    'shelfCategory',
    'currentType'
    ])
  },
  methods: {
    ...mapActions([
    'setIsEditMode',
    'setShelfList',
    'setShelfSelected',
    'setShelfTitleVisible',
    'setOffsetY',
    'setShelfCategory',
    'setCurrentType'
    ]),
    showBookDetail(book) {
      gotoBookDetail(this, book)
     },
     getCategoryList(title) {
       this.getShelfList().then(() => {
         const categoryList = this.shelfList.filter(book => book.type === 2 && book.title === title)[0]
         this.setShelfCategory(categoryList)
       })
     },
      getShelfList() {
          let shelfList = getBookShelf()
          if (!shelfList) {
        shelf().then(Response => {
        if (Response.status === 200 && Response.data && Response.data.bookList) {
         shelfList = appendAddToShelf(Response.data.bookList)
         saveBookShelf(shelfList)
         return this.setShelfList(shelfList)
        }
     })
    } else {
        return this.setShelfList(shelfList)
    }
    },
    moveOutOfGroup(f) {
      this.setShelfList(this.shelfList.map(book => {
          if (book.type === 2 && book.itemList) {
            book.itemList = book.itemList.filter(subBook => !subBook.selected)
          }
          return book
        })).then(() => {
          const list = computeId(appendAddToShelf([].concat(removeAddFromShelf(this.shelfList), ...this.shelfSelected)))
          this.setShelfList(list).then(() => {
            this.simpleToast(this.$t('shelf.moveBookOutSuccess'))
            if (f) f()
          })
        })
    }
  }
}

export const storeHomeMixin = {
    computed: {
      ...mapGetters(['offsetY', 'hotSearchOffsetY', 'flapCardVisible', 'showregester', 'user'])
    },
    methods: {
      ...mapActions(['setOffsetY', 'setHotSearchOffsetY', 'setFlapCardVisible', 'setshowregester', 'setUser']),
     showBookDetail(book) {
      gotoBookDetail(this, book)
     },
     close() {
       if (this.user === '') {
        if (this.showregester) {
          this.setshowregester(false)
         } else {
          this.setshowregester(true)
         }
       } else {
        this.setshowregester(false)
       }
  },
   changeUser(data) {
   this.setUser(data)
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
      'isBookmark',
      'showregester'
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
      const RESURL = 'http://192.168.1.104:9000'
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
