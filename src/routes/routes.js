import Home from 'pages/Home/Home';
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
    path: '/editor',
    component: Editor,
    title: '图片编辑页'
  }
];
