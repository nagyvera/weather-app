import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import '../node_modules/bulma/css/bulma.min.css';
import LangState from './components/Lang';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LangState>
      <App />
      </LangState>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
