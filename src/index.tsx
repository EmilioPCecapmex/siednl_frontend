import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./Fonts.css";

import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import { Settings } from './screens/config/Settings';
<<<<<<< HEAD
import { Usuarios } from './screens/config/Usuarios';
=======
=======
>>>>>>> ef96f529d41098ec2e73d9138eee68eece8814aa
import App from './App';
>>>>>>> dev_pedro

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    {/* <Settings /> */}
    <Usuarios />
=======
<<<<<<< HEAD
    <App/>
=======
    <App />
>>>>>>> ef96f529d41098ec2e73d9138eee68eece8814aa
>>>>>>> dev_pedro
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
