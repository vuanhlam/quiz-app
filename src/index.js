import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'nprogress/nprogress.css'
import "react-awesome-lightbox/build/style.css";

import reportWebVitals from './reportWebVitals';
import Layout from './Layout';
import GlobalStyle from '~/components/GlobalStyles';
import  { store, persistor }  from '~/redux/store';
import i18n from './utils/i18n';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle>
        <Layout/>
      </GlobalStyle>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
