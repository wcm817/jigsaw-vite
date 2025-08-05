import { fabric } from 'fabric';
export default class Operate  {
  constructor (canvas) {
    this.canvasInstance = canvas;
  }

  createFabricObj (type, options) {
    let obj;
    const baseOptions = {
      type,
      fill: '#d3e6f599',
      // selectable: true, // 确保可以选中
      // lockScalingX: true, // 允许水平缩放
      // lockScalingY: false, // 允许垂直缩放
      // lockScalingFlip: false, // 允许翻转缩放
      ...options
    };
    switch (type) {
      case 'rect':
        obj = new fabric.Rect({
            ...baseOptions,
            width: 300,
            height: 300,
            name: '矩形',
        });
        break;
      case 'circle':
        obj = new fabric.Circle({
          ...baseOptions,
          radius: 150,
          name: '圆形',
        });
        break;
      case 'triangle':
        obj = new fabric.Triangle({
          ...baseOptions,
          width: 300, // 底边长度
          height: 200, // 底边到对角的距离
          name: '三角形'
        });
      default:
        break;
    }
    return obj;
  }

  addBaseType (type) {
    this.canvasInstance.on('drop', (opt) => {
        // 画布元素距离浏览器左上距离
        let offset = {
            left: this.canvasInstance.getSelectionElement().getBoundingClientRect().left,
            top: this.canvasInstance.getSelectionElement().getBoundingClientRect().top,
        }
        // 鼠标坐标转成画布坐标
        let point = {
            x: opt.e.x - offset.left,
            y: opt.e.y - offset.top
        }
        //  restorePointerVpt不受视窗变化的影响（缩小放大...）
        let pointerVpt = this.canvasInstance.restorePointerVpt(point);
        const obj = this.createFabricObj(type, { left: pointerVpt.x, top: pointerVpt.y });
        if (!obj) return;
        this.canvasInstance.add(obj);
        this.canvasInstance.setActiveObject(obj);
        this.canvasInstance.renderAll();
        this.canvasInstance.off('drop');
    });
  }

}