import { throttle } from '@/utils/index.js';
export default class Event {
  constructor (canvas) {
    this._init(canvas);
    this.events = {};
    this.selectMode = '';
  }

  _init (canvas) {
    canvas.on('selection:created', (e) => {
      this._emitSelectEvent(canvas, e);
    });
    canvas.on('selection:updated', (e) => {
      this._emitSelectEvent(canvas, e);
    });
    canvas.on('selection:cleared',(e) => {
      this._emitSelectEvent(canvas, e);
    });
  }

  _emitSelectEvent (canvas, e) {
    if (!canvas) return;
    const actives = canvas.getActiveObjects();
    if (actives && actives.length === 1) {
      this.selectMode = 'one';
      this._emit('select-one', { ...e, actives });
    } else if (actives && actives.length > 1) {
      this.selectMode = 'multiple';
      this._emit('select-multiple', { ...e, actives });
    } else {
      this.selectMode = '';
      this._emit('select-cancel', { ...e });
    }
  }

  _emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
  
  on (event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    } 
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (this.events[event]) {
        this.events[event] = this.events[event].filter(l => l !== listener);
    }
  }

}