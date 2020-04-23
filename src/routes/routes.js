import Home from 'pages/Home/Home';
import Detail from 'pages/Detail/Detail';

export default [
  {
    exact: true,
    path: '/',
    component: Home,
    title: '首页'
  },
  {
    exact: true,
    path: '/detail/:id',
    component: Detail,
    title: '详情页'
  }
];
