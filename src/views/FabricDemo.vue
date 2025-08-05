<template>
<div class="fabric-container">
  <div class="tools">
    <div class="item">
      <button @click="() => editor.big()">+</button>
      <button @click="() => editor.small()">-</button>
    </div>
    <div class="item size">
      宽：<input type="number" v-model="option.width" >
      高：<input type="number" v-model="option.height" >
      &nbsp;&nbsp;
      <button @click="setStateSizeHandler">应用</button>
    </div>
    <div class="item">
      背景色：<input type="color" v-model="bgColor" @change="changeBackgoundColor">
    </div>
    <div class="item bgImg">
      背景图: <img src="../assets/spring.png" alt="" height="50px">
      &nbsp;&nbsp;
      <span style="cursor: pointer;" @click="() => editor.removeBackgroundImage()">x</span>
    </div>
  </div>
  <div id="workspace" class="workspace">
    <canvas id="f1" class="fabric-canvas"></canvas>
  </div>
</div>
</template>

<script>
import { fabric } from 'fabric';
import Editor from './graphicDesign/editor/index';
export default {
  components: {},
  data () {
    return {
      editor: null,
      canvasInstance: null, // fabric 画布对象
      option: { width: 1242, height: 1660 }, // 画布舞台大小
      bgColor: null
    };
  },
  created () {},
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.canvasInstance = new fabric.Canvas('f1');
      this.editor = new Editor(this.canvasInstance);
      this.editor.init(this.option);
      this.editor.state.setBackgroudImage('/spring.png');
    },
    setStateSizeHandler () {
      this.editor.state.setWorkStateSize(this.option.width, this.option.height);
    },
    changeBackgoundColor () {
      this.editor.state.removeBackgroundImage()
      this.editor.state.setBackgroudColor(this.bgColor);
    }
  }
};
</script>

<style lang="scss" scoped>
.fabric-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 36px);
}
.tools {
  height: 50px;
  margin-bottom: 20px;
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .item {
    border-right: 1px solid #333;
    padding-right: 10px;
    margin-left: 10px;
    &:first-child {
      margin-right: 0;
    }
    &:last-child{
      border-right: none;
    }
  }
  .size {
    input {
      width: 60px;
    }
  }
  .bgImg{
    display: flex;
    align-items: center;
  }
}
.workspace{
  width: 800px;
  height: 1000px;
  border: 1px solid #ccc;
  box-sizing: content-box;
}
</style>
