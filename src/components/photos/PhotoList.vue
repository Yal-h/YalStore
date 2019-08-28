<!-- 1. 刚复制的代码的页面效果会顶到header栏 需要把mui-fullscreen -->
<!-- 2. 滑动条无法正常滑动 需要进行js组件初始化 导入mui.min.js-->
<!-- 3. 初始化后会报caller、callee、argument错误 需要移除严格模式 -->
<!-- 4. 滚动条可以滑动 但底部tabbar无法点击切换
    解决方法：类名mui-tab-item冲突 改类名以及复制样式 -->
<!-- 5. 第一次进入页面无法滚动滚动条 需要手动刷新才可以滑动
    解决方法：把初始化方式放到mounted生命周期函数中 等页面dom渲染完成在初始化 -->
<template>
  <div class="photolist-container">
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for="item in categorylist"
            :key="item.id"
            @tap="getPhotoList(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <router-link :to="'/home/photoinfo/' + item.id" v-for="(item, index) in photolist" :key="index" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
            <h3 class="info-title">{{ item.title }}</h3>
            <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      categorylist: [],
      photolist: []
    };
  },
  created() {
    this.getCategory(), this.getPhotoList(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCategory() {
      this.$http
        .get("api/getimgcategory")
        .then(result => {
          if (result.body.status === 0) {
            this.categorylist = result.body.message;
            this.categorylist.unshift({
              title: "全部",
              id: 0
            });
          }
        })
        .catch(err => {
          console.log("sb!!!!!");
        });
    },
    getPhotoList(cateId) {
      this.$http
        .get("api/getimages/" + cateId)
        .then(result => {
          if (result.body.status === 0) {
            this.photolist = result.body.message;
          }
        })
        .catch(err => {
          console.log("sb!!!!!!");
        });
    }
  }
};
</script>

<style lang="" scoped>
* {
  touch-action: pan-y;
}

ul {
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}

.photo-list li {
  background-color: #ccc;
  list-style: none;
  margin-bottom: 10px;
  box-shadow: 0 0 9px #999;
  border-radius: 10px;
  position: relative;
}

.photo-list li img {
  width: 100%;
  vertical-align: middle;
  border-radius: 10px;
}

.photo-list li img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}

.info {
    padding: 0 8px;
    position: absolute;
    color: #fff;
    background-color: rgba(0, 0, 0,0.4);
    bottom: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    max-height: 85px;
    overflow: hidden;
}

.info .info-body {
    text-overflow: ellipsis;
}

.info h3 {
    font-size: 14px;
}

.info-body {
    font-size: 12px;
}
</style>