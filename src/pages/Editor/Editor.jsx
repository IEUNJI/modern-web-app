import React from 'react';
import { Toast } from 'antd-mobile';

import './Editor.less';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawImage: '',
      grayImage: '',
      scanText: ''
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
    const scanText = await this.resolveQRCode(rawBase64);
    const colorThiefOutput = await this.resolveColorThief(rawBase64);
    console.log(colorThiefOutput);
    this.setState({
      rawImage: rawBase64,
      grayImage: grayBase64,
      scanText
    });
  }

  fileToBase64 = file => {
    return new Promise((resolve, reject) => {
      console.time('fileToBase64');
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        console.timeEnd('fileToBase64');
        resolve(base64);
      };
      reader.readAsDataURL(file);
    });
  }

  base64ToImageData = base64 => {
    return new Promise((resolve, reject) => {
      console.time('base64ToImageData');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        const { width, height } = image;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        console.timeEnd('base64ToImageData');
        resolve(imageData);
      };
      image.src = base64;
    });
  }

  imageDataToGray = imageData => {
    return new Promise((resolve, reject) => {
      console.time('imageDataToGray');
      const { data, width, height } = imageData;
      const grayData = new Array(data.length);
      for (let i = 0; i < data.length; i += 4) {
        const Red = data[i];
        const Green = data[i + 1];
        const Blue = data[i + 2];
        const Alpha = data[i + 3];

        const Gray = Math.floor(Red * 0.3 + Green * 0.59 + Blue * 0.11);

        grayData[i] = Gray;
        grayData[i + 1] = Gray;
        grayData[i + 2] = Gray;
        grayData[i + 3] = Alpha;
      }
      const grayImageData = {
        data: grayData,
        width,
        height
      };
      console.timeEnd('imageDataToGray');
      resolve(grayImageData);
    });
  }

  imageDataToBase64 = imageData => {
    return new Promise((resolve, reject) => {
      console.time('imageDataToBase64');
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
      console.timeEnd('imageDataToBase64');
      resolve(base64);
    });
  }

  resolveQRCode = base64 => {
    return new Promise((resolve, reject) => {
      console.time('resolveQRCode');
      window.qrcode.callback = scanText => {
        console.timeEnd('resolveQRCode');
        resolve(scanText !== 'error decoding QR Code' ? scanText : '');
      };
      window.qrcode.decode(base64);
    });
  }

  resolveColorThief = base64 => {
    return new Promise((resolve, reject) => {
      console.time('resolveColorThief');
      const rgbFormat = rgbArr => {
        return rgbArr.map(rgb => {
          const [r, g, b] = rgb;
          return `rgb(${r}, ${g}, ${b})`;
        });
      };
      const image = new Image();
      image.onload = () => {
        const colorThief = new window.ColorThief();
        const color = rgbFormat([colorThief.getColor(image)]);
        const palette = rgbFormat(colorThief.getPalette(image));
        const colorThiefOutput = {
          color,
          palette
        };
        console.timeEnd('resolveColorThief');
        resolve(colorThiefOutput);
      };
      image.src = base64;
    });
  }

  render() {
    const { rawImage, grayImage, scanText } = this.state;
    return (
      <div id="editor-page">
        <input type="file" onChange={this.onFileLoaderChange} />
        <hr />
        <img style={{ width: '100%' }} src={rawImage} />
        <hr />
        <img style={{ width: '100%' }} src={grayImage} />
        <hr />
        <p style={{ overflowWrap: 'break-word' }}>{scanText}</p>
      </div>
    );
  }
}

export default Editor;
