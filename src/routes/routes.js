import Home from 'pages/Home/Home';
import Editor from 'pages/Editor/Editor';
import Battery from 'pages/Battery/Battery';

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
  },
  {
    exact: true,
    path: '/battery',
    component: Battery,
    title: '电池信息页'
  }
];
