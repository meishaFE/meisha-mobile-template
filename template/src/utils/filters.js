import { isType } from './type';
let moment = require('moment');

// 全局的过滤器
const globalFilters = {
  setDefaultText: (val, text = '暂无') => {
    if (val || val !== '') {
      return val;
    } else {
      return text;
    }
  },
  formatMoney: (num, isInt) => { // num 数值传过来单位为分
    if (num === undefined) return;
    let curNum = Number(num) / 100;
    curNum = curNum.toFixed(2);
    let source = String(curNum).split('.'); // 按小数点分成2部分

    // 处理整数部分
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,');

    // 处理小数部分
    if (source[1] && +source[1]) {
      source[1] = source[1][1] ? source[1] : source[1][0];
    } else {
      source.pop();
    }
    // 返回整数或者小数
    return isInt ? source[0] : source.join('.');
  },
  dateFilter: (time, type) => {
    let result = '-';
    if (time === 0) {
      return result;
    };
    let b = moment(time * 1000).utc().utcOffset(8);
    switch (type) {
      case 0:
        result = b.format('MM-DD'); // 01-05
        break;
      case 1:
        result = b.format('hh:mm'); // 11:12
        break;
      case 2:
        result = b.format('YYYY-MM-DD'); // 2015-01-05
        break;
      case 3:
        result = b.format('YYYY-MM-DD HH:mm'); // 2015-01-05 11:12
        break;
      case 4:
        result = b.format('YYYY-MM-DD HH:mm:ss'); // 2015-01-05 11:12:06
        break;
      case 5:
        result = b.format('hh小时mm分钟'); // h小时m分钟
        break;
      case 6:
        result = b.format('YYYY年MM月DD日'); // 2017年08月29日
        break;
      default:
        result = b.format('YYYY-MM-DD hh:mm'); // 2015-01-05 11:12
        break;
    };
    return result;
  },
  // 给图片拼接域名
  imgPrefix: (url) => {
    return CONFIG.ALI_BASE.BASE_SRC + url;
  }
};

const install = Vue => {
  if (!isType(globalFilters, 'Object')) {
    return;
  }

  const keys = Object.keys(globalFilters);

  if (!isType(keys, 'Array') || !keys.length) {
    return;
  }

  keys.forEach(key => Vue.filter(key, globalFilters[key]));
};

export const filters = {
  install
};
