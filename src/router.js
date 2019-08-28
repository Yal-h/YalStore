import VueRouter from 'vue-router'

import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Shopcar from './components/tabbar/Shopcar.vue'
import Search from './components/tabbar/Search.vue'

import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'

import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/Member', component: Member },
        { path: '/Shopcar', component: Shopcar },
        { path: '/Search', component: Search },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newsinfo/:id', component: NewsInfo },
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path: '/home/goodslist', component: GoodsList },
        { path: '/home/goodsinfo/:id', component: GoodsInfo },
        { path: '/home/goodsdesc/:id', component: GoodsDesc, name: '/home/goodsdesc'},
        { path: '/home/goodscomment/:id', component: GoodsComment, name: '/home/goodscomment'},
    ],
    linkActiveClass: 'mui-active'
})

export default router