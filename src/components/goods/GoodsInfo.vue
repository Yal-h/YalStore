<template>
  <div class="goodsinfo-cantain">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <Swiper :swipeList="imageslist" :isfull="false"></Swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodinfo.market_price }}</del>&nbsp;&nbsp;&nbsp;&nbsp;销售价：
            <span class="now-price">￥{{ goodinfo.sell_price }}</span>
          </p>
          <p>
            购买数量：
            <GoodsNumber @getCount="getSelecteCount" :max="goodinfo.stock_quantity"></GoodsNumber>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodinfo.goods_no }}</p>
          <p>库存情况：{{ goodinfo.stock_quantity }}</p>
          <p>上架时间：{{ goodinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "../subcomponents/Swiper.vue";
import GoodsNumber from "../subcomponents/GoodsNumber.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      imageslist: [],
      goodinfo: {},
      ballFlag: false,
      selectecount: 1
    };
  },
  created() {
    this.getImages(), this.getInfo();
  },
  methods: {
    getImages() {
      this.$http
        .get("api/getthumimages/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.imageslist = result.body.message;
          }
        })
        .catch(err => {
          console.log("获取商品参数失败");
        });
    },
    getInfo() {
      this.$http
        .get("api/goods/getinfo/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.goodinfo = result.body.message[0];
          }
        })
        .catch(err => {});
    },
    goDesc(id) {
      this.$router.push({ name: "/home/goodsdesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "/home/goodscomment", params: { id } });
    },
    addToShopcar() {
      this.ballFlag = !this.ballFlag

      const good = {
        id: this.id,
        count: this.selectecount,
        price: this.goodinfo.sell_price,
        selected: true
      }
      this.$store.commit('addCar', good)
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.6s ease";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelecteCount(count) {
      this.selectecount = count;
    }
  },
  components: {
    Swiper,
    GoodsNumber
  }
};
</script>

<style lang="">
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 99;
  top: 408px;
  left: 148px;
}

.goodsinfo-cantain {
  background-color: #eee;
  overflow: hidden;
}

.mui-card-header,
.mui-card-header {
  font-size: 15px;
}

.now-price {
  color: red;
  font-size: 14px;
}

.mui-card-footer {
  display: block;
}

.mui-card-footer button {
  margin: 15px 0;
}
</style>