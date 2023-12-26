<template>
  <div class="home">
    <div class="content">
      <div class="pic-config">
        <div class="row">
          <div class="select-btn">
            <el-button type="primary">选择图片</el-button>
            <input type="file" multiple @change="handleSelectPics" />
          </div>
          <el-button class="export-btn" @click="hanlderExportPic"
            >导出图片</el-button
          >
        </div>
        <div class="row">
          <div class="item">
            <span class="label">水印:</span>
            <el-input v-model="waterMark" placeholder="请输入水印内容" />
          </div>
        </div>
        <div class="row">
          <div class="item">
            <span class="label">类型:</span>
            <el-select
              v-model="type"
              class="m-2 select-type"
              placeholder="选择拼图类型"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="item" v-if="!isMobile()">
            <span class="label">大小:</span>
            宽
            <el-input class="w" v-model="jissawWidth" />
            高
            <el-input class="w" v-model="jissawHeight" />
          </div>
        </div>
        <div class="row">
          <div class="item">
            <span class="label">间隙:</span>
            宽
            <el-input class="w" v-model="splitW" />
            颜色
            <input class="w" type="color" v-model="splitColor" />
          </div>
        </div>
      </div>
      <div class="pics-layout">
        <div class="water-mask">{{ waterMark }}</div>
        <draggable :list="imgList" class="pics" ref="canvas" :style="picsStyle">
          <template #item="{ element }">
            <div
              class="img-box"
              :style="{
                width: `${imgBoxRect.width}px`,
                height: `${imgBoxRect.height}px`
              }"
            >
              <img v-if="element.src" :src="element.src" alt="" />
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>

import Draggable from 'vuedraggable';
import html2canvas from 'html2canvas';
import { isMediaMobile } from '@/utils/index.js';

export default {
  name: 'Home',
  components: {
    Draggable
  },
  data () {
    return {
      jissawWidth: 900,
      jissawHeight: 900,
      isWM: true,
      waterMark: '',
      splitW: 10,
      splitColor: '#EEEEEE',
      type: 9, // 9宫格，
      typeList: [
        {
          value: 4,
          label: '四宫格',
          splits: [2, 2], // [行，列]
        },
        {
          value: 6,
          label: '六宫格',
          splits: [2, 3],
        },
        {
          value: 9,
          label: '九宫格',
          splits: [3, 3],
        },
        {
          value: 16,
          label: '十六宫格',
          splits: [4, 4],
        }
      ],
      imgList: [],
      fileList: []
    }
  },
  watch: {
    type: {
      handler (val) {
        this.fileList = [];
        this.imgList = [...Array(val).keys()].map((item, i) => ({ id: i, src: '' }));
      },
      immediate: true
    },
    fileList: {
      handler (val) {
        val.forEach((file, i) => {
          let fr = new FileReader();
          fr.readAsDataURL(file);
          fr.onloadend = () => {
            this.imgList[i].src = fr.result;
          }
        });
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    imgBoxRect () {
      const splitNums = this.typeList.find(item => item.value === this.type).splits;
      return {
        width: (this.jissawWidth - this.splitW * (splitNums[0] - 1)) / splitNums[0],
        height: (this.jissawHeight - this.splitW * (splitNums[1] - 1)) / splitNums[1]
      }
    },
    picsStyle () {
      return {
        width: `${this.jissawWidth}px`,
        height: `${this.jissawHeight}px`,
        backgroundColor: this.splitColor
      }
    }
  },
  mounted () {
    if (this.isMobile()) {
      this.jissawWidth = window.screen.width;
      this.jissawHeight = window.screen.width;
      this.splitW = 4;
    }
  },
  methods: {
    handleSelectPics (e) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        this.fileList.push(files[i]);
      }
    },
    hanlderExportPic () {
      html2canvas(this.$refs.canvas.$el).then((canvas) => {
        const imgBlob = this.canvasToPng(canvas);
        let fileName = Date.now();
        // 下载
        let aLink = document.createElement('a');
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true);
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(imgBlob);
        aLink.click();
      })
    },
    // canvas 图层转成 png图片资源
    canvasToPng (canvas) {
      // canvas图层 转成图片资源
      const dataUrl = canvas.toDataURL('image/jpeg', 1.0);
      const path = dataUrl.replace('data:image/jpeg;base64,', '');

      let imageType = 'png';  // 格式

      let raw = window.atob(path);
      let uInt8Array = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      let blob = new Blob([uInt8Array], { type: 'image/' + imageType });
      return blob;
    },
    isMobile: isMediaMobile
  }
}
</script>


<style lang="scss">
@media screen and (max-width: 750px) {
  html,
  body {
    width: 100vw;
    height: 100vh;
  }
  .row {
    display: flex;
    margin-bottom: 0.32rem;
  }
  .home {
    height: 100vh;
    background: #ecf5ff;
    font-size: 0.37rem;
    padding-top: 0.53rem;
    box-sizing: border-box;
    color: #333;
    :deep(.el-input__inner) {
      color: #666;
    }
    .content {
      .pic-config {
        padding: 0 0.53rem;
        .item {
          display: flex;
          align-items: center;
          margin-right: 0.53rem;
          color: #666;
          .label {
            margin-right: 0.27rem;
            color: #333;
            white-space: nowrap;
          }
          .w {
            width: 1.6rem;
            margin: 0 0.21rem;

            :deep(.el-input__inner) {
              text-align: center;
            }
          }
          .select-type {
            width: 2.67rem;
            color: #333;
          }
        }
      }
      .select-btn {
        width: 2.35rem;
        height: 0.85rem;
        position: relative;
        margin-right: 0.53rem;

        button {
          width: 100%;
        }
        input {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
        }
      }
      .export-btn {
        background-color: #ecf5ff;
        color: #409eff;
        border-color: #409eff;
      }
      .pics-layout {
        position: relative;
        display: inline-block;
        overflow: hidden;
        .water-mask {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
          color: rgba(143, 142, 142, 0.1);
        }
        .pics {
          display: flex;
          justify-content: space-between;
          align-content: space-between;
          flex-wrap: wrap;
          box-sizing: border-box;
          .img-box {
            background-color: #fff;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@media screen and (min-width: 751px) {
  .row {
    display: flex;
    margin-bottom: 12px;
  }
  .home {
    max-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    background: #ecf5ff;
    box-sizing: border-box;
    padding-top: 40px;
    color: #333;
    :deep(.el-input__inner) {
      color: #666;
    }
    .content {
      .pic-config {
        .item {
          display: flex;
          align-items: center;
          margin-right: 20px;
          color: #666;
          .label {
            margin-right: 10px;
            color: #333;
            white-space: nowrap;
          }
          .w {
            width: 60px;
            margin: 0 8px;

            :deep(.el-input__inner) {
              text-align: center;
            }
          }
          .select-type {
            width: 100px;
            color: #333;
          }
        }
      }
      .select-btn {
        width: 88px;
        height: 32px;
        position: relative;
        margin-right: 20px;
        button {
          width: 100%;
        }
        input {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
        }
      }
      .export-btn {
        background-color: #ecf5ff;
        color: #409eff;
        border-color: #409eff;
      }
      .pics-layout {
        position: relative;
        display: inline-block;
        overflow: hidden;
        .water-mask {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
          color: rgba(143, 142, 142, 0.1);
        }
        .pics {
          display: flex;
          justify-content: space-between;
          align-content: space-between;
          flex-wrap: wrap;
          box-sizing: border-box;
          .img-box {
            background-color: #fff;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>