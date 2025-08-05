<!-- 圆角 -->
<template>
  <div class="attr-item-box">
    <div class="title">边框</div>
    <div class="row">
      <div class="item-2">
        <span class="label">颜色</span>
        <el-color-picker class="value" @change="(color) => { changCommon('stroke', color) }" v-model="stroke"/>
      </div>
      <div class="item-2">
        <span class="label">宽度</span>
        <el-input-number class="value inp-number" @change="(w) => { changCommon('strokeWidth', w) }" v-model="strokeWidth" controls-position="right"></el-input-number>
      </div>
    </div>
    <div class="row">
      <div class="item-1">
        <span class="label">边框</span>
        <el-select v-model="strokeLineInfos" @change="changeStrokeLineInfos" value-key="label">
          <el-option
            v-for="item in strokeDashList"
            :key="item.label"
            :value="item"
          >
            <div :class="`${item.label} option`"></div>
          </el-option>
          <template #label>
            <div :class="strokeLineInfos.label"></div>
          </template>
        </el-select>
      </div>
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
        stroke: '#fff',
        strokeWidth: 0,
        strokeLineInfos: {},
        strokeDashList: [
          {
            value: {
              strokeUniform: true,
              strokeDashArray: [],
              strokeLineCap: 'butt',
            },
            label: 'sold',
          },
          {
            value: {
              strokeUniform: true,
              strokeDashArray: [10, 10],
              strokeLineCap: 'butt',
            },
            label: 'dashed',
          },
          {
            value: {
              strokeUniform: true,
              strokeDashArray: [5, 5],
              strokeLineCap: 'round',
            },
            label: 'dotted',
          }
        ]
      };
    },
    watch: {
    },
    created () {},
    beforeUnmounted () {
      this.canvasEditor.off('select-cancel', this.selectCancel);
      this.canvasEditor.off('select-one', this.getObjectAttr);
      this.canvasEditor.canvasInstance.off('object:modified', this.getObjectAttr);
    },
    mounted () {
      this.getObjectAttr ();
      this.canvasEditor.on('select-cancel', this.selectCancel);
      this.canvasEditor.on('select-one', this.getObjectAttr);
      this.canvasEditor.canvasInstance.on('object:modified', this.getObjectAttr);
    },
    methods: {
      getObjectAttr (e) {
        const obj = this.canvasEditor.canvasInstance.getActiveObject();
        // 不是当前obj，跳过
        if (e && e.target && e.target !== obj) return;
        if (obj) {
          this.stroke = obj.get('stroke');
          this.strokeWidth = obj.get('strokeWidth');
          const strokeDashArray = JSON.stringify(obj.get('strokeDashArray') || []);
          const target = this.strokeDashList.find((item) => {
            return (
              JSON.stringify(item.value.strokeDashArray) === strokeDashArray &&
              obj.get('strokeLineCap') === item.value.strokeLineCap
            );
          });
          if (target) this.strokeLineInfos = target;
          obj.set('stroke', this.stroke);
          obj.set('strokeWidth', this.strokeWidth);
          obj.set(this.strokeLineInfos.value);
          this.canvasEditor.canvasInstance.renderAll();
        }
      },
      changCommon (key, value) {
        const obj = this.canvasEditor.canvasInstance.getActiveObject();
        if (obj) {
          obj.set(key, value);
          this.canvasEditor.canvasInstance.renderAll();
        }
      },
      changeStrokeLineInfos(lineInfos) {
        const obj = this.canvasEditor.canvasInstance.getActiveObject();
        if (obj) {
          const value = JSON.parse(JSON.stringify(lineInfos.value))
          obj.set(value);
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
  .slider {
    flex: 1;
    margin: 0 10px 0 15px;
  }
  
  .option {
    margin: 16px 0;
  }

  .sold {
    width: 100%;
    height: 2px;
    background-color: #666;
  }

  .dashed {
    width: 100%;
    height: 2px;
    background-image: linear-gradient(to right, #666 0%, #666 50%, transparent 50%, transparent 100%);
    background-size: 16px 2px;
  }

  .dotted {
    width: 100%;
    height: 2px;
    background-image: linear-gradient(to right, #666 0%, #666 50%, transparent 50%, transparent 100%);
    background-size: 8px 2px;
  }
  
  </style>
  