<template>
<div class="text-line">
  <div class="line"></div>
  <span>{{ text }}</span>
</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  components: {},
  data () {
    return {};
  },
  created () {},
  mounted () {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.text-line {
  position: relative;
  width: 100%;
  height: 38px;
  .line{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 2px;
    background-color: #eee;
  }
  span{
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 10px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
  }
}
</style>
