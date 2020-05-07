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

  openConsole = () => {
    if (document.querySelector('#mwa-utils-console')) return;

    const script = document.createElement('script');
    script.id = 'mwa-utils-console';
    script.src = '//cdn.bootcss.com/eruda/1.5.2/eruda.min.js';
    script.setAttribute('onload', 'eruda.init();');
    
    document.body.appendChild(script);
  }

  render() {
    const { charging, level } = this.state;
    return (
      <div id="home-page">
        <span>{charging ? '充电中：' : '未充电：'}</span>
        <span>{level * 100 + '%'}</span>
        <hr />
        <button onClick={this.openConsole}>Open Console</button>
        <hr />
        <button onClick={() => this.props.history.push('/editor')}>图片编辑页</button>
        <hr />
      </div>
    );
  }
}

export default Home;
