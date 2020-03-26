<template>
<transition name="slide-up">
      <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
          <div class="setting-progress">
              <div class="read-time-wrapper">
                  <span class="read-time-text">{{getReadTimeText()}}</span>
                  <span class="icon-forward"></span>
              </div>
            <div class="progress-wrapper">
                <div class="progress-icon-wrapper" @click="prevSection">
                    <span class="icon-back" ></span>
                </div>
              <input type="range" class="progress"
              max="100"
              min="0"
              step="1"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
              :value="progress"
              :disabled="!bookAvailable"
              ref="progress">
              <div class="progress-icon-wrapper"  @click="nextSection">
                <span class="icon-forward"></span>
            </div>
            </div>
            <div class="text-wrapper">
              <span class="progress-section-text">{{getSectionName}}</span>
              <span>({{bookAvailable ? progress+'%' : '加载中...'}})</span>
            </div>
          </div>
      </div>
</transition>
</template>

<script>
  // 文章阅读时间组件
    import { ebookMixin } from '../../utils/mixin'
    export default {
        mixins: [ebookMixin],
         methods: {
            onProgressChange(progress) {
                this.setProgress(progress).then(() => {
                    this.displayProgress()
                    this.updateProgressBg()
                })
            },
            onProgressInput(progress) {
                this.setProgress(progress).then(() => {
                  this.updateProgressBg()
                })
            },
            displayProgress() {
                const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
                this.display(cfi)
            },
            updateProgressBg() {
               this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
            },
            prevSection() { // 上一章节
              if (this.section > 0 && this.bookAvailable) {
                this.setSection(this.section - 1).then(() => {
                  this.displaySection()
                })
              }
            },
            nextSection() {
              if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
                  this.setSection(this.section + 1).then(() => {
                    this.displaySection()
                  })
              }
            },
            displaySection() {
              const sectionInfo = this.currentBook.section(this.section)
                  if (sectionInfo && sectionInfo.href) {
                    this.display(sectionInfo.href)
                  }
            }
        },
        updated() {
        this.updateProgressBg()
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.setting-wrapper{
            position: absolute;
            bottom: px2rem(48);
            left: 0;
            width: 100%;
            height: px2rem(90);
            background: white;
            box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
       .setting-progress{
         position:relative;
         width: 100%;
         height: 100%;
         z-index: 105;
         .text-wrapper{
           position: absolute;
           bottom:0;
           width:100%;
           color:#333;
           font-size: px2rem(12);
           span{
             @include center;
           }
         }
         .read-time-wrapper {
             position: relative;
            left: 0;
            top: 0;
            width: 100%;
            height: px2rem(40);
            font-size: px2rem(12);
            @include center;
         }
         .progress-wrapper{
          width: 100%;
         height: 65%;
         display: flex;
         padding: 0 px2rem(15);
         box-sizing: border-box;
         .progress-icon-wrapper {
             font-size: px2rem(20);
         }
         .progress{
           width: 100%;
           -webkit-appearance: none;
           height: px2rem(2);
           margin: px2rem(8.5) px2rem(10) 0;
           &:focus{
             outline: none;
           }
           &::-webkit-slider-thumb{
             -webkit-appearance:none;
             height: px2rem(20);
             width: px2rem(20);
             border-radius: 50%;
             background: white;
             box-shadow: 0 4px 4px 0 rgba(0,0,0,.15);
             border:px2rem(1) solid #ddd;
           }
         }
        }
        .text-wrapper {
            position: absolute;
            left: 0;
            bottom: px2rem(10);
            width: 100%;
            color: #333;
            font-size: px2rem(12);
            padding: 0 px2rem(15);
            box-sizing: border-box;
            @include center
            .progress-section-text {
              display: unset;
              @include ellipsis;
            }
        }
       }
    }
</style>
