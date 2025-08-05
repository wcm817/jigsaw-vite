import WorkState from "./workState";
import Operate from "./operate";
import Event from './event';

export default class Editor {
    constructor (canvas) { 
        this.state = new WorkState(canvas);
        this.operate = new Operate(canvas);
        this.event = new Event(canvas);
        this.canvasInstance = canvas;
    }
    //  初始化
    init (workStateOption) {
        this.state.initWorkState(workStateOption);
    }

    on (event, listener) { this.event.on(event, listener); }

    off (event, listener) { this.event.off(event, listener); }

    setActiveObjectColor (color) {
        const activeObject = this.canvasInstance.getActiveObject();
        const selectObjects = this.canvasInstance.getActiveObjects();
        if (!activeObject) {
            this.state.removeBackgroundImage();
            this.state.workState.set('fill', color);;
        } else if (selectObjects.length === 1) {
            activeObject.set('fill', color);
        } else {
            selectObjects.forEach((item) => {item.set('fill', color);});
        }
        this.canvasInstance.requestRenderAll();
    }
    
    clear () {
        this.canvasInstance.getObjects().forEach(obj => {
            if (obj.id !== 'stateRect') {
                this.canvasInstance.remove(obj);
            }
            this.state.setBackgroudColor('#fff');
        });
        this.state.destroyWorkState();
        this.canvasInstance.off();
    }
}