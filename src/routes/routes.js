import Home from 'pages/Home/Home';
import Detail from 'pages/Detail/Detail';
import Editor from 'pages/Editor/Editor';

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
    path: '/editor',
    component: Editor,
    title: '图片编辑页'
  }
];
