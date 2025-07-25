import { fabric } from 'fabric';
import Base from "./base";
export default class WorkState extends Base {
    constructor (props) {
        super (props);
        this.lastPosX = null;
        this.lastPosY = null;
        this.isDraging = false; // 移动标志
        this.stateOption = {
          width: 900,
          height: 1200
        };
    }
    // 初始化工作舞台
    initWorkState (workStateOption) {
      workStateOption && (this.stateOption = workStateOption);
      const workspaceEl = document.querySelector('#workspace');
      if (!workspaceEl) {
          throw new Error('element #workspace is missing, plz check!');
      }
      this.workspaceEl = workspaceEl;
      // 创建画布舞台，用于设置画布背景色，这个图形非活动图形
      const workState = new fabric.Rect({
          width: this.stateOption.width,
          height: this.stateOption.height,
          fill: 'rgba(255, 255, 255, 1)',
          strokeWidth: 0,
          id: 'stateRect',
          selectable: false,
          hasControls: false,
          hoverCursor: 'default',
          evented: false,
          death: true // 随便声明个变量，表示该图形为非活动图形
      });
      this.canvasInstance.add(workState);
      this.canvasInstance.requestRenderAll();
      this.workState = workState;
      this._setZoomAuto();
      this._bindWheel(this.canvasInstance);
      this._bindMove(this.canvasInstance);
    }

    // 自动缩放
    _setZoomAuto () {
        const scale = fabric.util.findScaleToFit(this.workState, {
            width: this.workspaceEl.offsetWidth,
            height: this.workspaceEl.offsetHeight,
        });
        const width = this.workspaceEl.offsetWidth;
        const height = this.workspaceEl.offsetHeight;
        this.canvasInstance.setWidth(width);
        this.canvasInstance.setHeight(height);
        const center = this.canvasInstance.getCenter();
        this.canvasInstance.setViewportTransform(fabric.iMatrix.concat());
        this.canvasInstance.zoomToPoint(new fabric.Point(center.left, center.top), scale * this.zoomRadio);
        this._setCenterFromObject(this.workState, this.canvasInstance);
    }

    // 设置画布中心到指定对象中心点上
    _setCenterFromObject(fabricObj, canvas) {
        const objCenter = fabricObj.getCenterPoint();
        const viewportTransform = canvas.viewportTransform;
        if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) return;
        viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0];
        viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3];
    }
    // 监听画布的鼠标滚动事件
    _bindWheel (canvas) {
        canvas.on('mouse:wheel', (opt) => {
          const point = canvas.getPointer(opt.e, true); // 获取鼠标的位置， 以鼠标点位置为中心放大画布
          const delta = opt.e.deltaY;
          let zoom = canvas.getZoom();
          zoom *= 0.999 ** delta
          if (zoom > 10) zoom = 10 // 限制最大缩放级别
          if (zoom < 0.01) zoom = 0.01 // 限制最小缩放级别
          canvas.zoomToPoint(point, zoom);
          opt.e.preventDefault();
          opt.e.stopPropagation();
        })
    }
    
    _bindMove (canvas) {
        canvas.on('mouse:down', (opt) => {
          if (opt.e.altKey === true) {
            this.lastPosX = opt.e.clientX;
            this.lastPosY = opt.e.clientY;
            this.isDraging = true; // 开启移动状态
          }
        });
  
        canvas.on('mouse:move', (opt) => {
          if (this.isDraging) {
            // 在移动状态下才能进行移动
            const vpt = canvas.viewportTransform;
            vpt[4] += opt.e.clientX - this.lastPosX;
            vpt[5] += opt.e.clientY - this.lastPosY;
            canvas.requestRenderAll(); // 重新渲染画布
            this.lastPosX = opt.e.clientX;
            this.lastPosY = opt.e.clientY;
          }
        });
  
        canvas.on('mouse:up', (opt) => {
          this.isDraging = false;
        })
    }
    
    // 放大
    big() {
        let zoomRatio = this.canvasInstance.getZoom();
        zoomRatio += 0.05;
        const center = this.canvasInstance.getCenter();
        this.canvasInstance.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
    }
    // 缩小
    small() {
        let zoomRatio = this.canvasInstance.getZoom();
        zoomRatio -= 0.05;
        const center = this.canvasInstance.getCenter();
        this.canvasInstance.zoomToPoint(
            new fabric.Point(center.left, center.top),
            zoomRatio < 0 ? 0.01 : zoomRatio
        );
    }

    // 修改大小
    setWorkStateSize(width, height) {
      this.stateOption.width = width;
      this.stateOption.height = height;
      this.workState.set('width', width);
      this.workState.set('height', height);
      this._setZoomAuto();
    }

    // 获取背景图片对象
    getWorkBgImage() {
      return this.canvasInstance.getObjects().find((item) => item.id === 'workBackgroungImage');
    }

    // 设置舞台背景色
    setBackgroudColor (color) {
      this.workState.set('fill', color);
    }

    // 设置舞台背景图片
    setBackgroudImage (imgUrl) {
      const bgImage = this.getWorkBgImage();
      if (!bgImage) {
        this.canvasInstance.remove(bgImage);
      }
      fabric.Image.fromURL(imgUrl, (img) => {
        const { width, height } = this.workState;
        let scale = 1;
        if (width > img.width || height > img.height) {
          scale = (width / img.width) > (height / img.height) ? (width / img.width) : (height / img.height);
        }
        // 居中处理
        const bgHeight = img.height * scale;
        const bgWidth = img.width * scale;
        const bgLeft = width / 2 - bgWidth / 2;
        const bgTop = height / 2 - bgHeight / 2;
        img.set({
          left: bgLeft,
          top: bgTop,
          scaleX: scale,
          scaleY: scale,
          hasControls: false,
          hasBorders: false,
          selectable: false,
          lockMovementX: true,
          lockMovementY: true,
          hoverCursor: 'default',
          name: '舞台背景图片',
          id: 'workBackgroungImage'
        });
        this.canvasInstance.add(img);
        this.canvasInstance.sendToBack(img);
        this.canvasInstance.bringForward(img);
        this.canvasInstance.requestRenderAll();
      });
    }

    // 删除舞台背景图片
    removeBackgroundImage () {
      const bgImage = this.getWorkBgImage();
      if (bgImage) {
        this.canvasInstance.remove(bgImage);
      }
    }
}