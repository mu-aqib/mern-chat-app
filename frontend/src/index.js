import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ChatContext from './Context/ChatContext'

ReactDOM.render(
  <ChatContext>
    <App />
  </ChatContext>,
  document.getElementById('root')
);

