export default {
  inject: {
    provideData: {
      from: 'provideData',
      default: () => {}
    },
  },
  data () {
    return {
      fabric: this.provideData().fabric
    }
  },
  computed: {
    actProvideData () {
      return this.provideData();
    },
    canvasEditor () {
      return this.actProvideData.canvasEditor;
    },
  },
}