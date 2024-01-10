<template>
  <div class="shuiyin">
    <div class="pic-config">
      <div class="row first-row">
        <div class="select-btn">
          <el-button type="primary">选择图片</el-button>
          <input type="file" multiple @change="handleSelectPics" />
        </div>
        <el-button class="export-btn" @click="hanlderExportZip">导出</el-button>
      </div>
      <div class="row">
        <div class="item">
          <span class="label">水印:</span>
          <el-input v-model="waterMark" placeholder="请输入水印内容" />
          <div class="tips">(注: 内容换行用斜杠【/】隔开)</div>
        </div>
      </div>
      <div class="row">
        <div class="item">
          <span class="label">字体大小:</span>
          <el-input class="w" v-model="waterMarkObj.fontSize"></el-input>
        </div>
        <div class="item">
          <span class="label">水印密度:</span>
          <el-input class="w" v-model="waterMarkObj.density"></el-input>
        </div>
      </div>
      <div class="row">
        <div class="item">
          <span class="label">字体颜色:</span>
          <input class="w" type="color" v-model="waterMarkObj.fontcolor" />
        </div>
        <div class="item">
          <span class="label">透明度(0-1):</span>
          <el-input class="w" v-model="waterMarkObj.opacity"></el-input>
        </div>
      </div>
    </div>
    <div class="img-list-tile">图片列表墙({{ imgList.length }}张)</div>
    <div class="img-list">
      <div class="no-img" v-if="!imgList.length">暂无图片</div>
      <img
        v-for="(item, index) in imgList"
        :key="index"
        :src="item.url"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import JSZip from 'jszip';

export default {
  name: 'Jigsaw',
  components: {
  },
  data () {
    return {
      waterMark: '正品潮玩盲盒现货店',
      waterMarkObj: {
        canvas: null, //canvas  [必传]
        textArray: [], // /水印文字 数组类型  最大三行  [必传]
        fontFamily: "fangsong", // 默认 microsoft yahei
        fontSize: 14, //字体大小
        fontcolor: "#FFFFFF", //字体颜色 
        rotate: 30, //旋转角度   数字类型
        textAlign: "center", //水印文字居中方式:left center right 
        density: 2.0, // 稠密度,
        opacity: 0.5
      },
      imgList: [],
      fileList: [],
      zip: new JSZip()
    }
  },
  watch: {
    waterMark: {
      handler (val) {
        this.waterMarkObj.textArray = val.split('/');
      },
      immediate: true
    },
    fileList: {
      handler (val) {
        this.imgList = [];
        val.forEach((file, i) => {
          let fr = new FileReader();
          fr.readAsDataURL(file);
          fr.onloadend = () => {
            this.imgList.push({ url: fr.result });
          }
        });
      },
      immediate: true,
      deep: true
    },
    imgList: {
      handler (imgList) {
        imgList.forEach((item, i) => {
          this.dataURLtoImage(item.url)
            .then((img) => {
              // 1. 图片转canvas
              const canvas = this.imgToCanvas(img);
              // 2. canvas加水印
              this.drawWaterMark({ ...this.waterMarkObj, canvas })
              // 3. canvas转blob
              this.canvasResizetoFile(canvas, 1, (blob) => {
                this.zip.folder('images').file(`image${i}.png`, blob, { binary: true });
              });
            })
        })
      },
      deep: true
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    // 选择图片
    handleSelectPics (e) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        this.fileList.push(files[i]);
      }
    },
    //导入图片压缩包
    hanlderExportZip () {
      this.zip.generateAsync({ type: "blob" })
        .then((zipBlob) => {
          let aLink = document.createElement('a');
          let evt = document.createEvent('HTMLEvents');
          evt.initEvent('click', true, true);
          aLink.download = 'images压缩包.zip';
          aLink.href = window.URL.createObjectURL(zipBlob);
          aLink.click();
        });
    },
    // dataURL 字符串转变为 Image 类型文件
    dataURLtoImage (dataUrl) {
      // var img = new Image();
      // img.onload = function () {
      //   fn(img);
      // };
      // img.src = dataUrl;
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.onload = function () {
          resolve(img);
        };
        img.src = dataUrl;
      })
    },
    // 图片转成canvas
    imgToCanvas (img) {
      // 创建canvas DOM元素，并设置其宽高和图片一样
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      // 坐标(0,0) 表示从此处开始绘制，相当于偏移。
      canvas.getContext("2d").drawImage(img, 0, 0);
      return canvas;
    },
    //  Canvas 对象压缩转变为一个 Blob 类型对象
    canvasResizetoFile (canvas, quality, fn) {
      // quality 参数传入一个0-1的 number 类型，表示图片压缩质量
      canvas.toBlob(function (blob) {
        fn(blob);
      }, 'image/jpeg', quality);
    },
    // 画布添加水印
    drawWaterMark ({
      canvas,
      textArray,
      fontFamily = "microsoft yahei",
      fontSize,
      fontcolor = "#dadbdc",
      rotate = 30,
      textAlign = "left",
      density = 2.0,
      opacity
    }) {
      const ctx = canvas.getContext("2d");
      let imgWidth = canvas.width;
      let imgHeight = canvas.height;
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.lineWidth = 1;
      ctx.fillStyle = fontcolor;
      ctx.textAlign = textAlign;
      ctx.textBaseline = "middle";
      ctx.globalAlpha = opacity;
      // //文字坐标
      const maxPx = Math.max(imgWidth, imgHeight);
      const stepPx = Math.floor(maxPx / Number(density));
      let arrayX = [0]; //初始水印位置 canvas坐标 0 0 点
      while (arrayX[arrayX.length - 1] < maxPx / 2) {
        arrayX.push(arrayX[arrayX.length - 1] + stepPx);
      }
      arrayX.push(
        ...arrayX.slice(1, arrayX.length).map((el) => {
          return -el;
        })
      );
      console.log('111', textArray);
      for (let i = 0; i < arrayX.length; i++) {
        for (let j = 0; j < arrayX.length; j++) {
          ctx.save();
          ctx.translate(imgWidth / 2, imgHeight / 2); ///画布旋转原点 移到 图片中心
          // ctx.rotate(-Math.PI / 5);
          ctx.rotate((Math.PI / 120) * -rotate);
          if (textArray.length > 3) {
            //最多显示三行水印，也可以根据需要自定义
            textArray = textArray.slice(0, 3);
          }
          textArray.forEach((el, index) => {
            let offsetY = fontSize * index + 2;
            ctx.fillText(el, arrayX[i], arrayX[j] + offsetY);
          });
          ctx.restore();
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  margin-bottom: 12px;
}
.first-row {
  justify-content: space-between;
}

.shuiyin {
  max-width: 100vw;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  color: #333;
  :deep(.el-input__inner) {
    color: #666;
  }
  .pic-config {
    background-color: #fefefe;
    padding: 10px;
    padding-bottom: 0;
    margin-bottom: 20px;
    border-radius: 4px;
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
      .tips {
        white-space: nowrap;
        padding-left: 10px;
        font-size: 12px;
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
  .img-list-tile {
    width: 100%;
    line-height: 32px;
    font-size: 16px;
    font-weight: 600;
    background-color: #fefefe;
    text-align: center;
    border-radius: 4px;
  }
  .img-list {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border: 2px dashed #fefefe;
    padding: 10px;
    box-sizing: border-box;
    .no-img {
      width: 100%;
      text-align: center;
    }
  }
}
</style>