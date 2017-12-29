/*
 * @Author: Leo - [xuebin.me]
 * @Date: 2017-12-29 14:00:30
 * @Last Modified by:   Leo
 * @Last Modified time: 2017-12-29 14:00:30
 */
export default [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../../views/Login'], resolve)
  },
  {
    path: '/',
    name: 'main',
    component: resolve => require(['../../views/Main'], resolve),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: resolve => require(['../../views/home/index'], resolve)
      }
    ]
  }
];
