import React from 'react';
import './index.css';
import App from './App';
import { render } from 'react-dom';
const container = document.getElementById('root');
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container
);
