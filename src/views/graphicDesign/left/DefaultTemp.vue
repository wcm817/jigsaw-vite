<template>
<div>
  <div
    class="list"
    v-for="item in list"
    :key="item.title"
  >
    <text-line :text="item.title"></text-line>
    <div class="item">
      <div
        class="icon"
        v-for="subItem in item.icons"
        :key="subItem.iconText"
        :draggable="!subItem.disDraggable"
        @dragstart="dragStartHandler(subItem)"
      >
        <span :class="`iconfont ${subItem.icon}`"></span>
        <div>{{ subItem.iconText }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TextLine from '@/components/TextLine.vue';
import provideData from '@/mixins/provideData.js';
export default {
  mixins: [provideData],
  components: {
    TextLine
  },
  data () {
    return {
      list: [
        { 
          title: '图片', 
          icons: [{ icon: 'icon-image', iconText: '本地图片', type: 'image', disDraggable: true}]
        },
        { 
          title: '文字',
          icons: [
            { icon: 'icon-h1', iconText: '标题', type: 'text.h1' },
            { icon: 'icon-h1', iconText: '副标题', type: 'text.h2' },
            { icon: 'icon-Text', iconText: '正文', type: 'text.rect' },
            { icon: 'icon-icon-class-a', iconText:'曲线文字', type: 'text.circle' }
          ]
        },
        {
          title:'形状',
          icons: [
            { icon: 'icon-bx-rectangle', iconText: '正方形', type: 'rect' },
            { icon: 'icon-bx-circle', iconText: '圆形', type: 'circle' },
            { icon: 'icon-bx-triangle', iconText: '三角形', type: 'triangle' },
          ]
        }, 
        {
          title: '绘制',
          icons: [
            { icon: 'icon-line', iconText: '线段', type: 'line' },
            // { icon: 'icon-ArrowDownLeft-1', iconText: '箭头', type: 'arrow' },
            { icon: 'icon-pen', iconText: '画笔', type: 'pen' },
          ]
        }
      ]
    };
  },
  created () {},
  mounted () {},
  methods: {
    dragStartHandler (item) {
      this.canvasEditor.operate.addBaseType(item.type);
    }
  }
};
</script>

<style lang="scss" scoped>
.item{
  display: flex;
  flex-wrap: wrap;
  .icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    font-size: 12px;
    color: #666;
    background-color: #f2f2f2;
    border-radius: 10px;
    margin-right: 6px;
    margin-bottom: 6px;
    .iconfont{
      font-weight: 600;
      margin-bottom: 4px;
    }
  }
}
</style>
