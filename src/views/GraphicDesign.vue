<template>
  <div class="graphic-design">
    <left></left>
    <div class="center">
      <div id="workspace">
        <canvas id="c1" class="design-stage-grid"></canvas>
      </div>
    </div>
    <right></right>
  </div>
</template>

<script>
import Left from '@/views/graphicDesign/left.vue';
import Right from '@/views/graphicDesign/right.vue';
import { fabric } from 'fabric';
import Editor from '@/views/graphicDesign/editor/index';
import { provide, markRaw } from 'vue';
export default {
  provide () {
    return {
      provideData: () => ({
        fabric: fabric,
        canvasEditor: this.editor
      })
    };
  },
  components: {
    Left,
    Right
  },
  data () {
    return {
      editor: null,
      canvasInstance: null, // fabric 画布对象
      option: { width: 1242, height: 1660 }, // 画布舞台大小
    };
  },
  created () {},
  destroyed () {
    this.editor.clear();
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      // 在Vue3项目中，使用fabric:5.3.0和vue:3.3.4版本时，矩形和多边形无法缩放的问题, Fabricjs 不喜欢将 Canvas 作为proxy代理。使用markRaw解决
      this.canvasInstance = markRaw(new fabric.Canvas('c1'));
      this.editor = new Editor(this.canvasInstance);
      this.editor.init(this.option);
      provide('fabric', fabric);
      provide('canvasEditor', this.editor);
    },
  }
};
</script>

<style lang="scss" scoped>
.graphic-design {
  width: 100%;
  height: calc(100vh - 36px);
  display: flex;
  flex-wrap: nowrap;
  .center{
    width: calc(100% - 335px * 2);
    height: 100%;
  }
}
#workspace{
  width: 100%;
  height: 100%;
}

// 网格背景
.design-stage-grid {
  --offsetX: 0px;
  --offsetY: 0px;
  --size: 16px;
  --color: #dedcdc;
  background-image: linear-gradient(
      45deg,
      var(--color) 25%,
      transparent 0,
      transparent 75%,
      var(--color) 0
    ),
    linear-gradient(45deg, var(--color) 25%, transparent 0, transparent 75%, var(--color) 0);
  background-position: var(--offsetX) var(--offsetY),
    calc(var(--size) + var(--offsetX)) calc(var(--size) + var(--offsetY));
  background-size: calc(var(--size) * 2) calc(var(--size) * 2);
}
</style>
