import React from 'react';

import './Home.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
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
        
      </div>
    );
  }
}

export default Home;
