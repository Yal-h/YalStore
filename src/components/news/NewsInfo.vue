<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ newsinfo.add_time | dateFormat }}</span>
            <span>点击:{{ newsinfo.click }}次</span>
        </p>

        <hr>

        <div class="content" v-html="newsinfo.content">
        </div>
        <br>
        <comment-box :newsId="this.id"></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponents/Comment.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,
            newsinfo: {}
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo() {
            this.$http.get('api/getnew/' + this.id).then(result => {
                if (result.body.status === 0) {
                    this.newsinfo = result.body.message[0]
                }
            }).catch((err) => {
                console.log('sb!!')
            });
        }
    },
    components: {
        'comment-box': comment
    }
    
}
</script>

<style lang="">
.newsinfo-container .title {
    font-size: 16px;
    line-height: 35px;
}

.newsinfo-container .subtitle {
    color: skyblue;
    display: flex;
    justify-content: space-between;
}
</style>