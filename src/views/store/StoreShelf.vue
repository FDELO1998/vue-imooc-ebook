<template>
    <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <scroll :top="0" class="store-shelf-scroll-wrapper"
    @onScroll="onScroll"
    :bottom="scrollBottom"
    ref="scroll">
        <shelf-search>
        </shelf-search>
        <shelf-list :data="shelfList"></shelf-list>
        <shelf-footer></shelf-footer>
    </scroll>
    </div>
</template>
<script>
    import ShelfTitle from '../../components/shelf/ShelfTitle'
    import { storeShelfMixin } from '../../utils/mixin'
    import Scroll from '../../components/common/Scroll'
    import ShelfSearch from '../../components/shelf/ShelfSearch'
    import ShelfList from '../../components/shelf/ShelfList'
    import ShelfFooter from '../../components/shelf/ShelfFooter'
    
    export default {
  mixins: [storeShelfMixin],
  components: {
      ShelfTitle,
      Scroll,
      ShelfSearch,
      ShelfList,
      ShelfFooter
  },
  watch: {
    isEditMode(isEditMode) {
        this.scrollBottom = isEditMode ? 48 : 0
        this.$nextTick(() => {
            this.$refs.scroll.refresh()
        })
    }
  },
  data() {
      return {
          scrollBottom: 0
      }
  },
  methods: {
      onScroll(offsetY) {
      this.setOffsetY(offsetY)
      }
  },
  mounted() {
   this.getShelfList()
   this.setShelfCategory([])
   this.setCurrentType(1)
  }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.store-shelf {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: white;
    .store-shelf-scroll-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
    }
}
</style>
