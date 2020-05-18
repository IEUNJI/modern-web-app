import React from 'react';

import './Home.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="home-page">
        <button onClick={() => this.props.history.push('/editor')}>图片编辑页</button>
      </div>
    );
  }
}

export default Home;
