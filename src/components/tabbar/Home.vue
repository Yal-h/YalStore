<template>
  <div>
    <Swiper :swipeList="swipeList" :isfull="true"></Swiper>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import Swiper from '../subcomponents/Swiper.vue'

export default {
  data() {
    return {
      swipeList: []
    };
  },
  created() {
    this.getSwipe();
  },
  methods: {
    getSwipe() {
      this.$http
        .get("api/getlunbo")
        .then(result => {
          //console.log(result.body)
          if (result.body.status === 0) {
            this.swipeList = result.body.message;
          }
        })
        .catch(err => {
          console.log("sb");
          Toast("获取数据失败");
        });
    }
  },
  components: {
    Swiper
  }
};
</script>

<style lang="">
.mint-swipe {
  height: 200px;
}

.mint-swipe .mint-swipe-item img {
  width: 100%;
  height: 100%;
}

.mui-grid-view.mui-grid-9 {
    background-color: #fff;
}

.mui-grid-view.mui-grid-9 img {
    width: 60px;
    height: 59px;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
    font-size: 12px;
}

.mui-col-sm-3 {
    width: 33.33333333%;
}
</style>