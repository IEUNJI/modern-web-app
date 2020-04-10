import React from 'react';
import { TabBar, Card, Carousel, WhiteSpace } from 'antd-mobile';

import './Home.less';

const tabBarConfig = [
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

const tabBarCacheKey = 'mwa-selected-tab';
const dailyCacheKey = 'mwa-daily-data';
const historyCacheKey = 'mwa-daily-history';
const carouselCacheKey = 'mwa-carousel-data';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: sessionStorage.getItem(tabBarCacheKey) ?? tabBarConfig[0]?.tabName,
      dailyData: JSON.parse(sessionStorage.getItem(dailyCacheKey) ?? '[]'),
      dailyHistory: JSON.parse(sessionStorage.getItem(historyCacheKey) ?? '[]'),
      carouselData: JSON.parse(sessionStorage.getItem(carouselCacheKey) ?? '[]')
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchDailyData();
    }, 1000);
  }

  fetchDailyData = () => {
    fetch('https://zhihu-daily.leanapp.cn/api/v1/last-stories')
      .then(res => res.json())
      .then(res => {
        const dailyData = res.STORIES.stories;
        const carouselData = res.STORIES.top_stories;
        this.setState({
          dailyData,
          carouselData
        }, () => {
          sessionStorage.setItem(dailyCacheKey, JSON.stringify(dailyData));
          sessionStorage.setItem(carouselCacheKey, JSON.stringify(carouselData));
        });
      });
  }

  onTabBarPress = tabName => {
    const { selectedTab } = this.state;
    if (tabName === selectedTab) return;
    this.setState({
      selectedTab: tabName
    }, () => {
      sessionStorage.setItem(tabBarCacheKey, tabName)
    });
  }

  renderContent = tabName => {
    switch (tabName) {
      case 'homeTab':
        return this.renderHomeTab();
      default:
        return (
          <div style={{ color: 'rgb(16, 142, 233)' }}>{tabName}</div>
        );
    }
  }

  onCardClick = url => {
    const { dailyHistory } = this.state;
    if (!dailyHistory.includes(url)) {
      dailyHistory.push(url);
      this.setState({
        dailyHistory
      }, () => {
        sessionStorage.setItem(historyCacheKey, JSON.stringify(dailyHistory));
      });
    }
    window.open(url);
  }

  renderHomeTab = () => {
    const { dailyData, dailyHistory, carouselData } = this.state;
    return (
      <div className="home-tab">
        <Carousel
          autoplay={false}
          infinite
        >
          {
            carouselData.map(item => {
              const { id, url, image, title, hint } = item;
              return (
                <a
                  key={id}
                  className="carousel-wrapper"
                  href={url}
                  target="_blank"
                >
                  <img className="carousel-img" src={image} />
                  <span className="carousel-title">{title}</span>
                  <span className="carousel-hint">{hint}</span>
                </a>
              );
            })
          }
        </Carousel>
        {
          dailyData.map(item => {
            const { id, url, images, title, hint } = item;
            return (
              <div key={id} size="lg">
                <WhiteSpace size="lg" />
                <Card>
                  <Card.Header
                    title={
                      <div className="card-text">
                        <div className={`card-title${dailyHistory.includes(url) ? ' visited' : ''}`}>{title}</div>
                        <div className="card-hint">{hint}</div>
                      </div>
                    }
                    thumb={
                      <img className="card-img" src={images[0]} />
                    }
                    onClick={this.onCardClick.bind(this, url)}
                  />
                </Card>
              </div>
            );
          })
        }
        <WhiteSpace size="lg" />
      </div>
    );
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <div id="home-page">
        <TabBar>
          {
            tabBarConfig.map(item => {
              const { title, key, tabName, icon, selectedIcon } = item;
              return (
                <TabBar.Item
                  title={title}
                  key={key}
                  selected={selectedTab === tabName}
                  icon={{ uri: icon }}
                  selectedIcon={{ uri: selectedIcon }}
                  onPress={this.onTabBarPress.bind(this, tabName)}
                >
                  {
                    this.renderContent(tabName)
                  }
                </TabBar.Item>
              );
            })
          }
        </TabBar>
      </div>
    );
  }
}

export default Home;
