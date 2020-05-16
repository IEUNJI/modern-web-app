import React from 'react';

import './Home.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charging: false,
      level: 1
    };
  }

  componentDidMount() {
    this.batteryManager();
  }

  batteryManager = () => {
    navigator.getBattery().then(battery => {
      const { charging, level } = battery;
      this.setState({
        charging,
        level
      });
      battery.addEventListener('chargingchange', () => {
        const { charging } = battery;
        this.setState({
          charging
        });
      });
      battery.addEventListener('levelchange', () => {
        const { level } = battery;
        this.setState({
          level
        });
      });
    });
  }

  render() {
    const { charging, level } = this.state;
    return (
      <div id="home-page">
        <span>{charging ? '充电中：' : '未充电：'}</span>
        <span>{level * 100 + '%'}</span>
        <hr />
        <button onClick={() => this.props.history.push('/editor')}>图片编辑页</button>
        <hr />
      </div>
    );
  }
}

export default Home;
