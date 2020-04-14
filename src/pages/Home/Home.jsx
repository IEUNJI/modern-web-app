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
      carouselIndex: storage.getItem(storageCacheKey.carouselIndex) ?? 0,
      imgHeight: '0px'
    };
    this.homeTabInstance = React.createRef();
  }

  componentDidMount() {
    this.fetchDailyData();
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
          this.initHomeTabScroll();
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

  onCardClick = item => {
    const { dailyHistory } = this.state;
    const { id, url } = item;
    if (!dailyHistory.includes(url)) {
      dailyHistory.push(url);
      this.setState({
        dailyHistory
      }, () => {
        storage.setItem(storageCacheKey.dailyHistory, dailyHistory);
      });
    }
    this.props.history.push(`/detail/${id}`);
  }

  onHomeTabScroll = event => {
    storage.setItem(storageCacheKey.homeTabScroll, event.target.scrollTop);
  }

  initHomeTabScroll = () => {
    this.homeTabInstance.current.scrollTop = storage.getItem(storageCacheKey.homeTabScroll) ?? 0;
  }

  onCarouselChange = selectedIndex => {
    storage.setItem(storageCacheKey.carouselIndex, selectedIndex);
  }

  renderHomeTab = () => {
    const { dailyData, dailyHistory, carouselData, carouselIndex, imgHeight } = this.state;
    return (
      <div className="home-tab" ref={this.homeTabInstance} onScroll={this.onHomeTabScroll}>
        <Carousel
          autoplay={false}
          infinite
          selectedIndex={carouselIndex}
          afterChange={this.onCarouselChange}
        >
          {
            carouselData.map(item => {
              const { id, url, image, title, hint } = item;
              return (
                <span
                  key={id}
                  className="carousel-wrapper"
                  style={{ height: imgHeight }}
                  onClick={this.onCardClick.bind(this, item)}
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
                </span>
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
                    onClick={this.onCardClick.bind(this, item)}
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
