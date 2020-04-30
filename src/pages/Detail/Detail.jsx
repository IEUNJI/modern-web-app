import React from 'react';

import './Detail.less';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.detailPageInstance = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchArticleData();
    }, 500);
  }

  componentWillUnmount() {
    document.querySelector('#mwa-css-detail')?.remove();
  }

  fetchArticleData = () => {
    const { id } = this.props.match.params;
    fetch(`https://zhihu-daily.leanapp.cn/api/v1/contents/${id}`)
      .then(res => res.json())
      .then(res => {
        const articleData = res.CONTENTS;
        const articleHtml = articleData.body;
        const articleCss = articleData.css[0];
        const articleImage = articleData.image;
        const articleImageColor = articleData.image_hue.replace('0x', '#');
        const articleImageSource = articleData.image_source ?? '';
        const articleTitle = articleData.title;
        const link = document.createElement('link');
        link.id = 'mwa-css-detail';
        link.rel = 'stylesheet';
        link.href = articleCss;
        if (!document.querySelector('#mwa-css-detail')) {
          document.head.appendChild(link);
        }
        this.detailPageInstance.current.innerHTML = articleHtml;
        const imgPlaceHolder = this.detailPageInstance.current.querySelector('.img-place-holder');
        imgPlaceHolder.style.height = 'auto';
        imgPlaceHolder.innerHTML = `
          <div style="position: relative; width: 100%; height: 100%;">
            <img style="width: 100%; height: 100%; object-fit: cover;" src=${articleImage} />
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, ${articleImageColor} 0%, transparent 50%);"></div>
            <div style="position: absolute; bottom: 30px; left: 0; padding: 0 20px; font-size: 20px; color: #fff;">${articleTitle}</div>
            <div style="position: absolute; bottom: 8px; right: 0; padding: 0 20px; height: 14px; line-height: 14px; font-size: 12px; color: #ccc;">${articleImageSource}</div>
          </div>
        `;
      });
  }

  render() {
    return (
      <div id="detail-page" ref={this.detailPageInstance}>
        <div style={{ height: innerWidth, background: '#eee' }}></div>
        <div style={{ padding: '20px' }}>
          <div style={{ height: '25px', borderRadius: '2px', background: '#eee' }}></div>
          <div style={{ marginTop: '10px', width: '70%', height: '25px', borderRadius: '2px', background: '#eee' }}></div>
          <div style={{ marginTop: '20px', width: '40%', height: '15px', borderRadius: '2px', background: '#eee' }}></div>
          <div style={{ marginTop: '20px', height: '20px', borderRadius: '2px', background: '#eee' }}></div>
          <div style={{ marginTop: '10px', height: '20px', borderRadius: '2px', background: '#eee' }}></div>
          <div style={{ marginTop: '10px', height: '20px', borderRadius: '2px', background: '#eee' }}></div>
        </div>
      </div>
    );
  }
}

export default Detail;
