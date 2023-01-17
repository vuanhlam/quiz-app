import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from '~/components/GlobalStyles';

import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <GlobalStyle>
    <Routers>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<User />} />
        </Route>
        <Route path="/admins" element={<Admin />} />
      </Routes>
      {/* <App /> */}
    </Routers>
  </GlobalStyle>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
