import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
let pathname = '/';
export default new Router({
  mode: 'history',
  routes: [
    {
      path: pathname,
      component: () => import('@/views/home'),
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('@/views/index'),
          meta: {
            hasFooter: true
          }
        },
        {
          path: '/page1',
          name: 'page1',
          component: () => import('@/views/page1'),
          meta: {
            hasFooter: true
          }
        },
        {
          path: '/page2',
          name: 'page2',
          component: () => import('@/views/page2'),
          meta: {
            hasFooter: true
          }
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404')
    },
    { path: '/*', redirect: '/404' }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: 0 };
    }
  }
});
