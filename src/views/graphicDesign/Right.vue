<template>
  <div class="right" :class="showContent ? 'show-content' : ''">
    <div class="content" v-show="showContent">
      <template v-if="!selectMode">
        <div class="type-tile">背景设置</div>
        <screen-size></screen-size>
        <screen-image></screen-image>
        <bg-color></bg-color>
      </template>
      <template v-if="selectMode === 'one'">
        <div class="type-tile">元素设置</div>
        <bg-color></bg-color>
        <bound></bound>
        <border></border>
      </template>
    </div>
    <div class="arrow left-btn" :class="showContent ? 'left-btn-open' : ''" @click="() => showContent = !showContent"></div>
  </div>
</template>

<script>
import ScreenSize from './right/ScreenSize.vue';
import ScreenImage from './right/ScrrenImage.vue'
import BgColor from './right/BgColor.vue';
import Bound from './right/Bound.vue';
import Border from './right/Border.vue';
import canvasEditor from '@/mixins/canvasEditor.js';
export default {
  mixins: [canvasEditor],
  components: {
    ScreenSize,
    ScreenImage,
    BgColor,
    Bound,
    Border
  },
  data () {
    return {
      showContent: true,
      selectMode: '',
      selectType: '',
    };
  },
  computed: {
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.canvasEditor.on('select-one', ({ actives }) => {
        this.selectMode = 'one';
        this.selectType = actives[0].type;
      });
      this.canvasEditor.on('select-multiple', ({ actives }) => {
        this.selectMode = 'multiple';
        this.selectType = '';
      });
      this.canvasEditor.on('select-cancel', () => {
        this.selectMode = '';
        this.selectType = '';
      });
    });
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.right{
    position: relative;
    height: 100%;
    width: 0px;
    background-color: #f6f6f6;
    flex-shrink: 0;
    &.show-content{
        width: 335px;
    }
    .arrow{
        width: 20px;
        height: 64px;
        cursor: pointer;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        position: absolute;
        left: -20px;
        z-index: 1;
        top: 50%;
        margin-top: -10px;
        &.left-btn {
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAACACAYAAAB5sSvuAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAgAAAAAAobJzlAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAADf0lEQVR4Ae2cvYsTQRjGE7FQkICFB1pZRyzEJkUKmzOpBEHwX9DCQkmChf4JahewsLpWFOQUzwMRPEgEy0PLpPADvEISDrVyfZ6cK0tIZrI7u7MPMi+8mb35uPnlmXczyeXmrURRdKyibAB8Dz8pywg42if4OUnIGd7Bww8Ut+GHpEATgPEll/y8DGRMtaB8hrryl30B2HzVW1Rcgx8vQ9UqaVac+Cf67cC34C+q1erHFcc5dUsDOD/RGBWv4M/hrwG8jzJ3cwFMwlDdd/BN+BZgd5ONLtd5Ac4zfEYFld0ALMMisxUFmAQa44dHdMB+TTasdM2bxJNxI7gDP7ISWNzJE1xymhF+uBzPbyvL2NZOA+oJIO/BrfP7iEGTSNtovIrY/L6sU9mA5PoAby6DtEq87JnlWF/H7+K+v/DmUQDkc23CNxbFpAogIa/Ab/IiaQoxmOThlnkG8TiKK5UUJNNR+MMYjqUaIJnWEYuXeEFTBCTXv1hUi0HCxXYWsbirqiAhb/BBWcE9KLimDEgB68pLTMAL6oBNdcBT6oBr6oAn1O9i2a2Od/DM1Jc4KBivVOYyLHFm6f4ODAoGBV0VcB0fYjAo6KqA6/gQg0FBVwVcx4cYDAq6KuA6/v+Mwel0Wmm325XhcOgqkH08/h6cyiaTSdRoNPhvBFGtVosGg0Gq8Wk7V9IO6Pf7MzgC+oBMDcgn1Ov1vEFmAvQJmRmQkN1ut3AlnQB9QDoDErLT6RSmZC6ARULmBlgUpPxWl5uCRcVhLoBFwTFsnAGLfi10AiwazklBX/txJgV9wWVSUP7tlvwbVspOyFarVfi7ac4Vvquzfyoy95DfiwOgeQHtrUFBu0bmHkFBsz721qCgXSNzj6CgWR97a1DQrpG5R1DQrI+9NSho18jcIyho1sfauqeuoDzgN3UFv6gD7qh/cK8rA84OGygv8VO+CCkrKH3g5Q1P41BB1SV+QDia4hJvQ72LB3h6gPIH/+5CvVGsntoSPwYQzxr/VgRkJoF1wP1KwvFa4SaRPgDNI+RLT2dTwTJfB+9j/jaWden5dgIe5oNnG2O+WwCb7bXWuflliSfLlAjCh4JULHMqjaIAc0tGkhdgnM6FyXI2EV+5pXNxAeTSMSHOSzg3+H2UuVsaQKq0A/eaUmiVb9yZlOk6vJSkTCZA2bRWsonBpFOrySan+wNoJmOM0LyBGwAAAABJRU5ErkJggg==);
          transform: rotateY(180deg);
        }

        &.left-btn-open {
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAACACAMAAABOb9vcAAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAADHx8cODg50dHTx8fF2dnZ1dXWWlpZHR0c4ODhQpkZ5AAAAIXRSTlMA9t+/upkRAnPq5NXDfDEsKQjMeGlRThkMsquljTwzIWhBHpjgAAABJElEQVRYw+3YyW7CQBCEYbxig8ELGJyQkJRJyPb+75dj3zy/lD7kMH3+ZEuzSFO1mlZwhjOE2uwhVHJYMygNVwilhz2EUvNaMigledUFoE1anKYAtA9nVRuANpviOQBt0t2ZQSnZ9QxK6Qih9LSGUHkJobYlhGp6CPW4hlAVhckLhMop1InCjEK1FBYU1hSqo/BI4YXCjMIthTWFijDCCB3g7fuO4O1t/rkvQXPz/LUIzX0oAM0tQHOfCkBzC9DcuwLQXACao9Dv1yb9lsek2xaaxMcMH1x6Ff79dY0wwgj/DGv3p2tG4cX9wd55h4rCO/hk3uEs9w6QlXPIbXrfIJ6XrmVBOtJCA1YkXqVLkh1aUgyNk1fV1BxLxzpsuNLKzrME/AWr0ywwvyj83AAAAABJRU5ErkJggg==);
        }
    }
    .type-tile{
      position: relative;
      z-index: 1;
      background-color: #fff;
      height: 38px;
      line-height: 37px;
      border-bottom: 1px solid #e2e2e2;
      box-sizing: border-box;
      font-weight: 600;
      padding: 0 16px;
      box-shadow: 0px 1px 10px 1px rgba(0,0,0,0.06);
    }
    ::v-deep(.attr-item-box){
      background-color: #fff;
      padding: 16px;
      margin-bottom: 10px;
      .title {
        padding-bottom: 14px;
      }
      .row{
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        .item-1{
          width: 100%;
          display: flex;
        }
        .item-2{
          display: flex;
          width: calc(50% - 5px);
          margin-right: 5px;
          &:last-child{
            margin-right: 0;
          }
          .value{
            flex: 1;
          }
        }
        .label {
          flex-shrink: 0;
          margin-right: 4px;
        }
        .el-select{
          flex: 1;
        }
      }
      
    }
}
</style>
  