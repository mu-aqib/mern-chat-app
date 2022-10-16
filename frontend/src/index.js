import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import chatContext from './Context/ChatContext'

ReactDOM.render(
  <chatContext>
    <App />
  </chatContext>,
  document.getElementById('root')
);

