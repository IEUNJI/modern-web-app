import React from 'react';

import './Camera.less';
import defaultBgImg from 'assets/images/20200318171207.jpg';

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: []
    };
    this.video = React.createRef();
    this.mediaStream = null;
    this.imageCapture = null;
  }

  componentDidMount() {
    this.syncAlbum();
    this.initMediaStream();
  }

  componentWillUnmount() {
    this.mediaStream.getVideoTracks().forEach(mediaStreamTrack => {
      mediaStreamTrack.stop();
    });
  }

  initMediaStream = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        this.mediaStream = mediaStream;
        const video = this.video.current;
        video.srcObject = mediaStream; // 预览媒体流
        const mediaStreamTrack = mediaStream.getVideoTracks()[0];
        this.imageCapture = new ImageCapture(mediaStreamTrack); // 存储图片捕捉实例
      });
  }

  takePhoto = () => {
    this.imageCapture.takePhoto()
      .then(blob => this.blobToBase64(blob))
      .then(base64 => {
        this.setPhotos(base64);
      });
  }

  blobToBase64 = blob => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = e => {
        resolve(e.target.result);
      };
      fileReader.onerror = () => {
        reject(new Error('blobToBase64 error'));
      };
      fileReader.readAsDataURL(blob);
    });
  }

  setPhotos = base64 => {
    const album = this.getPhotos();
    album.push({
      id: Math.random().toString().replace('0.', '').substring(0, 10),
      base64
    });
    localStorage.setItem('modern-web-app-album', JSON.stringify(album));
    this.syncAlbum();
  }

  getPhotos = () => {
    const album = JSON.parse(localStorage.getItem('modern-web-app-album') ?? '[]');
    return album;
  }

  syncAlbum = () => {
    const album = this.getPhotos();
    this.setState({
      album
    });
  }

  render() {
    const { album } = this.state;
    const lastPhoto = album[album.length - 1]?.base64;

    return (
      <section id="camera-page">
        <section className="stream-bg" style={{ backgroundImage: `url(${lastPhoto ?? defaultBgImg})`}}></section>
        <section className="stream-container">
          <video autoPlay ref={this.video}></video>
        </section>
        <section className="btn-container">
          <section className="photo-preview-container">
            <section className="photo-preview-frame">
              <img src={lastPhoto ?? defaultBgImg} alt="photo-preview" />
            </section>
          </section>
          <button className="btn-take-photo" onClick={this.takePhoto}></button>
        </section>
      </section>
    );
  }
}

export default Camera;
