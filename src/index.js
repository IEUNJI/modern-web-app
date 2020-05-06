import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';

import vhCheck from 'vh-check';
vhCheck();

import App from 'pages/App/App';

ReactDOM.render(<App />, document.querySelector('#root'));
