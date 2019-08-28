<template>
    <div class="photoinfo-container">
        <h3 class="title">{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击:{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <div class="thumbs">
            <vue-preview class="preview-img" :slides="imagelist" @close="handleClose"></vue-preview>
        </div>
        <br>
        <div class="content" v-html="photoinfo.content"></div>
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
            photoinfo: {},
            imagelist: []
        }
    },
    created() {
        this.getPhotoInfo()
        this.getImageList()
    },
    methods: {
        getPhotoInfo() {
            this.$http.get('api/getimageInfo/' + this.$route.params.id).then((result) => {
                if (result.body.status === 0) {
                    this.photoinfo = result.body.message[0]
                    //console.log(this.photoinfo)
                }
            }).catch((err) => {
                console.log('sb!!!!!!!')
            });
        },
        getImageList() {
            this.$http.get('api/getthumimages/' + this.id).then((result) => {
                if (result.body.status === 0) {
                    console.log(result.body.message)
                    result.body.message.forEach(item => {
                        item.w = 600
                        item.h = 400
                        item.msrc = item.src
                    })
                    this.imagelist = result.body.message
                    //console.log(this.imagelist)
                }
            }).catch((err) => {
                console.log('获取图片列表失败')
            });
        },
        handleClose () {
            console.log('close event')
        }
    },
    components: {
        'comment-box': comment
    }
}
</script>

<style lang="">
.photoinfo-container .title {
    text-align: center;
    font-size: 15px;
    line-height: 35px;
    color: cornflowerblue;
}

.photoinfo-container .subtitle {
    margin: 0 5px;
    color: skyblue;
    display: flex;
    justify-content: space-between;
}

.photoinfo-container .content {
    font-size: 14px;
    line-height: 30px;
    margin: 0 5px;
}

.thumbs {
    display: flex;
}

.thumbs > div {
    width: 100%;
}

.thumbs .my-gallery {
    display: flex;
    flex-wrap: wrap;
}

.thumbs .my-gallery figure {
    margin: 15px;
    margin-bottom: 0;
    margin-right: 0;
    box-shadow: 0 0 10px #999;
}

.thumbs .my-gallery figure img {
    width: 100px;
    vertical-align: middle;
}

/* .thumbs .preview-img {
    width: 100px;
} */
</style>