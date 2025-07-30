<template>
<div class="attr-item-box">
  <div class="title">背景颜色</div>
  <div class="color-box" @click="show = true" v-click-out="() => show = false">
    <div class="color" :style="{backgroundColor: hexColor }"></div>
    <sketch-picker class="selector" v-model="color" v-show="show"></sketch-picker>
  </div>
</div>
</template>

<script>
import { SketchPicker, tinycolor } from 'vue-color';
import provideData from '@/mixins/provideData';
export default {
  mixins: [provideData],
  components: {
    SketchPicker
  },
  data () {
    return {
      show: false,
      color: '#fff',
    };
  },
  watch: {
    color: {
      handler() {
        this.canvasEditor.state.setBackgroudColor(this.color);
      },
      deep: true
    }
  },
  computed: {
    hexColor () {
      return tinycolor(this.color).toHex8String();
    }
  },
  created () {},
  mounted () {},
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.color-box{
  position: relative;
  .color{
    width: 100%;
    box-sizing: border-box;
    border: 2px solid rgba(125, 129, 136, 0.2);
    border-radius: 4px;
    height: 40px;
    cursor: pointer;
  }
  .selector {
    position: absolute;
    top: 40px;
    left: 0px;
  }
}
</style>
