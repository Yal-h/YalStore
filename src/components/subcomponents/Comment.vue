<template>
  <div class="comment">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入评论内容" maxlength="120" v-model="cmtStr"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) in commentsList" :key="index">
        <div
          class="cmt-title"
        >第{{ index + 1 }}楼&nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}</div>
        <div
          class="cmt-body"
        >{{ (item.content == '') || (item.content == 'undefined') ? '此用户未发表评论' : item.content }}</div>
      </div>
    </div>

    <mt-button class="more" type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1,
      commentsList: [],
      cmtStr: ""
    };
  },
  methods: {
    getComments() {
      this.$http
        .get("api/getcomments/" + this.newsId + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            this.commentsList = this.commentsList.concat(result.body.message);
            //console.log(result.body.message);
          }
        })
        .catch(err => {
          console.log("sb!!!");
        });
    },
    getMore() {
      this.pageIndex = this.pageIndex + 1;
      this.getComments();
    },
    postComment() {
      if (this.cmtStr.trim().length == 0) {
        return Toast("请输入评论内容！");
      }
      this.$http
        .post("api/postcomment/" + this.newsId, { content: this.cmtStr.trim() })
        .then(result => {
          var cmt = {
            user_name: "匿名用户",
            add_time: Date.now(),
            content: this.cmtStr.trim()
          };
          this.commentsList.unshift(cmt);
          this.cmtStr = "";
        })
        .catch(err => {
          console.log("sb!!!!");
        });
    }
  },
  created() {
    this.getComments();
  },
  props: ["newsId"]
};
</script>

<style lang="">
textarea {
  margin: 0;
}

.comment h3 {
  font-size: 18px;
}

.cmt-list {
  margin-top: 14px;
}

.cmt-list .cmt-title {
  font-size: 14px;
  background-color: #ccc;
  height: 35px;
  line-height: 35px;
}

.cmt-list .cmt-body {
  font-size: 14px;
  line-height: 30px;
}

.more {
  margin: 10px 0;
}
</style>