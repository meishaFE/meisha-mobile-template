import { regRemoveCode } from './reg';
import router from '@/router';
/**
 * 获取设备类型
 */
const wxWorkMatch = window.navigator.userAgent.toLowerCase().match(new RegExp('wxwork\\/(\\d+\\.\\d+)\\.(\\d+)'));

/*
 * 获取终端类型
 */
export const getClientType = () => {
  let str = '';
  let ua = navigator.userAgent.toLowerCase();
  if (!wxWorkMatch && ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
    str = 'wechat';
  } else if (/iphone|ipad|ipod/.test(ua) || /android|symbianos|windows phone/.test(ua)) {
    str = 'mobile';
  } else {
    str = 'pc';
  };
  return str;
};

export const isAndroidOrIOS = () => {
  let ua = navigator.userAgent.toLowerCase();
  let str = 'android';
  if (/iphone|ipad|ipod/.test(ua)) {
    str = 'IOS';
  };
  return str;
};

// 浮点数乘法
export const accMul = (arg1, arg2) => {
  let m = 0;
  let s1 = arg1.toString();
  let s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
  };
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
  };
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
};

// 浮点数加减法
export const accAdd = (arg1, arg2) => {
  let [r1, r2, m] = [];
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
};

// 浮点数除法
export const accDiv = (arg1, arg2) => {
  let [t1, t2, r1, r2] = [0, 0];
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) { };
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) { };
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
};

/*
  函数节流
  @fn: 需要进行函数节流的函数
  @delay: 函数执行的时间间隔，单位是毫秒
  @mustRunDelay :多于这个时间必须执行
  使用场景： 监听滚动，屏幕resize
 */
export const throttle = (fn, delay, mustRunDelay) => {
  let timer = null;
  let tStart;
  return function () {
    let context = this;
    let args = arguments;
    let tCurr = +new Date();
    clearTimeout(timer);
    if (!tStart) {
      tStart = tCurr;
    };
    if (tCurr - tStart >= mustRunDelay) {
      fn.apply(context, args);
      tStart = tCurr;
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  };
};

/*
  函数防抖
  @func：需要进行函数防抖的函数
  @wait： 需要等待的时间，单位为毫秒
  @immediate：immediate参数如果为true，则debounce函数会在调用时立刻执行一次function，而不需要等到wait这个时间后
  应用场景：防止点击按钮多次点击，监听键盘按下时间的异步查询
 */
export const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result;

  let later = function () {
    let last = new Date().getTime() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    let callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};

/**
 * 获取url参数值
 * @param {String} name
 * @returns {null}
 */
export const getUrlParam = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

/* 微信获取code,不同系统需修改appid和授权地址 */
export const getWechatCode = (appId) => {
  let href = window.location.href.split('#')[0];
  let localUrl = encodeURIComponent(href);
  let target = `${CONFIG.OPEN_WECHAT_ADDRESS}?localUrl=${localUrl}`;
  let REDIRECT_URI = encodeURI(target);
  let weixinUrl = `${CONFIG.WECHAT_AUTH}?appid=${appId}&redirect_uri=${REDIRECT_URI}
  &response_type=code&scope=snsapi_userinfo&state=fromHere&component_appid=wxd9e96d45d68ffc75#wechat_redirect`;
  let tryNum = window.sessionStorage.getItem('tryNum') || 0;
  if (tryNum <= CONFIG.WECHAT_TRY_NUM) { // 控制授权次数
    ++tryNum;
    window.sessionStorage.setItem('tryNum', tryNum);
    window.location.replace(weixinUrl);
  }
};

/* 设置标题 */
export const setDocumentTitle = (title) => {
  document.title = title;
  if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
    var i = document.createElement('iframe');
    i.src = '';
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
};

/* 获取滚动高度 */
export const getScrollHeight = () => {
  let [scrollHeight, bodyScrollHeight, documentScrollHeight] = [0, 0, 0];
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  };
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  };
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
};

/* 获取视窗高度 */
export const getWindowHeight = () => {
  let windowHeight = 0;
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
};

/*
  监听屏幕滚动事件
 */
export const listenerWindowScroll = (fn, delay, mustRunDelay) => {
  window.onscroll = $tool.throttle(() => {
    if (fn) {
      fn();
    }
  }, delay, mustRunDelay);
};

/* 获取文档高度 */
export const getDocumentTop = () => {
  let [scrollTop, bodyScrollTop, documentScrollTop] = [0, 0, 0];
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  };
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  };
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
};

/* 检测是否到达底部 */
export const checkArrivalBottom = (fn) => {
  let sH = getScrollHeight();
  let wH = getWindowHeight();
  let dH = getDocumentTop() + 20;
  if ((wH + dH) >= sH) {
    if (fn) {
      fn();
    }
  }
};

/* 去除url code，不跳转 */
export const changeUrlNoReload = () => {
  if ('pushState' in history) {
    let href = window.location.href.split('#')[0];
    let newHref = href.replace(regRemoveCode, '');
    history.replaceState('', '', newHref);
  }
};

/* 未绑定手机跳转 */
export const unbindPhone = (data, isFromEvaluate) => {
  const jumpFlag = isFromEvaluate;
  window.sessionStorage.clear('tryNum');
  let wechatInfoKey = data.wechatInfoKey; // 未绑定手机的key值
  let href = window.location.href.split('#')[0];
  let newHref = href.replace(regRemoveCode, '');
  let redirect = encodeURI(newHref);
  router.push({ name: 'bindingPhoneNo', query: { wechatInfoKey, redirect, jumpFlag } });
};

// 滚动距离获取
export function getScrollTop() {
  let scrollPos;
  if (window.pageYOffset) {
    scrollPos = window.pageYOffset;
  } else if (document.compatMode && document.compatMode !== 'BackCompat') {
    scrollPos = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollPos = document.body.scrollTop;
  }
  return scrollPos;
}

export function offset(target) {
  let top = 0;
  let left = 0;
  while (target.offsetParent) {
    top += target.offsetTop;
    left += target.offsetLeft;
    target = target.offsetParent;
  };
  return {
    top, left
  };
}

export const $tool = {
  accDiv,
  getClientType,
  accMul,
  accAdd,
  isAndroidOrIOS,
  throttle,
  debounce,
  getUrlParam,
  getWechatCode,
  setDocumentTitle,
  getScrollHeight,
  getWindowHeight,
  getDocumentTop,
  checkArrivalBottom,
  changeUrlNoReload,
  unbindPhone,
  getScrollTop,
  offset
};
