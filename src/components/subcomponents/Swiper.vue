<template>
  <div>
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item, index) in swipeList" :key="index">
        <img :src="item.img || item.src" alt="" :class="{ full: isfull }">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ['swipeList', 'isfull'],
  data() {
    return {
        
    };
  },
  created() {
  },
  methods: {
  }
};
</script>

<style scoped>
.mint-swipe {
  height: 200px;
}

.mint-swipe .mint-swipe-item {
  text-align: center;
}

.mint-swipe .mint-swipe-item img {
  height: 100%;
}

.full {
  width: 100%;
}
</style>