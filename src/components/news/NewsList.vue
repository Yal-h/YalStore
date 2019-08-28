<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item, index) in newslist" :key="index">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img_url"
          >
          <div class="mui-media-body">
            <h4>{{ item.title }}</h4>
            <p class="mui-ellipsis">
              <span>发表时间: {{ item.add_time | dateFormat }}</span>
              <span>点击{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http
        .get("api/getnewslist")
        .then(result => {
          if (result.body.status === 0) {
            this.newslist = result.body.message
          }
        })
        .catch(err => {
          console.log("sb!");
        });
    }
  }
};
</script>

<style lang="">
.mui-media-body h4 {
  font-size: 14px;
}

.mui-media-body .mui-ellipsis {
  font-size: 12px;
  color: skyblue;
  display: flex;
  justify-content: space-between;
}
</style>