import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { ModuleProvider } from './context';
import modules from './modules';

const element = document.getElementById('root');
ReactDOM.render(
  <ModuleProvider value={modules}>
    <App />
  </ModuleProvider>,
  element,
);
