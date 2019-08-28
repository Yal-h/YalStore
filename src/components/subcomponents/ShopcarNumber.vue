<template>
    <div class="mui-numbox" data-numbox-min="1" style="height: 28px">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" :value="num" @change="countChange" readonly ref="number">
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    mounted() {
        mui('.mui-numbox').numbox()
    },
    methods: {
        countChange() {
            this.$store.commit('updateCount', {
                id: this.id,
                count: this.$refs.number.value
            })
        }
    },
    props: ['num', 'id']
};
</script>

<style lang="">
</style>