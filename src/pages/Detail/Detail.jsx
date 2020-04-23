import React from 'react';

import './Detail.less';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.detailPageInstance = React.createRef();
  }

  componentDidMount() {
    this.fetchArticleData();
  }

  fetchArticleData = () => {
    const { id } = this.props.match.params;
    fetch(`https://zhihu-daily.leanapp.cn/api/v1/contents/${id}`)
      .then(res => res.json())
      .then(res => {
        const articleData = res.CONTENTS;
        const articleHtml = articleData.body;
        const articleCss = articleData.css[0];
        const link = document.createElement('link');
        link.id = 'mwa-css-detail';
        link.rel = 'stylesheet';
        link.href = articleCss;
        if (!document.querySelector('#mwa-css-detail')) {
          document.head.appendChild(link);
        }
        this.detailPageInstance.current.innerHTML = articleHtml;
      });
  }

  render() {
    return (
      <div id="detail-page" ref={this.detailPageInstance}>
        
      </div>
    );
  }
}

export default Detail;
