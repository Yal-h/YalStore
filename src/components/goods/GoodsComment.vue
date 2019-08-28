<template>
    <div class="comment-container">
        <Comment :newsId="$route.params.id"></Comment>
    </div>
</template>

<script>
import Comment from '../subcomponents/Comment.vue'

export default {
    data() {
        return {
            
        }
    },    
    methods: {
        
    },
    components: {
        Comment
    }
}
</script>

<style lang="">
.comment-container {
    padding-top: 15px;
}
</style>