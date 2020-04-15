import React from 'react';
import { linkList } from './CollectionConfig';

import './Collection.less';

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgVisible: false
    };
  }

  componentDidMount() {
    if (!Reflect.has(window, 'HTMLPortalElement')) {
      this.setState({
        msgVisible: true
      });
    }
  }

  copyHandler = () => {
    navigator.clipboard
      .writeText('chrome://flags/#enable-portals')
      .then(() => {
        alert('复制成功');
      });
  }

  createPortal = url => {
    document.querySelector('.mwa-portal-style')?.remove();
    document.querySelector('.mwa-portal')?.remove();

    const style = document.createElement('style');
    style.classList.add('mwa-portal-style');
    style.innerHTML = `
      portal {
        position: fixed;
        left: 20px;
        bottom: 20px;
        width: 100%;
        height: 100%;
        opacity: 0;
        box-shadow: 0 0 20px 10px #999;
        transform: scale(0.4);
        transform-origin: left bottom;
        animation-name: fade-in;
        animation-duration: 1s;
        animation-delay: 2s;
        animation-fill-mode: forwards;
      }
      .portal-transition {
        transition: transform 0.4s;
      }
      @media (prefers-reduced-motion: reduce) {
        .portal-transition {
          transition: transform 0.001s;
        }
      }
      .portal-reveal {
        transform: scale(1.0) translateX(-20px) translateY(20px);
      }
      @keyframes fade-in {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }
    `;

    const portal = document.createElement('portal');
    portal.src = url;
    portal.classList.add('mwa-portal');
    portal.classList.add('portal-transition');
    portal.addEventListener('click', () => {
      portal.classList.add('portal-reveal');
    });
    portal.addEventListener('transitionend', event => {
      if (event.propertyName === 'transform') {
        portal.activate();
      }
    });
    
    document.body.append(style, portal);
  }

  render() {
    const { msgVisible } = this.state;
    return (
      <div id="collection-page">
        <div className="main-box">
          <h1>Portals Collection</h1>
          <hr />
          {
            msgVisible &&
            <div className="msg-box">
              <p>
                <span>This browser does not support Portals.</span>
              </p>
              <p>
                <span>You can try out Portals in Chrome by flippingan experimental flag: </span>
                <a href="chrome://flags/#enable-portals">chrome://flags/#enable-portals</a>
                <span>.</span>
              </p>
              <p>
                <button className="copy-btn" onClick={this.copyHandler}>Copy URL</button>
              </p>
            </div>
          }
          <div className="link-box">
            {
              linkList.map((item, index) => {
                const { text, url } = item;
                return (
                  <span key={index} title={text} onClick={this.createPortal.bind(this, url)}>{text}</span>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Collection;
