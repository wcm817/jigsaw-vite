<template>
  <div class="attr-item-box">
    <div class="title">画布背景</div>
    <div class="dx justify-c-sb">
      <!-- <div class="btn">上传图片</div> -->
      <el-upload
        action="#"
        :multiple="false"
        :show-file-list="false"
        :limit="1"
        accept=".jpg,.png"
        :before-upload="onProgress"
      >
        <el-button type="primary" style="width: 145px;">上传</el-button>
      </el-upload>
      <div class="btn" @click="gotoBgStore">背景库</div>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/eventBus';
import canvasEditor from '@/mixins/canvasEditor';
export default {
  mixins: [canvasEditor],
  components: {},
  data () {
    return {};
  },
  created () {},
  mounted () {},
  methods: {
    gotoBgStore () {
      emitter.emit('set-bg-menu');
    },
    onProgress (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Img = reader.result;
        this.canvasEditor.state.setBackgroudImage(base64Img);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .dx {
    .btn{
      width: 48%;
    }
  }
</style>
