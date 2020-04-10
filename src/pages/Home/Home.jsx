import React from 'react';
import { TabBar } from 'antd-mobile';

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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: sessionStorage.getItem(tabBarCacheKey) ?? tabBarConfig[0]?.tabName
    };
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
    return (
      <div style={{ color: 'rgb(16, 142, 233)' }}>{tabName}</div>
    );
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <section id="home-page">
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
      </section>
    );
  }
}

export default Home;
