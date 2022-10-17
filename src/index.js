import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { initializeFirebase } from './services/KodikService/firebase';

import './styles/index.scss'
import store from './store/store';
import App from './components/app/App';

const container = document.getElementById('root');
const root = createRoot(container);
initializeFirebase();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

