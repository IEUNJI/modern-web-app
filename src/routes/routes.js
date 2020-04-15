import Home from 'pages/Home/Home';
import Detail from 'pages/Detail/Detail';
import Collection from 'pages/Collection/Collection';

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
  },
  {
    exact: true,
    path: '/collection',
    component: Collection,
    title: '收藏页'
  }
];
