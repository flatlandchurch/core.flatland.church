import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Live from './Live';

if (window.location.pathname === '/live') {
  ReactDOM.render(<Live />, document.getElementById('root'));
} else if (window.location.pathname === '/ideas') {
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
