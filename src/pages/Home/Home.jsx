import React from 'react';

import './Home.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navList: [
        {
          text: '相机',
          textColor: '#fff',
          bgColor: 'lightcoral',
          path: '/camera'
        },
        {
          text: '工具',
          textColor: '#fff',
          bgColor: 'lightseagreen'
        },
        {
          text: '工具',
          textColor: '#fff',
          bgColor: 'lightsalmon'
        },
        {
          text: '工具',
          textColor: '#fff',
          bgColor: 'lightskyblue'
        },
        {
          text: '工具',
          textColor: '#fff',
          bgColor: 'lightpink'
        },
        {
          text: '工具',
          textColor: '#fff',
          bgColor: 'lightgreen'
        },
        {
          text: '工具',
          textColor: '#888',
          bgColor: 'lightcyan'
        },
        {
          text: '工具',
          textColor: '#fff',
          bgColor: 'lightsteelblue'
        },
        {
          text: '工具',
          textColor: '#888',
          bgColor: 'lightgoldenrodyellow'
        }
      ]
    };
  }

  navigator = path => {
    path && this.props.history.push(path);
  }

  render() {
    const { navList } = this.state;

    return (
      <section id="home-page">
        <section className="nav-container">
          {
            navList.map((nav, index) => {
              const { text, textColor, bgColor, path } = nav;
              return (
                <nav key={`nav-${index}`} style={{ background: bgColor }} onClick={this.navigator.bind(this, path)}>
                  <span style={{ color: textColor }}>
                    {text}
                  </span>
                </nav>
              );
            })
          }
        </section>
      </section>
    );
  }
}

export default Home;
