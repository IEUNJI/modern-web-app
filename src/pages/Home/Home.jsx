import React from 'react';
import { TabBar, Card, Carousel, WhiteSpace } from 'antd-mobile';
import { tabBarConfig, storageCacheKey, storage } from './HomeConfig';

import './Home.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: storage.getItem(storageCacheKey.selectedTab) ?? tabBarConfig[0]?.tabName,
      dailyData: storage.getItem(storageCacheKey.dailyData) ?? [],
      dailyHistory: storage.getItem(storageCacheKey.dailyHistory) ?? [],
      carouselData: storage.getItem(storageCacheKey.carouselData) ?? [],
      imgHeight: '0px'
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
          storage.setItem(storageCacheKey.dailyData, dailyData);
          storage.setItem(storageCacheKey.carouselData, carouselData);
        });
      });
  }

  onTabBarPress = tabName => {
    const { selectedTab } = this.state;
    if (tabName === selectedTab) return;
    this.setState({
      selectedTab: tabName
    }, () => {
      storage.setItem(storageCacheKey.selectedTab, tabName)
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
        storage.setItem(storageCacheKey.dailyHistory, dailyHistory);
      });
    }
    window.open(url);
  }

  renderHomeTab = () => {
    const { dailyData, dailyHistory, carouselData, imgHeight } = this.state;
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
                  style={{ height: imgHeight }}
                  href={url}
                  target="_blank"
                >
                  <img
                    className="carousel-img"
                    src={image}
                    onLoad={() => {
                      this.setState({ imgHeight: 'auto' }, () => {
                        window.dispatchEvent(new Event('resize'));
                      });
                    }}
                  />
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
