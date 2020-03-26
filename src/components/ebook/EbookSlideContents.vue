<template>
<div class="ebook-slide-contents">
  <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
          <div class="slide-contents-search-icon">
              <span class="icon-search"></span>
          </div>
          <input type="text" class="slide-contents-search-input" :placeholder="$t('book.searchHint')"
          v-model="searchText"
          @keyup.enter.exact="search()"
          @click="showSearchPage">
      </div>
      <div class="slide-contents-search-cancel" v-if="searchVisible" @click="hideSearchPage()">{{$t('book.cancel')}}</div>
  </div>
  <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
          <img :src="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
         <div class="slide-contents-book-title">
             <span class="slide-contents-book-title-text">
            {{metadata.title}}</span></div>
         <div class="slide-contents-book-author">
             <span class="slide-contents-book-author-text">{{metadata.creator}}
             </span></div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
          <div class="slide-contents-book-progress">
              <span class="progress">{{progress + '%'}}</span>
              <div class="progress-text">{{$t('book.haveRead2')}}</div>
          </div>
          <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
  </div>
  <scroll class="slide-contents-list" 
  :top="156"
  :bottom="20"
  v-show="!searchVisible">
  <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
    <span class="slide-contents-item-label" :class="{'selected': section === index}"
     :style="contentItemStyle(item)" @click="displayContent(item.href)">{{item.label}}</span>
      <span class="slide-contents-item-page"></span> 
  </div>
</scroll>
<scroll class="slide-search-list" :top="66"
:bottom="20"
v-show="searchVisible">
<div class="slide-search-item" v-for="(item, index) in searchList" :key="index" 
v-html="item.excerpt"
@click="displayContent(item.cfi, true)">
</div>
</scroll>
</div>
</template>
<script>
    import { ebookMixin } from '../../utils/mixin'
    import Scroll from '../common/Scroll'
    import { px2rem } from '../../utils/utils'
 // 显示目录的文件 
export default {
    mixins: [ebookMixin],
    components: {
        Scroll
    },
    data() {
        return {
            searchVisible: false,
            searchList: null,
            searchText: ''
        }
    },
    methods: {
        search() {
            if (this.searchText && this.searchText.length > 0) {
            this.doSearch(this.searchText).then(list => {
                this.searchList = list
                this.searchList.map(item => {
                    item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
                    return item
                })
            })
            }
        },
        doSearch(q) {
            return Promise.all(
                this.currentBook.spine.spineItems.map(item => item.load(this.currentBook.load.bind(this.currentBook)).then(item.find.bind(item, q)).finally(item.unload.bind(item)))).then(results => Promise.resolve([].concat.apply([], results)))
                // concat可以拼接数组，apply可以将数组变成一个一个参数传递给方法
        },
        displayContent(target, highlight = false) {
            this.display(target, () => {
             this.hideTitleAndMenu()
             if (highlight) {
                 this.currentBook.rendition.annotations.highlight(target)
             }
            })
        },
        contentItemStyle(item) {
            return {
                marginLeft: `${px2rem(item.level * 30)}rem`
            }
        },
        showSearchPage() {
            this.searchVisible = true
        },
        hideSearchPage() {
            this.searchVisible = false
            this.searchText = ''
            this.searchList = null
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
 @import '../../assets/styles/global';
.ebook-slide-contents{
    width: 100%;
    font-size: 0;
    .slide-contents-search-wrapper {
    display: flex;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper{
        flex: 1;
        @include center;
     .slide-contents-search-icon{
         flex: 0 0 px2rem(28);
         font-size: px2rem(12);
         @include center;
        }
        .slide-contents-search-input{
          flex: 1;
          width: 100%;
          height: px2rem(32);
          font-size: px2rem(14);
          background: transparent;
          border: none;
          &:focus {
              outline: none;
          }
        }
    }
        .slide-contents-search-cancel {
            flex: 0 0 px2rem(50);
            font-size: px2rem(14);
            @include right;
    }
    }
    .slide-contents-book-wrapper {
        display: flex;
        width: 100%;
        height: px2rem(90);
        padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
        box-sizing: border-box;
        .slide-contents-book-img-wrapper{
            flex: 0 0 px2rem(45);
            .slide-contents-book-img{
                width: px2rem(45);
                height: px2rem(60);
            }
        }
        .slide-contents-book-info-wrapper{
            flex: 1;
            padding: 0 px2rem(10);
            box-sizing: border-box;
            .slide-contents-book-title{
                font-size: px2rem(14);
              /* width: px2rem(183.75); */
               line-height: px2rem(16);
               /* @include ellipsis2(3); */
               @include left;
               .slide-contents-book-title-text {
                @include ellipsis2(3);
               }
            }
            .slide-contents-book-author{
                font-size: px2rem(12);
                /* width: px2rem(183.75); */
                margin-top: px2rem(5);
                line-height: px2rem(14);
                @include left;
                .slide-contents-book-author-text {
                    @include ellipsis2(1); // 设置这类缩略属性，本层要设置宽度
                }
            }
        }
        .slide-contents-book-progress-wrapper{
            flex: 0 0 px2rem(70);
            .slide-contents-book-progress{
                padding: px2rem(10) 0 0 0;
                line-height: px2rem(10);
                .progress {
                    font-size: px2rem(14);
                }
                .progress-text {
                    font-size: px2rem(12);
                    display: inline;
                }
            }
            .slide-contents-book-time {
                font-size: px2rem(12);
            }
        }
    }
    .slide-contents-list {
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .slide-contents-item {
            display: flex;
            padding: px2rem(20) 0;
            box-sizing: border-box;
            .slide-contents-item-label {
                font-size: px2rem(14);
                line-height: px2rem(16);
                flex: 1;
                @include ellipsis;
            }
            .slide-contents-item-page {}
        }
    }
    .slide-search-list {
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .slide-search-item{
            font-size: px2rem(14);
            line-height: px2rem(16);
            padding: px2rem(20) 0;
            box-sizing: border-box;
        }
    }
}
</style>

