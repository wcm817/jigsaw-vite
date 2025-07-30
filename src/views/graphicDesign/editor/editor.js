import Operate from "./operate";
import WorkState from "./workState";

export default class Editor{
    constructor (canvas) { 
        this.state = new WorkState(canvas);
        this.operate = new Operate(canvas);
    }
    //  初始化
    init (canvas, workStateOption) {
        this.canvasInstance = canvas;
        this.state.initWorkState(canvas, workStateOption);
    }

    clear () {
        this.canvasInstance.getObjects().forEach(obj => {
            if (obj.id !== 'stateRect') {
                this.canvasInstance.remove(obj);
            }
            this.state.setBackgroudColor('#fff');
        });
        this.state.destroyWorkState();
    }
}