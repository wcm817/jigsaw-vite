import { isMediaMobile } from './index.js';
let html = document.documentElement;
let body = document.body;

const calc = () => {
  if (isMediaMobile()) {
    let width = html.clientWidth || body.clientWidth || window.screen.width || window.innerWidth;
    if (width > 750) {
      width = 750;
    }
    html.style.fontSize = width / 10 + 'px';
  } else {
    html.style = '';
  }
};

calc();

window.addEventListener('resize', calc, false);
document.addEventListener('DOMContentLoaded', calc, false);
