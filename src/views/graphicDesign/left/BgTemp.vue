<template>
<div class="bg-temp">
  <div
    class="item"
    v-for="(item, i) in list"
    :key="`bg${i}`"
    @click="changeBackgroudImage(item)"
  >
    <img :src="item" alt="">
  </div>
</div>
</template>

<script>
import canvasEditor from '@/mixins/canvasEditor.js';
export default {
  mixins: [canvasEditor],
  components: {},
  data () {
    return {
      list: [
        '/spring.png'
      ]
    };
  },
  created () {},
  mounted () {
  },
  methods: {
    changeBackgroudImage(item) {
      this.canvasEditor.state.setBackgroudImage(item);
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-temp{
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  box-sizing: border-box;
  .item{
    width: calc(50% - 5px);
    margin-right: 10px;
    &:nth-child(2n) {
      margin-right: 0;
    }
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>
