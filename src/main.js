//入口文件
//引入Vue
import Vue from 'vue'

//引入vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import Vuex from 'vuex';
Vue.use(Vuex)

Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true

//引入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//引入mint-ui
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button);
// Vue.use(Lazyload)
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//引入App组件
import app from './App.vue'

//引入自定义路由
import router from './router.js'

import moment from 'moment'

Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

var car = JSON.parse(localStorage.getItem('car') || '[]')

const store = new Vuex.Store({
    state: {
        //原来存储商品对象,{ id, count, price, selected }
        car: car,
        goodscount: 0
    },
    mutations: {
        addCar(state, goodinfo) {
            var isFlag = state.car.some(item => {
                if (item.id == goodinfo.id) {
                    item.count += goodinfo.count
                    return true
                }
            })
            if (!isFlag) {
                state.car.push(goodinfo)
            }
            localStorage.setItem('car', JSON.stringify(state.car))
            console.log(state.goodscount)
        },
        updateCount(state, newcount) {
            state.car.some(item => {
                if (item.id == newcount.id) {
                    item.count = parseInt(newcount.count)
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        delInfo(state, id) {
            state.car.some((item, index) => {
                if (item.id == id) {
                    state.car.splice(index, 1)
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateSel(state, selinfo) {
            state.car.some(item => {
                if (item.id == selinfo.id) {
                    item.selected = Boolean(selinfo.sel)
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        getCount(state) {
            let num = 0
            state.car.forEach(item => {
                num += item.count
            })
            return num
        },
        getSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getSelCount(state) {
            let c = 0
            state.car.forEach(item => {
                if (item.selected) {
                    c += item.count
                }
            })
            return c
        },
        getSelPrice(state) {
            let p = 0
            state.car.forEach(item => {
                if (item.selected) {
                    p += (item.price * item.count)
                }
            })
            return p
        }
    }
})

new Vue({
    el: '#app',
    data: {},
    methods: {},
    render: c => c(app),
    router,
    store
})