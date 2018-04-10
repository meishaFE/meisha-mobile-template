/*
   微信相关
  操作逻辑请都写在此文件内
 */
import { $tool, $http, $type } from './index';
import * as CONFIG from '@/config';
import { API } from '@/config/index';
/*
  app下载
 */
export const appDownload = {
  init() {
    this.comparebrowse();
  },
  downloadApp() {
    window.location.href = 'meishakejiCamp://';
    setTimeout(function () {
      window.location.href = 'http://cmcc.in/inT';
    }, 500);
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  },
  comparebrowse() {
    let defaultUrl = 'http://cmcc.in/inT';
    let clientStr = $tool.isAndroidOrIOS();
    if (clientStr === 'IOS') {
      this.iosRedirect(defaultUrl);
    } else if (clientStr === 'android') {
      this.downloadApp();
    }
  },
  iosRedirect(defalutUrl) {
    let loadIframeSrc = 'wxf7d669c18d6ab553://';
    window.location.href = loadIframeSrc;
    let t = Date.now();
    setTimeout(() => {
      if (Date.now() - t < 1550) {
        window.location.href = defalutUrl;
      };
    }, 1500);
  }
};

/* 首页分享文案数据即默认文案获取 */
export const getEnjoyIndexText = () => {
  let r = parseInt(Math.random() * 3); // 随机数字
  let obj = CONFIG.$DATA.ENJOY_INDEX()[r];
  obj['link'] = window.location.href;
  obj['imgUrl'] = CONFIG.ENJOY_IMG_SRC;
  return obj;
};

/*
  分享朋友圈
 */
export const enjoyShareTimeline = (data = {}) => {
  if ($type.isType(wx, 'Object')) {
    wx.onMenuShareTimeline({
      title: data.title, // 分享标题
      link: data.link, // 分享链接
      desc: data.desc, // 分享描述
      imgUrl: data.imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  };
};

/*
  分享朋友
 */
export const enjoyShareAppMessage = (data = {}) => {
  if ($type.isType(wx, 'Object')) {
    wx.onMenuShareAppMessage({
      title: data.title, // 分享标题
      desc: data.desc, // 分享描述
      link: data.link, // 分享链接
      imgUrl: data.imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  };
};

/*
  获取地理位置
 */
export const getLocation = (cb) => {
  if (!$type.isType(wx, 'Object')) {
    cb && cb();
  } else {
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        window.sessionStorage.setItem('locationObj', JSON.stringify({ latitude, longitude }));
        cb && cb();
      },
      fail: res => {
        cb && cb();
      }
    });
  }
};

/*
  二：通过ready接口处理成功验证
 */
export const wechatReady = () => {
  if ($type.isType(wx, 'Object')) {
    wx.ready(() => {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
      // ，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
      // 则须把相关接口放在ready函数中调用来确保正确执行。
      // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      // 默认分享文案 使用首页的
      let defaultEnjoyData = getEnjoyIndexText();
      enjoyShareTimeline(defaultEnjoyData);
      enjoyShareAppMessage(defaultEnjoyData);
      getLocation();
      wx.hideMenuItems({
        menuList: ['menuItem:copyUrl'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      });
    });
    wx.error((res) => {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，
      // 具体错误信息可以打开config的debug模式查看，
      // 也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.error(res);
    });
  }
};

/*
  一：通过config接口注入权限验证配置 此为微信配置第一步
 */
export const wechatInit = (wechatConfig = {}) => {
  if ($type.isType(wx, 'Object')) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: wechatConfig.appId, // 必填，公众号的唯一标识
      timestamp: wechatConfig.timestamp, // 必填，生成签名的时间戳
      nonceStr: wechatConfig.nonceStr, // 必填，生成签名的随机串
      signature: wechatConfig.signature, // 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'getLocation', 'previewImage', 'hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wechatReady();
  }
};

/*
  小程序环境判断
 */
export const getIsMiniProgramEnv = () => {
  if ($type.isType(wx, 'Object')) {
    wx.miniProgram.getEnv((res) => {
      let miniProgram = res.miniprogram ? 1 : 0;
      window.sessionStorage.setItem('isMiniProgramEnv', miniProgram);
    });
  };
};

/*
  微信签名信息获取
  安卓端需要每个页面获取一次；ios只需获取一次
 */
export const getWechatConfig = () => {
  let params = {
    data: JSON.stringify({ url: window.location.href })
  };
  return $http.get(API.PUBLIC.GET_WECHAT_INFO, { params })
    .then((res) => {
      if (res) {
        getIsMiniProgramEnv();
        wechatInit(res.data);
      }
    });
};

export const $wechat = {
  appDownload,
  wechatInit,
  wechatReady,
  getIsMiniProgramEnv,
  getWechatConfig,
  enjoyShareTimeline,
  enjoyShareAppMessage,
  getEnjoyIndexText,
  getLocation
};
