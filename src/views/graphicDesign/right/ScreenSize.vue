<template>
  <div class="attr-item-box">
    <div class="title">画布尺寸</div>
    <div class="dx justify-c-sb">
      <div class="btn" @click="() => drawer = true">{{ width }} <span>宽</span><span class="iconfont icon-edit"></span></div>
      <div class="btn" @click="() => drawer = true">{{ height }} <span>高</span><span class="iconfont icon-edit"></span></div>
    </div>
    <el-drawer
      v-model="drawer"
      title="调整画布尺寸"
    >
      <div class="content">
        <div class="list">
          <div
            class="item"
            v-for="(item, index) in sizeList"
            :key="item.name"
            :class="index === sizeIndex ? 'selected' : ''"
            @click="selectSize(item, index)"
          >
            {{  item.name }} {{ item.width }} px x {{ item.height }}px
          </div>
        </div>
        <div class="form">
          <div class="form-item">宽：<el-input-number v-model="width" controls-position="right" :min="0"></el-input-number></div>
          <div class="form-item">高：<el-input-number v-model="height" controls-position="right" :min="0"></el-input-number></div>
        </div>
        <div class="footer">
          <el-button class="opt-btn" @click="drawerCloseHandler">取消</el-button>
          <el-button class="opt-btn" type="primary" @click="confirmHandler">应用</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import provideData from '@/mixins/provideData.js';
export default {
  mixins: [provideData],
  components: {},
  data () {
    return {
      width: 0,
      height: 0,
      drawer: false,
      sizeList: [
        { name: '正方形', width: 1000, height: 1000 },
        { name: '小红书配图', width: 1242, height: 1660 },
        { name: '商品主图', width: 800, height: 800 },
        { name: '电商详情页面', width: 750, height: 1000 }
      ],
      sizeIndex: 1,
      currentSelect: null
    };
  },
  computed: {
    size () {
      return {
        width: this.canvasEditor?.state?.workState?.width,
        height: this.canvasEditor?.state?.workState?.height
      }
    }
  },
  watch: {
    size: {
      handler() {
        this.width = this.size.width;
        this.height = this.size.height;
      },
      deep: true,
      immediate: true
    },
    drawer () {
      if (this.drawer) {
        this.sizeIndex = this.sizeList.findIndex((item) => item.width === this.width && item.height === this.height);
        this.currentSelect = this.sizeIndex ?? this.sizeList[this.sizeIndex];
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    selectSize (item, index) {
      this.sizeIndex = index;
      this.currentSelect = item;
      this.width = this.currentSelect.width;
      this.height = this.currentSelect.height;
    },
    drawerCloseHandler () {
      this.width = this.size.width;
      this.height = this.size.height;
      this.drawer = false;
    },
    confirmHandler () {
      this.drawer = false;
      this.canvasEditor.state.setWorkStateSize(this.width, this.height);
    }
  }
};
</script>

<style lang="scss" scoped>
.dx {
  .btn {
    width: 48%;
    span{
      margin-left: 20px;
    }
    .iconfont {
      color: $color;
    }
  }
}
.list{
  background-color: #eee;
  padding: 10px 0px;
  .item{
    padding: 0 10px;
    height: 38px;
    line-height: 38px;
    cursor: pointer;
    &.selected{
      background-color: #ccc;
    }
  }
}
.form {
  display: flex;
  margin-top: 10px;
  .form-item{
    display: flex;
    margin-right: 20px;
    .el-input-number{
      width: 138px;
    }
    &:last-child{
      margin-right: 0;
    }
  }
}
.footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  .opt-btn{
    width: 180px;
  }
}
</style>
