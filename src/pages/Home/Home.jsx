import React from 'react';

import './Home.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
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
    return (
      <div id="home-page">
        <button onClick={this.openConsole}>Open Console</button>
        <hr />
        <button onClick={() => this.props.history.push('/editor')}>图片编辑页</button>
        <hr />
      </div>
    );
  }
}

export default Home;
