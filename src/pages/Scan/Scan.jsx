import React from 'react';

import './Scan.less';

class Scan extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initMediaStream();
  }

  initMediaStream = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        console.log('mediaStream', mediaStream);
        const videoTracks = mediaStream.getVideoTracks();
        console.log('videoTracks', videoTracks);
      });
  }

  render() {
    return (
      <div id="scan-page">
        Scan
      </div>
    );
  }
}

export default Scan;
