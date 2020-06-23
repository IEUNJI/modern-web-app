import React from 'react';
import { MotionScreen, MotionScene, SharedElement } from 'react-motion-layout';

import avatar from 'assets/avatar.png';
import './Editor.less';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfBase64: '',
      rawImage: '',
      grayImage: '',
      scanText: '',
      colorThiefOutput: {
        color: [],
        palette: []
      }
    };
    this.colorsRef = React.createRef();
  }

  onFileLoaderChange = async event => {
    const file = event.target.files[0];
    if (!file) return alert('未选择任何文件！');
    console.log('fileInfo', file, file.name, file.type);
    if (file.type.includes('pdf')) {
      const pdfBase64 = await this.fileToBase64(file);
      console.log('pdfBase64', pdfBase64);
      this.setState({
        pdfBase64
      });
      return;
    }
    if (!file.type.startsWith('image')) {
      console.log(file.type);
      alert('请选择图片类型文件！')
      return;
    }
    const rawBase64 = await this.fileToBase64(file);
    const rawImageData = await this.base64ToImageData(rawBase64);
    const grayImageData = await this.imageDataToGray(rawImageData);
    const grayBase64 = await this.imageDataToBase64(grayImageData);
    const scanText = await this.resolveQRCode(rawBase64);
    const colorThiefOutput = await this.resolveColorThief(rawBase64);
    this.setState({
      rawImage: rawBase64,
      grayImage: grayBase64,
      scanText,
      colorThiefOutput
    }, this.animateHandler);
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

  animateHandler = () => {
    const colors = this.colorsRef.current.childNodes;
    colors.forEach((color, index) => {
      color.animate(
        [
          { opacity: 0 },
          { opacity: 1 }
        ],
        {
          duration: 1000,
          easing: 'ease-in-out',
          delay: index * 300,
          fill: 'both'
        }
      );
    });
  }

  render() {
    const { pdfBase64, rawImage, grayImage, scanText, colorThiefOutput } = this.state;
    const { color, palette } = colorThiefOutput;
    return (
      <MotionScreen>
        <MotionScene name="editor-motion" scrollUpOnEnter>
          <div id="editor-page">
            <div className="editor-page-title">
              <SharedElement.Text
                className="editor-motion-text"
                animationKey="editor-motion-text"
              >
                图片编辑页
              </SharedElement.Text>
              <SharedElement.Image
                src={avatar}
                className="editor-motion-image"
                animationKey="editor-motion-image"
              />
            </div>
            <input type="file" style={{ width: '100%' }} onChange={this.onFileLoaderChange} />
            {
              pdfBase64 &&
              <p style={{ width: '100%', lineHeight: '28px', overflow: 'auto' }}>{pdfBase64}</p>
            }
            {
              palette.length !== 0 &&
              <hr />
            }
            {
              palette.length !== 0 &&
              <div className="color-thief-output">
                <div className="swatches-color">
                  {
                    color.map((rgbStr, index) => {
                      return (
                        <div key={index} className="swatch" style={{ backgroundColor: rgbStr }}></div>
                      );
                    })
                  }
                </div>
                <div className="swatches-palette" ref={this.colorsRef}>
                  {
                    palette.map((rgbStr, index) => {
                      return (
                        <div key={index} className="swatch" style={{ backgroundColor: rgbStr }}></div>
                      );
                    })
                  }
                </div>
              </div>
            }
            {
              rawImage &&
              <hr />
            }
            {
              rawImage &&
              <img style={{ width: '100%' }} src={rawImage} />
            }
            {
              grayImage &&
              <hr />
            }
            {
              grayImage &&
              <img style={{ width: '100%' }} src={grayImage} />
            }
            {
              scanText &&
              <hr />
            }
            {
              scanText &&
              <p style={{ overflowWrap: 'break-word' }}>{scanText}</p>
            }
          </div>
        </MotionScene>
      </MotionScreen>
    );
  }
}

export default Editor;
