import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ChatContext from './Context/ChatContext'
import { BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <Router>
    <ChatContext>
      <App />
    </ChatContext>
  </Router>,
  document.getElementById('root')
);

