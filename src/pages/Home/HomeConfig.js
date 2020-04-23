export const storage = {
  setItem(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  },
  getItem(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
};

export const storageCacheKey = {
  dailyData: 'mwa-daily-data',
  dailyHistory: 'mwa-daily-history',
  carouselData: 'mwa-carousel-data',
  carouselIndex: 'mwa-carousel-index',
  homeScroll: 'mwa-home-scroll'
};

export const localeMonths = [
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
  '十一',
  '十二'
];
