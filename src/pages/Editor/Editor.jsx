import React from 'react';
import { Toast } from 'antd-mobile';

import './Editor.less';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawImage: '',
      grayImage: ''
    };
  }

  onFileLoaderChange = async event => {
    const file = event.target.files[0];
    if (!file) return Toast.fail('未选择任何文件！');
    if (!file.type.startsWith('image')) return Toast.fail('请选择图片类型文件！');
    const rawBase64 = await this.fileToBase64(file);
    const rawImageData = await this.base64ToImageData(rawBase64);
    const grayImageData = await this.imageDataToGray(rawImageData);
    const grayBase64 = await this.imageDataToBase64(grayImageData);
    this.setState({
      rawImage: rawBase64,
      grayImage: grayBase64
    });
  }

  fileToBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        resolve(base64);
      };
      reader.readAsDataURL(file);
    });
  }

  base64ToImageData = base64 => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        const { width, height } = image;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        resolve(imageData);
      };
      image.src = base64;
    });
  }

  imageDataToGray = imageData => {
    return new Promise((resolve, reject) => {
      const { data, width, height } = imageData;
      const grayData = Array.from({ length: data.length }, () => 0);
      data.forEach((item, index) => {
        if ((index + 1) % 4 === 0) {
          const Red = data[index - 3];
          const Green = data[index - 2];
          const Blue = data[index - 1];
          const Alpha = data[index];

          const Gray = Math.floor(Red * 0.3 + Green * 0.59 + Blue * 0.11);
          grayData[index - 3] = Gray;
          grayData[index - 2] = Gray;
          grayData[index - 1] = Gray;
          grayData[index] = Alpha;
        }
      });
      const grayImageData = {
        data: grayData,
        width,
        height
      };
      resolve(grayImageData);
    });
  }

  imageDataToBase64 = imageData => {
    return new Promise((resolve, reject) => {
      const { data, width, height } = imageData;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const newImageData = ctx.createImageData(width, height);
      for (let i = 0; i < data.length; i += 4) {
        const Red = data[i];
        const Green = data[i + 1];
        const Blue = data[i + 2];
        const Alpha = data[i + 3];

        newImageData.data[i] = Red;
        newImageData.data[i + 1] = Green;
        newImageData.data[i + 2] = Blue;
        newImageData.data[i + 3] = Alpha;
      }
      ctx.putImageData(newImageData, 0, 0);
      const base64 = canvas.toDataURL('image/jpeg', 1);
      resolve(base64);
    });
  }

  render() {
    const { rawImage, grayImage } = this.state;
    return (
      <div id="editor-page">
        <input type="file" onChange={this.onFileLoaderChange} />
        <hr />
        <img style={{ width: '100%' }} src={rawImage} />
        <hr />
        <img style={{ width: '100%' }} src={grayImage} />
        <hr />
      </div>
    );
  }
}

export default Editor;
