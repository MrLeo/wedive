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
