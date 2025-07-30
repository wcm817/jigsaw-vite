export const isMobile = function () {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  return flag;
};

export const isMediaMobile = () => {
  let flag = false;
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    flag = true;
  }
  flag = document.body.clientWidth < 750;
  return flag;
};

//  节流函数
export const throttle = (func, wait) => {
  let timer = null;
  let previous = 0; // 上一次执行函数的时间
  return function (...args) {
    const now = Date.now();
    const stepTimes =  wait - (now - previous);
    clearTimeout(timer);
    if (stepTimes <=0) {
      previous = now;
      func.apply(this, args);
    } else {
      timer = setTimeout(() => {
        previous = Date.now();
        func.apply(this, args);
      }, stepTimes);
    }
  }
}