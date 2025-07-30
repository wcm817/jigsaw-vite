export default {
  inject: {
    provideData: {
      from: 'provideData',
      default: () => {}
    },
  },
  computed: {
    actProvideData () {
      return this.provideData();
    },
    canvasEditor () {
      return this.actProvideData.canvasEditor;
    }
  },
}