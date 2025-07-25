import WorkState from './workState';
export class Editor extends WorkState{
    constructor (props) {
        super(props);
    }
    //  初始化
    init (canvas, workStateOption) {
        this.canvasInstance = canvas;
        this.initWorkState(workStateOption);
    }

    
    clear () {
        this.canvasInstance.getObjects().forEach(obj => {
            if (obj.id !== 'stateRect') {
                this.canvasInstance.remove(obj);
            }
            this.setBackgroudColor('#fff');
        });
    }
}