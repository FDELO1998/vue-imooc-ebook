const book = { // 存放所有使用的变量
    state: {
        fileName: '',
        menuVisible: false,
        settingVisible: -1, // -1不显示 0：字号 1：主题 2：进度 3： 目录
        defaultFontSize: 16,
        defaultFontFamily: 'Default',
        fontFamilyVisible: false,
        defaultTheme: 'default',
        bookAvailable: false,
        progress: 0,
        section: 0,
        isPagination: true,
        currentBook: null,
        navigation: null,
        cover: null,
        metadata: null,
        paginate: '',
        pagelist: null,
        offsetY: 0,
        isBookmark: false,
        showregester: false,
        user: ''
      },
      mutations: {
        SET_FILENAME: (state, fileName) => {
          state.fileName = fileName
        },
        SET_MENU_VISIBLE: (state, visible) => {
          state.menuVisible = visible
        },
        SET_SETTING_VISIBLE: (state, visible) => {
          state.settingVisible = visible
        },
        SET_DEFAULT_FONT_SIZE: (state, fontSize) => {
          state.defaultFontSize = fontSize
        },
        SET_DEFAULT_FONT_FAMILY: (state, font) => {
          state.defaultFontFamily = font
        },
        SET_FONT_FAMILY_VISIBLE: (state, fontFamilyVisible) => {
          state.fontFamilyVisible = fontFamilyVisible
        },
        SET_DEFAULT_THEME: (state, theme) => {
          state.defaultTheme = theme
        },
        SET_BOOK_AVAILABLE: (state, bookAvailable) => {
          state.bookAvailable = bookAvailable
        },
        SET_PROGRESS: (state, progress) => {
          state.progress = progress
        },
        SET_SECTION: (state, section) => {
          state.section = section
        },
        SET_IS_PAGINATING: (state, isPaginating) => {
          state.isPaginating = isPaginating
        },
        SET_CURRENT_BOOK: (state, currentBook) => {
          state.currentBook = currentBook
        },
        SET_NAVIGATION: (state, navigation) => {
          state.navigation = navigation
        },
        SET_COVER: (state, cover) => {
          state.cover = cover
        },
        SET_METADATA: (state, metadata) => {
          state.metadata = metadata
        },
        SET_PAGINATE: (state, paginate) => {
          state.paginate = paginate
        },
        SET_PAGELIST: (state, pagelist) => {
          state.pagelist = pagelist
        },
        SET_OFFSETY: (state, offsetY) => {
          state.offsetY = offsetY
        },
        SET_IS_BOOKMARK: (state, isBookmark) => {
          state.isBookmark = isBookmark
        },
        SET_REGESTER: (state, showregester) => {
          state.showregester = showregester
        },
        SET_USER: (state, user) => {
          state.user = user
        }
      }
}
export default book
