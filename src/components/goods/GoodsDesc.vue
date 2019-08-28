<template>
    <div class="desc-container">
        <h3 class="title">{{ descinfo.title }}</h3>
        <hr>
        <div class="content" v-html="descinfo.content">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            descinfo: {}
        }
    },
    methods: {
        getDesc() {
            this.$http.get('api/goods/getdesc/' + this.id).then((result) => {
                if (result.body.status === 0) {
                    console.log(result.body.message[0])
                    this.descinfo = result.body.message[0]
                }
            }).catch((err) => {
                console.log('获取图文信息失败')
            });
        }
    },
    created() {
        this.getDesc()
    }
}
</script>

<style lang="">
h3 {
    padding: 0;
    margin: 0;
}

.desc-container {
    padding: 5px;
}

.desc-container .title {
    text-align: center;
    font-size: 14px;
    line-height: 30px;
}

.desc-container .content img {
    width: 100%;
}
</style>