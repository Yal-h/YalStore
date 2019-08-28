<template>
    <div class="goods-list">
        <!-- <router-link tag="div" class="goods-item" v-for="(item, index) in goodslist" :key="index" :to="'/home/goodsinfo/' + item.id">
            <img :src="item.img_url" alt="">
            <h3 class="title">{{ item.title }}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}</span>
                </p>
            </div>
        </router-link> -->

        <div class="goods-item" v-for="(item, index) in goodslist" :key="index" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h3 class="title">{{ item.title }}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}</span>
                </p>
            </div>
        </div>
        <mt-button class="more" type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
    data() {
        return {
            pageIndex: 1,
            goodslist: [],
            newlength: 0,
            oldlength:0
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {
            this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then((result) => {
                if (result.body.status === 0) {
                    this.goodslist = this.goodslist.concat(result.body.message)
                    this.newlength = this.goodslist.length
                }
            }).catch((err) => {
                console.log('获取商品列表失败')
            });
        },
        getMore() {
            this.pageIndex++
            this.getGoodsList()
            if (this.newlength % 10 !== 0) {
                Toast('无更多商品')
            }
        },
        goDetail(id) {
            this.$router.push('/home/goodsinfo/' + id)
        }
    },
}
</script>

<style lang="">
p {
    margin: 0;
    padding: 5px;
}
.goods-list {
    padding: 7px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 312px;
}

.goods-item img {
    width: 100%;
}

.goods-item .info {
    background-color: #eee;
}

.goods-item .info .price .now {
    color: red;
    margin-right: 7px;
    font-size: 15px;
}

.goods-item .info .price .old {
    text-decoration: line-through;
    font-size: 12px;
}

.goods-item h3 {
    font-size: 14px;
}

.goods-item .info .sell {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}

.more {
    margin-top: 5px;
}
</style>