<template>
<div>
  <div
    class="item"
    v-for="(item, index) in list"
    :key="item.name"
    :class="index === activeMenu ? 'active' : ''"
    @click="clickHandler(index, item)"
  >
    <span :class="`iconfont ${item.icon}`"></span>
    <div>{{ item.name }}</div>
  </div>
</div>
</template>

<script>
import emitter from '@/utils/eventBus';
export default {
  components: {},
  data () {
    return {
      activeMenu: 0,
      list: [
        { icon: 'icon-add', name: '添加', componentName: 'DefaultTemp' },
        { icon: 'icon-SAVE_TEMPLATE', name: '模板', componentName: 'ModuleTemp' },
        { icon: 'icon-text-size', name: '文字', componentName: 'TextTemp'},
        { icon: 'icon-editor-background', name: '背景', componentName: 'BgTemp' },
      ]
    };
  },
  created () {
  },
  destroyed () {
    emitter.off('set-bg-menu');
  },
  mounted () {
    this.$emit('change-menu', this.list[this.activeMenu]);
    emitter.on('set-bg-menu', () => {
      this.activeMenu = 3;
      this.$emit('change-menu', this.list[this.activeMenu]);
    });
  },
  methods: {
    clickHandler (index, item) {
      this.activeMenu = index;
      this.$emit('change-menu', item);
    }
  }
};
</script>

<style lang="scss" scoped>
.item{
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-bottom: 14px;
  cursor: pointer;
  &.active{
    background-color: rgb(222, 240, 248);
    color: $color;
  }
}
</style>
