export const tabBarConfig = [
  {
    title: '首页',
    key: 'home',
    tabName: 'homeTab',
    icon: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
    selectedIcon: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'
  },
  {
    title: '理财',
    key: 'money',
    tabName: 'moneyTab',
    icon: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
    selectedIcon: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'
  },
  {
    title: '口碑',
    key: 'koubei',
    tabName: 'koubeiTab',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
    selectedIcon: 'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg'
  },
  {
    title: '朋友',
    key: 'friend',
    tabName: 'friendTab',
    icon: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',
    selectedIcon: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg'
  }
];

export const storageCacheKey = {
  selectedTab: 'mwa-selected-tab',
  dailyData: 'mwa-daily-data',
  dailyHistory: 'mwa-daily-history',
  carouselData: 'mwa-carousel-data'
};

export const storage = {
  setItem(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  },
  getItem(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
};
