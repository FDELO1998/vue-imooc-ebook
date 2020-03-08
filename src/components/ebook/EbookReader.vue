<template>
    <div class="ebook-reader">
        <div id="read"></div>
    </div>
</template>

<script>
    import { ebookMixin } from '../../utils/mixin'
    import { getFontFamily, saveFontFamily, getFontSize, saveFontSize, getTheme, saveTheme, getLocation } from '../../utils/localStorage'
    import Epub from 'epubjs'
    global.epub = Epub
    export default {
        mixins: [ebookMixin],
        methods: {
        prevPage() { // 切换上一页
                if (this.rendition) {
                    this.rendition.prev().then(() => {
                        this.refreshLocation()
                    })
                    this.hideTitleAndMenu()
                }
            },
        nextPage() { // 切换下一页
                if (this.rendition) {
                    this.rendition.next().then(() => {
                        this.refreshLocation()
                    })
                    this.hideTitleAndMenu()
                }
            },
            toggleTitleAndMenu() { // 显示菜单栏
                if (this.menuVisible) {
                    this.setSettingVisible(-1)
                    this.setFontFamilyVisible(false)
                }
             this.setMenuVisible(!this.menuVisible)
            },
            hideTitleAndMenu() { // 隐藏菜单栏
             this.setMenuVisible(false)
             this.setSettingVisible(-1)
             this.setFontFamilyVisible(false)
            },
            initFontSize() { // 设置字体字号
                const fontSize = getFontSize(this.fileName)
                    if (!fontSize) {
                        saveFontSize(this.fileName, this.defaultFontSize)
                    } else {
                        this.rendition.themes.fontSize(fontSize)
                        this.setDefaultFontSize(fontSize)
                    }
            },
            initFontFamily() { // 设置字体样式
                const font = getFontFamily(this.fileName)
                    if (!font) {
                        saveFontFamily(this.fileName, this.defaultFontFamily)
                    } else {
                        this.rendition.themes.font(font)
                        this.setDefaultFontFamily(font)
                    }
            },
            initTheme() { // 设置主题背景
              let defaultTheme = getTheme(this.fileName)
            if (!defaultTheme) {
            defaultTheme = this.themeList[0].name
           saveTheme(this.fileName, defaultTheme)
          }
          this.setDefaultTheme(defaultTheme)
          this.themeList.forEach(theme => {
           this.rendition.themes.register(theme.name, theme.style)
  })
  this.rendition.themes.select(defaultTheme)
},
            initRendition() {
                this.rendition = this.book.renderTo('read', {
                    width: innerWidth,
                    height: innerHeight,
                    method: 'default'
                })
                const location = getLocation(this.fileName)
                this.display(location, () => {
                    this.initTheme()
                    this.initFontSize()
                    this.initFontFamily()
                    this.initGlobalStyle()
                })
                this.rendition.hooks.content.register(contents => {
                    Promise.all([
                    contents.addStylesheet('http://192.168.1.107:9000/fonts/daysOne.css'),
                    contents.addStylesheet('http://192.168.1.107:9000/fonts/cabin.css'),
                    contents.addStylesheet('http://192.168.1.107:9000/fonts/montserrat.css'),
                    contents.addStylesheet('http://192.168.1.107:9000/fonts/tangerine.css')
                    ]).then(() => {
                    })
                })
            },
            initGesture() {
                this.rendition.on('touchstart', event => {
                   this.touchStartX = event.changedTouches[0].clientX
                  this.touchStartTime = event.timeStamp
                })
                this.rendition.on('touchend', event => {
                    const offsetX = event.changedTouches[0].clientX - this.touchStartX
                    const time = event.timeStamp - this.touchStartTime
                    if (time < 500 && offsetX > 40) {
                        this.prevPage()
                    } else if (time < 500 && offsetX < -40) {
                        this.nextPage()
                    } else {
                        this.toggleTitleAndMenu()
                    }
                    event.preventDefault()
                    event.stopPropagation()
                })
            },
            initEpub() {
                const Url = 'http://192.168.1.107:9000/epub/' + this.fileName + '.epub'
                this.book = new Epub(Url)
                this.setCurrentBook(this.book)
                this.initRendition()
                this.initGesture()
                this.book.ready.then(() => {
                    return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
                }).then(locations => {
                    this.setBookAvailable(true)
                    this.refreshLocation()
                })
            }
        },
        mounted() {
        this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
                this.initEpub()
            })
        }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../assets/styles/global';
</style>
