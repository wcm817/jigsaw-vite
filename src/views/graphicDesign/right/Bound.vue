<!-- 圆角 -->
<template>
<div class="attr-item-box" v-if="['rect'].includes(selectType)">
  <div class="title">圆角</div>
  <div class="dx align-i-c">
    <span>半径</span> 
    <el-slider class="slider" v-model="roundValue" :min="0" :max="500"/>
    <el-input-number class="inp-number" v-model="roundValue" :min="0" :max="500" controls-position="right"></el-input-number>
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
      roundValue: 0,
      selectType: ''
    };
  },
  watch: {
    roundValue () {
      this.changeRound();

    }
  },
  created () {},
  beforeUnmount () {
    this.canvasEditor.off('select-one', this.getObjectAttr);
    this.canvasEditor.off('select-cancel', this.selectCancel);
    this.canvasEditor.canvasInstance.off('object:modified', this.getObjectAttr);
  },
  mounted () {
    this.getObjectAttr ();
    this.canvasEditor.on('select-one', this.getObjectAttr);
    this.canvasEditor.on('select-cancel', this.selectCancel);
    this.canvasEditor.canvasInstance.on('object:modified', this.getObjectAttr);
  },
  methods: {
    getObjectAttr (e) {
      const obj = this.canvasEditor.canvasInstance.getActiveObject();
      this.selectType = obj.type;
      // 不是当前obj，跳过
      if (e && e.target && e.target !== obj) return;
      if (obj) {
        this.roundValue = obj.get('roundValue');
      }
    },
    changeRound () {
      const obj = this.canvasEditor.canvasInstance.getActiveObject();
      if (obj) {
        obj.set('roundValue', this.roundValue);
        obj.set('rx', this.roundValue);
        obj.set('ry', this.roundValue);
        this.canvasEditor.canvasInstance.renderAll();
      }
    },
    selectCancel () {
      this.proxy?.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.dx {
  span{
    flex-shrink: 0;
  }
  .inp-number{
    width: 100px;
  }
}
.slider {
  flex: 1;
  margin: 0 10px 0 15px;
}
</style>
