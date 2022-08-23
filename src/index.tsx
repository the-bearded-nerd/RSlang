import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Games from './components/App-Games';
import AudioCall from './components/Audio-Call';
import Sprint from './components/Sprint';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="games" element={<Games />} />
      <Route path="games/audio" element={<AudioCall />} />
      <Route path="games/sprint" element={<Sprint />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
