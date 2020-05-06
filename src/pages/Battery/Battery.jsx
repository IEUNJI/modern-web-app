import React from 'react';

import './Battery.less';

class Battery extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    navigator.getBattery().then(battery => {
      console.log(battery);
    });
  }

  render() {
    return (
      <div id="battery-page">
        Battery
      </div>
    );
  }
}

export default Battery;
