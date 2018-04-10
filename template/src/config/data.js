/* 各种静态数据 */

/* 首页分享文案 */
export const ENJOY_INDEX = () => { // 随机一种
  return [
    {
      title: '梅沙教育，青少年素质教育品牌的领导者',
      desc: '加入梅沙营地，让孩子选择自己的人生之路。'
    },
    {
      title: '让我们的孩子，生活在未来',
      desc: '加入梅沙营地，培养孩子面对未来的能力。'
    },
    {
      title: '如何发现孩子的兴趣与天赋？',
      desc: '加入梅沙营地，给孩子一次自我探索的机会。'
    }
  ];
};

/* 详情页分享文案 */
export const ENJOY_DETAIL = (enjoyName) => { // 随机一种
  return [
    '加入梅沙营地，让孩子选择自己的人生之路。',
    `「${enjoyName}」邀请你一起参加梅沙营地。`
  ];
};

/* 校区主页分享文案 */
export const ENJOY_CAMPUS = () => {
  return '加入梅沙营地，让孩子选择自己的人生之路。';
};

export const $DATA = {
  ENJOY_INDEX,
  ENJOY_DETAIL,
  ENJOY_CAMPUS
};
