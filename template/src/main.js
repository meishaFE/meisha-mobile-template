{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
{{#polyfill}}
import 'babel-polyfill';
{{/polyfill}}
import Vue from 'vue';
import App from './App';
{{#router}}
import router from '@/router';
{{/router}}
{{#vuex}}
import store from '@/store';
{{/vuex}}
import { $http, $type, $cookie, filters, $tool, $wechat } from '@/utils';
import * as CONFIG from '@/config';
import './assets/scss/app.scss';
import MeishaWatch from 'meisha-fe-watch';
import Meisha from 'meisha-ui';
import 'meisha-ui/lib/styles/index.css';
Vue.use(filters);
Vue.use(Meisha);
Vue.config.productionTip = false;

window.$tool = $tool;
window.$http = $http;
window.$type = $type;
window.$cookie = $cookie;
window.CONFIG = CONFIG;
window.$wechat = $wechat;
window.$http = $http;
window.$type = $type;
window.MeishaWatch = MeishaWatch;

// 梅沙监控，初始化后修改此处项目id和模块id
MeishaWatch.init({
  // 是否向后端提交MeishaWatch收集信息，默认为true
  isReport: (!CONFIG.ENV.IS_DEV || !CONFIG.ENV.IS_TEST),
   // 向后端提交MeishaWatch收集信息的URL(必填，否则无法提交)
  reportURL: (CONFIG.ENV.IS_DEV || CONFIG.ENV.IS_TEST) ? '//test-log-server-web.meishakeji.com/log/js' : '//log-server-web.meishakeji.com/log/js',
  projectId: 'camps', // 日志系统生成的项目名称(必填，否则无法提交)
  partitionId: 'saleh5' // 日志系统生成的模块名称(必填，否则无法提交)
});
Vue.use(MeishaWatch.useVue());

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#vuex}}
  store,
  {{/vuex}}
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }
  {{/if_eq}}
});
