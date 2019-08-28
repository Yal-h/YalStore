<template>
  <div class="shopcar-container">
    <div class="mui-card" v-for="(item, index) in carlist" :key="index">
      <div class="mui-card-content">
        <div class="mui-card-content-inner info-parent">
          <mt-switch
            @change="selChange(item.id, $store.getters.getSelected[item.id])"
            v-model="$store.getters.getSelected[item.id]"
          ></mt-switch>
          <img class="info-img" :src="item.thumb_path" alt>
          <div class="info">
            <h3>{{ item.title }}</h3>
            <p class="info-p">
              <span class="price">￥{{ item.sell_price }}</span>
              <ShopcarNumber :id="item.id" :num="item.cou"></ShopcarNumber>
              <a href="#" @click.prevent="del(item.id, index)">删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner count-box">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red-span">{{ $store.getters.getSelCount }}</span>件,总价：
              <span class="red-span">￥{{ $store.getters.getSelPrice }}</span>
            </p>
          </div>
          <div class="right">
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopcarNumber from "../subcomponents/ShopcarNumber.vue";

export default {
  data() {
    return {
      idArr: [],
      carlist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      var idStr = "";
      this.$store.state.car.forEach(element => {
        this.idArr.push(element.id);
      });
      idStr = this.idArr.join(",");
      if (this.idArr.length <= 0) {
        return;
      }

      this.$http
        .get("api/goods/getshopcarlist/" + idStr)
        .then(result => {
          if (result.body.status === 0) {
            this.carlist = result.body.message;

            this.carlist.forEach(item1 => {
              this.$store.state.car.forEach(item2 => {
                if (item1.id == item2.id) {
                  item1.cou = item2.count;
                }
              });
            });
          }
        })
        .catch(err => {
          console.log("获取购物车商品列表失败");
        });
    },
    del(id, index) {
      this.carlist.splice(index, 1);
      this.$store.commit("delInfo", id);
    },
    selChange(id, val) {
      console.log(id + '-' + val)
      this.$store.commit('updateSel', {
        id: id,
        sel: val
      })
    }
  },
  components: {
    ShopcarNumber
  }
};
</script>

<style lang="">
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
}

.shopcar-container .info-parent {
  display: flex;
  align-items: center;
}

.shopcar-container .info h3 {
  font-size: 15px;
}

.shopcar-container .info-img {
  width: 60px;
  height: 60px;
  margin: 0 10px;
}

.shopcar-container .info .info-p {
  margin: 0;
  padding: 0;
  margin-top: 16px;
}

.red-span {
  margin: 0 5px;
  color: tomato;
}

.shopcar-container .count-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>