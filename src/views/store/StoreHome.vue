<template>
    <div class="store-home">
        <search-bar></search-bar>
        <flap-card :data = "random"></flap-card>
        <scroll :top='ScrollTop' @onScroll="onScroll" ref = "scroll">
            <div class="banner-wrapper">
                <img :src="banner" class="banner-img">
            </div>
            <guess-you-like :data="guessYouLike"></guess-you-like>
            <recommend :data="recommend" class="recommend"></recommend>
            <featured :data = "featured" class="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')"></featured>
        <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
            <category-book :data="item"></category-book>
        </div>
       <category class="category" :data="categories"></category>
    </scroll>
    </div>
   
</template>
<script>
    import SearchBar from '../../components/home/SearchBar'
    import Scroll from '../../components/common/Scroll'
    import FlapCard from '../../components/home/FlapCard'
    import { storeHomeMixin } from '../../utils/mixin'
    import { home } from '../../api/store'
    import GuessYouLike from '../../components/home/GuessYouLike'
    import Recommend from '../../components/home/Recommend'
    import Featured from '../../components/home/Featured'
    import CategoryBook from '../../components/home/CategoryBook'
    import Category from '../../components/home/Category'
 
    export default {
        mixins: [storeHomeMixin],
        components: {
            SearchBar,
            Scroll,
            FlapCard,
            GuessYouLike,
            Recommend,
            Featured,
            CategoryBook,
            Category
        },
        data() {
         return {
            ScrollTop: 94,
            random: null,
            banner: '',
            guessYouLike: null,
            recommend: null,
            featured: null,
            categoryList: null,
            categories: null
         }
        },
        methods: {
          onScroll(offsetY) {
             this.setOffsetY(offsetY)
             if (offsetY > 0) {
                 this.ScrollTop = 52
             } else {
                 this.ScrollTop = 94
             }
             this.$refs.scroll.refresh()
          }  
        },
        mounted() {
            home().then(response => {
             if (response && response.status === 200) {
            const data = response.data
            const randomIndex = Math.floor(Math.random() * data.random.length)
            this.random = data.random[randomIndex]
            this.banner = data.banner
            this.guessYouLike = data.guessYouLike
            this.recommend = data.recommend
            this.featured = data.featured
            this.categoryList = data.categoryList
            this.categories = data.categories
            }
            })
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.store-home {
    width: 100%;
    height: 100%;
    .banner-wrapper{
        padding: px2rem(10);
        box-sizing: border-box;
        width: 100%;
        .banner-img {
            width: 100%;
            height: px2rem(150);
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
    }
    .recommend {
       margin-top: px2rem(15);
    }
    .featured{
        margin-top: px2rem(20);
    }
    .category-list-wrapper{
        margin-top: px2rem(20);
    }
    .category {
        margin-top: px2rem(20);
    }
}
</style>
