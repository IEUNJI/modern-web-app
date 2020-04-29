import React from 'react';
import { Carousel, Card, WhiteSpace } from 'antd-mobile';
import { storage, storageCacheKey, localeMonths } from './HomeConfig';

import headerIcon from './images/v2-acc9d1cb89b9ae5454736b1d36bb712f_720w.jpg';
import './Home.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyData: storage.getItem(storageCacheKey.dailyData) ?? [],
      dailyHistory: storage.getItem(storageCacheKey.dailyHistory) ?? [],
      carouselData: storage.getItem(storageCacheKey.carouselData) ?? [],
      carouselIndex: storage.getItem(storageCacheKey.carouselIndex) ?? 0,
      carouselHeight: '0px'
    };
    this.homeScrollInstance = React.createRef();
  }

  componentDidMount() {
    const { dailyData } = this.state;
    if (dailyData.length !== 0) {
      this.initHomeScroll();
      return;
    }
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
          this.initHomeScroll();
        });
      });
  }

  initHomeScroll = () => {
    setTimeout(() => {
      const homeScroll = storage.getItem(storageCacheKey.homeScroll) ?? 0;
      this.homeScrollInstance.current.scrollTop = homeScroll;
    });
  }

  onHomeScroll = event => {
    storage.setItem(storageCacheKey.homeScroll, event.target.scrollTop);
  }

  onCarouselChange = selectedIndex => {
    storage.setItem(storageCacheKey.carouselIndex, selectedIndex);
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

  openConsole = () => {
    if (document.querySelector('#mwa-utils-console')) return;

    const script = document.createElement('script');
    script.id = 'mwa-utils-console';
    script.src = '//cdn.bootcss.com/eruda/1.5.2/eruda.min.js';
    script.setAttribute('onload', 'eruda.init();');
    
    document.body.appendChild(script);
  }

  render() {
    const { dailyData, dailyHistory, carouselData, carouselIndex, carouselHeight } = this.state;
    const now = new Date();
    const date = String(now.getDate()).padStart(2, '0');
    const month = localeMonths[now.getMonth()].padEnd(2, '月');
    return (
      <div id="home-page">
        <div className="home-header">
          <div className="header-date" onClick={() => this.props.history.push('/editor')}>
            <div className="date-date">{date}</div>
            <div className="date-month">{month}</div>
          </div>
          <div className="header-border"></div>
          <div className="header-title">
            知乎日报
          </div>
          <div className="header-icon" onClick={this.openConsole}>
            <img src={headerIcon} />
          </div>
        </div>
        <div className="home-scroll" ref={this.homeScrollInstance} onScroll={this.onHomeScroll}>
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
                    style={{ height: carouselHeight }}
                    onClick={this.onCardClick.bind(this, item)}
                  >
                    <img
                      className="carousel-img"
                      src={image}
                      onLoad={() => {
                        this.setState({ carouselHeight: 'auto' }, () => {
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
      </div>
    );
  }
}

export default Home;
