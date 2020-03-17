import Home from '../pages/Home/Home';
import Camera from '../pages/Camera/Camera';

export default [
  {
    exact: true,
    path: '/',
    component: Home,
    title: '首页'
  },
  {
    exact: true,
    path: '/camera',
    component: Camera,
    title: '相机'
  }
];
